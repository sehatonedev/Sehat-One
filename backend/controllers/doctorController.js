import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'

// API for doctor Login 
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await doctorModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to upload report for an appointment (doctor side)
const uploadAppointmentReport = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
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

        // Verify appointment belongs to doctor
        const appointment = await appointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointment.docId !== docId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: file.mimetype.includes('pdf') ? 'raw' : 'image',
            folder: 'doctor_reports'
        })

        const fileSize = (file.size / (1024 * 1024)).toFixed(2)
        const reportType = file.mimetype.includes('pdf') ? 'pdf' : 'image'
        const now = new Date()

        // Update appointment with report details
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            reportUrl: uploadResult.secure_url,
            reportType: reportType,
            reportSize: fileSize + " MB",
            reportUploadedDate: now.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }),
            reportUploadedTime: now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        })

        res.json({ success: true, message: 'Report uploaded successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to upload prescription for an appointment (doctor side)
const uploadAppointmentPrescription = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
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

        // Verify appointment belongs to doctor
        const appointment = await appointmentModel.findById(appointmentId)
        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' })
        }

        if (appointment.docId !== docId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: file.mimetype.includes('pdf') ? 'raw' : 'image',
            folder: 'prescriptions'
        })

        const fileSize = (file.size / (1024 * 1024)).toFixed(2)
        const prescriptionType = file.mimetype.includes('pdf') ? 'pdf' : 'image'
        const now = new Date()

        // Update appointment with prescription details
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            prescriptionUrl: uploadResult.secure_url,
            prescriptionType: prescriptionType,
            prescriptionSize: fileSize + " MB",
            prescriptionUploadedDate: now.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }),
            prescriptionUploadedTime: now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        })

        res.json({ success: true, message: 'Prescription uploaded successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    doctorList,
    changeAvailablity,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile,
    uploadAppointmentReport
}