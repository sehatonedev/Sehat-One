import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import reportModel from "../models/reportModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';
import crypto from 'crypto';

// Gateway Initialize
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
const bookAppointment = async (req, res) => {

    try {
        const { userId, docId, slotDate, slotTime } = req.body
        
        // Check if user already has an appointment at the same date and time
        const existingAppointment = await appointmentModel.findOne({
            userId,
            slotDate,
            slotTime,
            cancelled: false
        })

        if (existingAppointment) {
            return res.json({ success: false, message: 'You already booked a slot in this date and time' })
        }

        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot 
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to reschedule appointment
const rescheduleAppointment = async (req, res) => {
    try {
        const { userId, appointmentId, newSlotDate, newSlotTime } = req.body

        // Get the existing appointment
        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify appointment belongs to user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        // Check if appointment is cancelled or completed
        if (appointmentData.cancelled) {
            return res.json({ success: false, message: 'Cannot reschedule cancelled appointment' })
        }

        if (appointmentData.isCompleted) {
            return res.json({ success: false, message: 'Cannot reschedule completed appointment' })
        }

        const { docId, slotDate, slotTime } = appointmentData

        // Check if user already has another appointment at the new date and time (excluding current appointment)
        const existingAppointment = await appointmentModel.findOne({
            userId,
            slotDate: newSlotDate,
            slotTime: newSlotTime,
            cancelled: false,
            _id: { $ne: appointmentId } // Exclude the current appointment being rescheduled
        })

        if (existingAppointment) {
            return res.json({ success: false, message: 'You already booked a slot in this date and time' })
        }

        // Get doctor data
        const doctorData = await doctorModel.findById(docId)

        if (!doctorData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }

        let slots_booked = doctorData.slots_booked

        // Release old slot
        if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        }

        // Check if new slot is available
        if (slots_booked[newSlotDate]) {
            if (slots_booked[newSlotDate].includes(newSlotTime)) {
                return res.json({ success: false, message: 'New slot is not available' })
            }
            slots_booked[newSlotDate].push(newSlotTime)
        } else {
            slots_booked[newSlotDate] = [newSlotTime]
        }

        // Update appointment with new date and time
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            slotDate: newSlotDate,
            slotTime: newSlotTime,
            rescheduled: true
        })

        // Update doctor's slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Rescheduled Successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId }).sort({ date: -1 })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const { origin } = req.headers

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Appointment Fees"
                },
                unit_amount: appointmentData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&appointmentId=${appointmentData._id}`,
            cancel_url: `${origin}/verify?success=false&appointmentId=${appointmentData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { appointmentId, success } = req.body

        if (success === "true") {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        }

        res.json({ success: false, message: 'Payment Failed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// MOCK PAYMENT API - For testing purposes only
// TODO: Replace with real payment integration when ready
const mockPayment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled' })
        }

        if (appointmentData.payment) {
            return res.json({ success: false, message: 'Payment already completed' })
        }

        // Mark payment as done
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })

        res.json({ success: true, message: 'Payment Done' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Generate ZegoCloud Token for video calling
const generateZegoToken = async (req, res) => {
    try {
        // userId is set by authUser middleware from JWT token
        const { userId } = req.body
        const { roomID } = req.body

        if (!userId) {
            return res.json({ success: false, message: 'User ID is required' })
        }

        const appID = parseInt(process.env.ZEGOCLOUD_APP_ID || '0')
        const serverSecret = process.env.ZEGOCLOUD_SERVER_SECRET || ''

        if (!appID || !serverSecret) {
            return res.json({ success: false, message: 'ZegoCloud credentials not configured. Please check ZEGOCLOUD_APP_ID and ZEGOCLOUD_SERVER_SECRET in environment variables.' })
        }

        // Token expiration time (24 hours)
        const effectiveTimeInSeconds = 3600 * 24

        // Generate token using user ID from authenticated token
        const token = generateToken04(
            appID,
            String(userId),
            serverSecret,
            effectiveTimeInSeconds,
            ''
        )

        res.json({ 
            success: true, 
            token,
            appID,
            roomID: roomID || `room_${userId}`
        })

    } catch (error) {
        console.log('ZegoCloud token generation error:', error)
        res.json({ success: false, message: error.message || 'Failed to generate token' })
    }
}

// ZegoCloud Token Generation Function
function generateToken04(appID, userID, secret, effectiveTimeInSeconds, payload) {
    if (!appID || !userID || !secret) {
        throw new Error('appID, userID, and secret are required')
    }

    const createTime = Math.floor(Date.now() / 1000)
    const tokenInfo = {
        app_id: appID,
        user_id: userID,
        nonce: Math.floor(Math.random() * 2147483647),
        ctime: createTime,
        expire: createTime + effectiveTimeInSeconds,
        payload: payload || ''
    }

    const tokenString = JSON.stringify(tokenInfo)
    const iv = Buffer.from(secret.substring(0, 16), 'utf8')
    const key = Buffer.from(secret.substring(0, 16), 'utf8')
    
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    let encrypted = cipher.update(tokenString, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    return '04' + encrypted
}

// API to upload user medical report
const uploadReport = async (req, res) => {
    try {
        const { userId } = req.body
        const file = req.file

        if (!file) {
            return res.json({ success: false, message: 'No file uploaded' })
        }

        // Validate file size (10 MB max)
        if (file.size > 10 * 1024 * 1024) {
            return res.json({ success: false, message: 'File size must be 10 MB or less' })
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
        if (!validTypes.includes(file.mimetype)) {
            return res.json({ success: false, message: 'Invalid file type. Please upload an image or PDF' })
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: file.mimetype.includes('pdf') ? 'raw' : 'image',
            folder: 'medical_reports'
        })

        const fileSize = (file.size / (1024 * 1024)).toFixed(2)
        const reportType = file.mimetype.includes('pdf') ? 'pdf' : 'image'
        const now = new Date()

        const reportData = {
            userId,
            name: file.originalname,
            url: uploadResult.secure_url,
            type: reportType,
            size: fileSize + " MB",
            uploadedDate: now.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }),
            uploadedTime: now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            date: Date.now(),
            source: "user"
        }

        const newReport = new reportModel(reportData)
        await newReport.save()

        res.json({ success: true, message: 'Report uploaded successfully', report: newReport })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user uploaded reports
const getUserReports = async (req, res) => {
    try {
        const { userId } = req.body
        const reports = await reportModel.find({ userId, source: "user" }).sort({ date: -1 })

        res.json({ success: true, reports })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to delete user uploaded report
const deleteReport = async (req, res) => {
    try {
        const { userId, reportId } = req.body

        const report = await reportModel.findById(reportId)

        if (!report) {
            return res.json({ success: false, message: 'Report not found' })
        }

        // Verify report belongs to user
        if (report.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        // Delete from Cloudinary (optional - can be done later)
        // Extract public_id from URL and delete

        // Delete from database
        await reportModel.findByIdAndDelete(reportId)

        res.json({ success: true, message: 'Report deleted successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    rescheduleAppointment,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe,
    mockPayment,
    generateZegoToken,
    uploadReport,
    getUserReports,
    deleteReport
}