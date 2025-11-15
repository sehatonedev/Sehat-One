import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("uploaded"); // "uploaded" or "doctor"
  const [userReports, setUserReports] = useState([]);
  const [doctorReports, setDoctorReports] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingDoctorReports, setLoadingDoctorReports] = useState(true);
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

    if (activeTab === "uploaded") {
      fetchUserReports();
    }
  }, [token, backendUrl, activeTab]);

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

    if (activeTab === "doctor") {
      fetchDoctorReports();
    }
  }, [token, backendUrl, activeTab]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (<= 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be 10 MB or less.");
      toast.error("File size must be 10 MB or less.");
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload an image (JPG, PNG, GIF) or PDF file.");
      toast.error("Invalid file type. Please upload an image or PDF.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

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
        e.target.value = ''; // Reset file input
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

  const currentReports = activeTab === "uploaded" ? userReports : doctorReports;
  const reportsCount = currentReports.length;

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
              {activeTab === "uploaded" 
                ? `${reportsCount} ${reportsCount === 1 ? 'report' : 'reports'} uploaded`
                : `${reportsCount} ${reportsCount === 1 ? 'report' : 'reports'} from doctors`
              }
            </p>
          </div>
          <div className="bg-purple-100 rounded-full p-3">
            <span className="text-3xl">📋</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 sm:gap-4 bg-white px-3 sm:px-4 py-2 rounded-full shadow-md whitespace-nowrap border border-gray-200">
          <button
            onClick={() => setActiveTab("uploaded")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300
              ${activeTab === "uploaded"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
          >
            My Uploaded Reports
          </button>
          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300
              ${activeTab === "doctor"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
          >
            Doctor Reports
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "uploaded" && (
        <>
          {/* Upload Section - Only show for uploaded reports */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <span className="text-3xl">📤</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Upload Medical Report
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload images or PDF files (Max 10 MB)
                  </p>
                </div>
              </div>
              <label className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2">
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <span>📁</span>
                    Choose File
                  </>
                )}
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleUpload}
                  disabled={uploading}
          />
        </label>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* User Uploaded Reports Grid */}
          {userReports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Reports Uploaded</h3>
              <p className="text-gray-600 mb-6">
                Upload your medical reports, lab results, or test reports to keep them organized and easily accessible.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate" title={report.name}>
                            {report.name}
                          </h3>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            Uploaded
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <span>📅</span>
                            {report.uploadedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🕐</span>
                            {report.uploadedTime}
                          </span>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        onClick={() => handleDelete(report._id || report.id)}
                        title="Delete report"
                      >
                        <span className="text-xl">Delete</span>
                      </button>
                    </div>

                    {/* Preview */}
                    <div className="mb-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      {report.type === "image" ? (
                        <img
                          src={report.url}
                          alt="Report preview"
                          className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedReport(report)}
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-red-50 cursor-pointer hover:bg-red-100 transition-colors" onClick={() => setSelectedReport(report)}>
                          <div className="text-center">
                            <div className="text-5xl mb-2">📄</div>
                            <p className="text-sm text-gray-600 font-medium">PDF Document</p>
                            <p className="text-xs text-gray-500 mt-1">Click to view</p>
                          </div>
                        </div>
                      )}
      </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        onClick={() => setSelectedReport(report)}
                      >
                        View
                      </button>
                      <a
                        href={report.url}
                        download={report.name}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Doctor Reports Tab */}
      {activeTab === "doctor" && (
        <>
          {loadingDoctorReports ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading doctor reports...</p>
            </div>
          ) : doctorReports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="text-6xl mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Doctor Reports Available</h3>
              <p className="text-gray-600 mb-6">
                Reports sent by doctors after your consultations will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctorReports.map((report) => (
          <div
            key={report.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
                  <div className="p-4">
            <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate" title={report.name}>
                            {report.name}
                          </h3>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            From Doctor
                          </span>
                        </div>
                        <p className="text-blue-600 text-sm font-medium mb-2">
                          {report.doctorName} - {report.speciality}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <span>📅</span>
                            {report.uploadedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <span>🕐</span>
                            {report.uploadedTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="mb-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      {report.url ? (
                        report.type === "image" ? (
                          <img
                            src={report.url}
                            alt="Report preview"
                            className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => report.url && setSelectedReport(report)}
                          />
                        ) : (
                          <div className="w-full h-48 flex items-center justify-center bg-red-50 cursor-pointer hover:bg-red-100 transition-colors" onClick={() => report.url && setSelectedReport(report)}>
                            <div className="text-center">
                              <div className="text-5xl mb-2">📄</div>
                              <p className="text-sm text-gray-600 font-medium">PDF Document</p>
                              <p className="text-xs text-gray-500 mt-1">Click to view</p>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-yellow-50 cursor-not-allowed">
                          <div className="text-center">
                            <div className="text-5xl mb-2">⏳</div>
                            <p className="text-sm text-gray-600 font-medium">Report Pending</p>
                            <p className="text-xs text-gray-500 mt-1">Doctor will upload soon</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {report.url ? (
                      <div className="flex gap-2">
                        <button
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                          onClick={() => setSelectedReport(report)}
                        >
                          View
                        </button>
                        <a
                          href={report.url}
                          download={report.name}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <div className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium text-center">
                        Report not available yet
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Full Screen Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReport(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
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
            <div className="p-4 bg-gray-100">
              {selectedReport.url ? (
                selectedReport.type === "image" ? (
                  <img
                    src={selectedReport.url}
                alt="Report"
                    className="w-full h-auto max-h-[75vh] object-contain rounded-lg mx-auto"
              />
            ) : (
              <iframe
                    src={selectedReport.url}
                    title="PDF Report"
                    className="w-full h-[75vh] rounded-lg border border-gray-300"
                  />
                )
              ) : (
                <div className="w-full h-[75vh] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-lg font-semibold text-gray-700">Report Not Available</p>
                    <p className="text-sm text-gray-500 mt-2">The report will be available once the doctor uploads it.</p>
                  </div>
                </div>
              )}
            </div>
            {selectedReport.url && (
              <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                <a
                  href={selectedReport.url}
                  download={selectedReport.name}
              target="_blank"
              rel="noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
                  Download
            </a>
              </div>
            )}
          </div>
      </div>
      )}
    </div>
  );
};

export default Reports;
