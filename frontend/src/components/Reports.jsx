import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FlaskConical, FileText } from "lucide-react";

const Reports = () => {
  const [userReports, setUserReports] = useState([]);
  const [doctorReports, setDoctorReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingDoctorReports, setLoadingDoctorReports] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'Prescription',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const { token, backendUrl } = useContext(AppContext);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format date from slotDate format (DD_MM_YYYY)
  const formatDate = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split('_');
    if (dateArray.length !== 3) return slotDate;
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Fetch user-uploaded reports from backend
  useEffect(() => {
    const fetchUserReports = async () => {
      if (!token) {
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/reports', {
          headers: { token }
        });

        if (data.success) {
          setUserReports(data.reports || []);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load your reports");
      }
    };

      fetchUserReports();
  }, [token, backendUrl]);

  // Fetch doctor-sent reports from completed appointments
  useEffect(() => {
    const fetchDoctorReports = async () => {
      if (!token) {
        setLoadingDoctorReports(false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', {
          headers: { token }
        });

        if (data.success) {
          // Filter completed appointments that might have reports
          const completedAppointments = (data.appointments || []).filter(apt => {
            return apt.isCompleted && !apt.cancelled;
          });

          // Transform appointments to report format
          const reportsData = completedAppointments.map(apt => ({
            id: apt._id,
            _id: apt._id,
            appointmentId: apt._id,
            name: `Report - ${apt.docData?.name || "Dr. Unknown"}`,
            doctorName: apt.docData?.name || "Dr. Unknown",
            speciality: apt.docData?.speciality || "General Physician",
            date: formatDate(apt.slotDate),
            slotDate: apt.slotDate,
            slotTime: apt.slotTime,
            url: apt.reportUrl || null,
            type: apt.reportType || "pdf",
            size: apt.reportSize || "N/A",
            uploadedDate: apt.reportUploadedDate || formatDate(apt.slotDate),
            uploadedTime: apt.reportUploadedTime || apt.slotTime || "N/A",
            source: "doctor"
          }));

          // Sort by date (newest first)
          reportsData.sort((a, b) => {
            const dateA = new Date(a.slotDate.split('_').reverse().join('-'));
            const dateB = new Date(b.slotDate.split('_').reverse().join('-'));
            return dateB - dateA;
          });

          setDoctorReports(reportsData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load doctor reports");
      } finally {
        setLoadingDoctorReports(false);
      }
    };

      fetchDoctorReports();
  }, [token, backendUrl]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }

    try {
      const { data } = await axios.post(backendUrl + '/api/user/delete-report', 
        { reportId: id },
        { headers: { token } }
      );

      if (data.success) {
        setUserReports(userReports.filter((r) => r._id !== id));
        if (selectedReport?._id === id) {
          setSelectedReport(null);
        }
        toast.success("Report deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete report");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete report");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate size (<= 10 MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be 10 MB or less.");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload an image (JPG, PNG, GIF) or PDF file.");
        return;
      }

      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadForm.name.trim()) {
      toast.error("Please enter a name for your report");
      return;
    }

    if (!uploadForm.file) {
      toast.error("Please select a file to upload");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadForm.file);
      formData.append('name', uploadForm.name);
      formData.append('type', uploadForm.type);

      const { data } = await axios.post(backendUrl + '/api/user/upload-report', formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        // Add the new report to the list
        setUserReports([data.report, ...userReports]);
        toast.success("Report uploaded successfully!");
        // Reset form and close modal
        setUploadForm({ name: '', type: 'Prescription', file: null });
        setShowUploadModal(false);
      } else {
        toast.error(data.message || "Failed to upload report");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to upload report");
    } finally {
      setUploading(false);
    }
  };

  const handleDecline = () => {
    setUploadForm({ name: '', type: 'Prescription', file: null });
    setShowUploadModal(false);
  };

  const allReports = [...userReports, ...doctorReports];
  const reportsCount = allReports.length;

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Stats */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              Medical Reports
            </h2>
            <p className="text-gray-600 text-sm">
              {reportsCount} {reportsCount === 1 ? 'report' : 'reports'} available
            </p>
          </div>
          <div className="bg-purple-100 rounded-full p-3">
            <span className="text-3xl">📋</span>
          </div>
        </div>
      </div>

      {/* Upload Button Section */}
      <div className="flex justify-end mb-6">
          <button
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
        >
          Upload Your Report
          </button>
      </div>

      {/* Reports List */}
      {loadingDoctorReports ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading reports...</p>
                </div>
      ) : allReports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Reports Available</h3>
              <p className="text-gray-600 mb-6">
            Your medical reports will appear here once they are available.
              </p>
            </div>
          ) : (
        <div className="space-y-4">
          {allReports.map((report) => (
            <div
              key={report.id || report._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Icon and Name */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                    {report.reportCategory === "Lab Test Report" ? (
                      <FlaskConical className="w-6 h-6 text-gray-600" />
                    ) : (
                      <FileText className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  {/* Name and Date/Time */}
                      <div className="flex-1">
                    <p className="text-gray-900 text-sm font-semibold mb-1">
                            {report.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <span>📅</span>
                        {report.uploadedDate || formatDate(report.slotDate) || "N/A"}
                      </span>
                      {report.reportCategory && (
                        <span className="text-gray-600">
                          {report.reportCategory}
                          </span>
                      )}
                          <span className="flex items-center gap-1">
                            <span>🕐</span>
                        {report.uploadedTime || report.slotTime || "N/A"}
                          </span>
                    </div>
                          </div>
                        </div>
                {/* View and Download Buttons */}
                <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                      >
                        View
                      </button>
                  {report.url && (
                      <a
                        href={report.url}
                        download={report.name}
                        target="_blank"
                        rel="noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Download
                      </a>
                  )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

      {/* Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={handleDecline}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Upload Your Report</h3>
            
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of your Report
              </label>
              <input
                type="text"
                value={uploadForm.name}
                onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                placeholder="Enter report name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={uploadForm.type}
                onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="Prescription">Prescription</option>
                <option value="Lab Test Report">Lab Test Report</option>
              </select>
                    </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <label className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
              </label>
              {uploadForm.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {uploadForm.file.name}
                </p>
                      )}
                    </div>

            {/* Save and Decline Buttons */}
            <div className="flex items-center justify-between gap-4">
                        <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                        >
                Decline
                        </button>
              <button
                onClick={handleUploadSubmit}
                disabled={uploading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Save'}
              </button>
                  </div>
                </div>
            </div>
      )}

      {/* Full Screen Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReport(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-gray-50 flex-shrink-0">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedReport.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedReport.source === "doctor" 
                    ? `From ${selectedReport.doctorName} on ${selectedReport.uploadedDate} at ${selectedReport.uploadedTime}`
                    : `Uploaded on ${selectedReport.uploadedDate} at ${selectedReport.uploadedTime}`
                  }
                </p>
              </div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                onClick={() => setSelectedReport(null)}
              >
                ✕ Close
              </button>
            </div>
            <div className="p-4 bg-gray-100 overflow-y-auto flex-1">
              {selectedReport.url ? (
                selectedReport.type === "image" ? (
                  <img
                    src={selectedReport.url}
                    alt="Report"
                    className="w-full h-auto object-contain rounded-lg mx-auto"
                  />
                ) : (
                  <iframe
                    src={selectedReport.url}
                    title="PDF Report"
                    className="w-full min-h-[600px] rounded-lg border border-gray-300"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-lg font-semibold text-gray-700">Report Not Available</p>
                    <p className="text-sm text-gray-500 mt-2">The report will be available once the doctor uploads it.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
