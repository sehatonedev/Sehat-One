import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    rescheduled: { type: Boolean, default: false },
    // Doctor report fields
    reportUrl: { type: String, default: null },
    reportType: { type: String, default: null }, // "pdf" or "image"
    reportSize: { type: String, default: null }, // File size in MB
    reportUploadedDate: { type: String, default: null },
    reportUploadedTime: { type: String, default: null },
    // Doctor prescription fields
    prescriptionUrl: { type: String, default: null },
    prescriptionType: { type: String, default: null }, // "pdf" or "image"
    prescriptionSize: { type: String, default: null }, // File size in MB
    prescriptionUploadedDate: { type: String, default: null },
    prescriptionUploadedTime: { type: String, default: null }
})
const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel
