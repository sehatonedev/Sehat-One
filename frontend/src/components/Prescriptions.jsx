import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Prescriptions = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState(null);
  const [loading, setLoading] = useState(true);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Fetch prescriptions from backend
  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
        if (data.success) {
          // Filter appointments with prescriptions
          const rxList = data.appointments
            .filter(apt => apt.prescriptionUrl || apt.isCompleted)
            .map(apt => ({
              id: apt._id,
              title: `${apt.docData?.speciality || "Consultation"} Prescription`,
              date: slotDateFormat(apt.slotDate),
              file: apt.prescriptionUrl || null,
              doctor: apt.docData?.name || "Doctor"
            }));
          setPrescriptions(rxList);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token, backendUrl]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 text-center text-gray-500 py-10">
        Loading prescriptions...
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Prescriptions</h2>
        <p className="text-gray-500 text-center py-10">No prescriptions available yet.</p>
      </div>
    );
  }

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

            {rx.file ? (
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                onClick={(e) => {
                  e.stopPropagation(); // avoid triggering viewer load
                  window.open(rx.file, "_blank");
                }}
              >
                Download
              </button>
            ) : (
              <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg text-sm cursor-not-allowed">
                No File
              </span>
            )}
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

          {selectedRx.file ? (
            <iframe
              src={selectedRx.file}
              className="w-full h-[600px] rounded-lg border"
              title="Prescription PDF Viewer"
            ></iframe>
          ) : (
            <div className="w-full h-[600px] rounded-lg border flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">No prescription file available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
