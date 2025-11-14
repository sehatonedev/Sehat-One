import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, rescheduleAppointment, paymentRazorpay, verifyRazorpay, paymentStripe, verifyStripe, mockPayment, generateZegoToken } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/reschedule-appointment", authUser, rescheduleAppointment)
// Real payment methods - commented out for now, using mock payment instead
// userRouter.post("/payment-razorpay", authUser, paymentRazorpay)
// userRouter.post("/verifyRazorpay", authUser, verifyRazorpay)
// userRouter.post("/payment-stripe", authUser, paymentStripe)
// userRouter.post("/verifyStripe", authUser, verifyStripe)
// Mock payment endpoint - for testing purposes
userRouter.post("/mock-payment", authUser, mockPayment)
// ZegoCloud token generation for video calling
userRouter.post("/zego-token", authUser, generateZegoToken)

export default userRouter;