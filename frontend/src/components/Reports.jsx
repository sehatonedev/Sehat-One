import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Reports = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Load reports from localStorage and appointments from backend
  useEffect(() => {
    // Load saved reports from localStorage
    const savedReports = localStorage.getItem('userReports');
    if (savedReports) {
      try {
        const parsed = JSON.parse(savedReports);
        setReports(parsed);
      } catch (e) {
        console.error('Error parsing saved reports:', e);
      }
    }

    // Fetch appointments if user is logged in
    const fetchAppointments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
        if (data.success) {
          setAppointments(data.appointments);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, backendUrl]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (<= 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be 10 MB or less.");
      return;
    }

    // Validate file type
    if (!file.type.includes("pdf") && !file.type.startsWith("image/")) {
      setError("Please upload a PDF or image file.");
      return;
    }

    setError("");

    const fileURL = URL.createObjectURL(file);

    const newReport = {
      id: Date.now(),
      name: file.name,
      booking: "Manual Upload", // Can be linked to appointment later
      url: fileURL,
      type: file.type.includes("pdf") ? "pdf" : "image",
      uploadDate: new Date().toISOString(),
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    
    // Save to localStorage
    try {
      // Convert blob URLs to data URLs for storage (simplified - in production, upload to server)
      localStorage.setItem('userReports', JSON.stringify(updatedReports.map(r => ({
        ...r,
        // Note: blob URLs won't persist, so this is temporary
        // In production, files should be uploaded to server/cloud storage
      }))));
    } catch (e) {
      console.error('Error saving reports:', e);
    }

    toast.success("Report uploaded successfully!");
  };

  const handleDelete = (id) => {
    const updatedReports = reports.filter((r) => r.id !== id);
    setReports(updatedReports);
    
    // Update localStorage
    try {
      localStorage.setItem('userReports', JSON.stringify(updatedReports));
    } catch (e) {
      console.error('Error saving reports:', e);
    }
    
    toast.success("Report deleted successfully!");
  };

  if (loading) {
    return (
      <div className="w-full mx-auto mt-4 px-4 text-center text-gray-500 py-10">
        Loading reports...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full mx-auto mt-4 px-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reports</h2>
        <p className="text-gray-500 py-10">Please login to view and upload reports.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-4 px-4">

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reports</h2>

      {/* Upload */}
      <div className="mb-6">
        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition inline-block">
          Upload Report
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleUpload}
          />
        </label>
        <p className="text-gray-500 text-sm mt-2">Upload lab reports, test results, or medical documents (PDF or Image, max 10MB)</p>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Report List */}
      <div className="flex flex-col gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border p-4 rounded-xl bg-white shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{report.name}</h3>
                <p className="text-gray-600 text-sm">
                  Booking: {report.booking}
                </p>
              </div>

              <button
                className="text-red-500 text-sm hover:text-red-700"
                onClick={() => handleDelete(report.id)}
              >
                Delete
              </button>
            </div>

            {/* Viewer */}
            {report.type === "image" ? (
              <img
                src={report.url}
                alt="Report"
                className="w-full h-56 object-cover rounded-lg border"
              />
            ) : (
              <iframe
                src={report.url}
                title="PDF"
                className="w-full h-56 rounded-lg border"
              />
            )}

            <a
              href={report.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm hover:underline mt-3 inline-block"
            >
              View / Download
            </a>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <p className="mt-6 text-gray-600 text-center">
          No reports uploaded yet.
        </p>
      )}
    </div>
  );
};

export default Reports;
