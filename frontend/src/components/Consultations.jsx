import React, { useState, useEffect } from "react";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated fetch (replace later with API call)
  useEffect(() => {
    setTimeout(() => {
      setConsultations([
        {
          id: 1,
          doctor: "Dr. Aarav Sharma",
          date: "2025-02-11",
          mode: "Video Consultation",
          status: "Completed",
          prescriptionUrl: "/sample-prescription.pdf"
        },
        {
          id: 2,
          doctor: "Dr. Meera Raj",
          date: "2025-01-29",
          mode: "In-clinic",
          status: "Completed",
          prescriptionUrl: "/sample-prescription.pdf"
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading consultations...
      </div>
    );
  }

  return (
    <div className="w-full sm:w-11/12 mx-auto bg-white">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-50 text-blue-700">
              <th className="py-3 px-4 text-left">Doctor</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Mode</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {consultations.map(item => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{item.doctor}</td>
                <td className="py-3 px-4">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{item.mode}</td>
                <td className="py-3 px-4 text-green-600">{item.status}</td>

                {/* View Prescription Button */}
                <td className="py-3 px-4">
                  <a
                    href={item.prescriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                  >
                    View Rx
                  </a>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Consultations;
