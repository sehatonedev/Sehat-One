import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true }, // "pdf" or "image"
    size: { type: String, required: true }, // File size in MB
    uploadedDate: { type: String, required: true },
    uploadedTime: { type: String, required: true },
    date: { type: Number, required: true }, // Timestamp for sorting
    source: { type: String, default: "user" }, // "user" for user-uploaded reports
    reportCategory: { type: String, default: "General" } // "Prescription" or "Lab Test Report"
});

const reportModel = mongoose.models.report || mongoose.model("report", reportSchema);
export default reportModel;

