import React, { useState } from "react";

const Reports = () => {
  // Temporary dummy reports
  const [reports, setReports] = useState([]);

  const [error, setError] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (<= 10 MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be 10 MB or less.");
      return;
    }

    setError("");

    const fileURL = URL.createObjectURL(file);

    const newReport = {
      id: Date.now(),
      name: file.name,
      booking: "Linked Booking (Sample)", // replace with real booking later
      url: fileURL,
      type: file.type.includes("pdf") ? "pdf" : "image",
    };

    setReports([newReport, ...reports]);
  };

  const handleDelete = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full mx-auto mt-4 px-4">

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reports</h2>

      {/* Upload */}
      <div className="mb-6">
        <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
          Upload Report
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleUpload}
          />
        </label>

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
