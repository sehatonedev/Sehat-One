import React, { useState } from "react";

const Prescriptions = () => {
  // Dummy data - replace later with API data
  const prescriptions = [
    {
      id: 1,
      title: "Dental Checkup Prescription",
      date: "29 Jan 2025",
      file: "/sample-rx.pdf", // place a test pdf in public folder
    },
    {
      id: 2,
      title: "General Consultation Prescription",
      date: "15 Feb 2025",
      file: "/sample-rx.pdf",
    },
  ];

  const [selectedRx, setSelectedRx] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">

      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Prescriptions
      </h2>

      {/* List */}
      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedRx(rx)}
          >
            <div>
              <p className="text-lg font-semibold text-gray-900">{rx.title}</p>
              <p className="text-gray-600 text-sm">Date: {rx.date}</p>
            </div>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              onClick={(e) => {
                e.stopPropagation(); // avoid triggering viewer load
                window.open(rx.file, "_blank");
              }}
            >
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Inline PDF Viewer */}
      {selectedRx && (
        <div className="mt-10 bg-gray-50 p-4 rounded-xl shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Viewing: {selectedRx.title}
            </h3>

            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              onClick={() => setSelectedRx(null)}
            >
              Close
            </button>
          </div>

          <iframe
            src={selectedRx.file}
            className="w-full h-[600px] rounded-lg border"
            title="Prescription PDF Viewer"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
