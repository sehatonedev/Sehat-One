import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Consultations = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Fetch consultations from backend
  useEffect(() => {
    const fetchConsultations = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
        if (data.success) {
          // Filter completed appointments
          const completed = data.appointments
            .filter(apt => apt.isCompleted || apt.payment)
            .map(apt => ({
              id: apt._id,
              doctor: apt.docData?.name || "Doctor",
              date: apt.slotDate,
              mode: "In-clinic", // Can be enhanced to support video consultation
              status: apt.isCompleted ? "Completed" : "Paid",
              prescriptionUrl: apt.prescriptionUrl || null,
              appointmentId: apt._id
            }));
          setConsultations(completed);
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

    fetchConsultations();
  }, [token, backendUrl]);

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
                  {slotDateFormat(item.date)}
                </td>
                <td className="py-3 px-4">{item.mode}</td>
                <td className="py-3 px-4 text-green-600">{item.status}</td>

                {/* View Prescription Button */}
                <td className="py-3 px-4">
                  {item.prescriptionUrl ? (
                    <a
                      href={item.prescriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      View Rx
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 px-3 py-1">No Rx</span>
                  )}
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
