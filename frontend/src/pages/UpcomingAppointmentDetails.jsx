import React, { useContext } from "react";
import { Video, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const UpcomingAppointmentDetails = ({ appointment: appointmentProp }) => {
  const { token, backendUrl, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  // Use prop if provided, otherwise show placeholder
  const appointment = appointmentProp || {
    docData: {
      name: "Dr. Anna Nicholas",
      speciality: "Neurologist",
      address: { line1: "Metro Hospital" },
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600",
    },
    slotDate: "01_11_2024",
    slotTime: "11:30",
    userData: {
      name: "Patient",
      email: "patient@example.com",
      gender: "Not Selected",
    },
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Format date
  const formatDate = (slotDate) => {
    if (!slotDate) return "Date not available";
    const [day, month, year] = slotDate.split('_').map(Number);
    return `${day} ${months[month - 1]} ${year}`;
  };

  const handlePayment = () => {
    if (appointmentProp && appointmentProp._id) {
      navigate(`/my-appointments`);
    }
  };

  const handleReschedule = () => {
    if (appointmentProp && appointmentProp.docData && appointmentProp._id) {
      navigate(`/appointment/${appointmentProp.docId}?reschedule=${appointmentProp._id}`);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col mb-6">
      {/* Outer card */}
      <div className="bg-white shadow-lg rounded-3xl px-3 py-2 space-y-1">
          {/* Doctor Info */}
          <div className="flex flex-row justify-between items-start gap-1 py-1">
            <div className="flex items-center gap-2">
              <img
                src={appointment.docData?.image || "https://via.placeholder.com/150"}
                alt="doctor"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover"
              />
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold">{appointment.docData?.name || "Doctor"}</h2>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {appointment.docData?.speciality || "Speciality"} | {appointment.docData?.address?.line1 || "Hospital"}
                </p>

                <div className="flex gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                  <span>{formatDate(appointment.slotDate)}</span>
                  <span>{appointment.slotTime || "Time not set"}</span>
                </div>
              </div>
            </div>

            <MoreVertical className="text-gray-500" />
          </div>

          {/* Video Call - Only show if appointment is not completed */}
          {!appointment.isCompleted && !appointment.cancelled && (
            <div className="flex flex-row items-center justify-between bg-gray-50 rounded-2xl border gap-2 py-2">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 rounded-xl p-2">
                  <Video className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="font-medium text-gray-700 text-xs sm:text-sm">Video Call</p>
              </div>

              <button className="rounded-full bg-purple-600 text-white font-semibold shadow text-xs sm:text-sm px-3 py-1">
                Start Now →
              </button>
            </div>
          )}

          {/* Payment Status */}
          {appointmentProp && (
            <div className="bg-gray-50 rounded-2xl border gap-2 py-2 px-3">
              <p className="text-gray-700 text-xs sm:text-sm">
                <span className="font-semibold">Status: </span>
                {appointment.cancelled ? (
                  <span className="text-red-600">Cancelled</span>
                ) : appointment.isCompleted ? (
                  <span className="text-green-600">Completed</span>
                ) : appointment.payment ? (
                  <span className="text-green-600">Paid - {currencySymbol}{appointment.amount}</span>
                ) : (
                  <span className="text-orange-600">Payment Pending - {currencySymbol}{appointment.amount}</span>
                )}
              </p>
            </div>
          )}

          {/* Patient Details */}
          {appointment.userData && (
            <div>
              <h3 className="text-sm sm:text-md font-semibold">Patient Details</h3>

              <div className="grid grid-cols-2 gap-y-2">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Name</p>
                  <p className="font-medium text-xs sm:text-sm">{appointment.userData.name || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                  <p className="font-medium text-xs sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                    {appointment.userData.email || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Gender</p>
                  <p className="font-medium text-xs sm:text-sm">{appointment.userData.gender || "Not provided"}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Bottom Action Buttons - Only show if appointment exists and is not completed/cancelled */}
      {appointmentProp && !appointment.isCompleted && !appointment.cancelled && (
        <div className="w-full flex flex-row gap-2 bg-white mt-4">
          {!appointment.payment && (
            <button
              onClick={handlePayment}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2 transition-colors"
            >
              Pay Now
            </button>
          )}

          <button
            onClick={handleReschedule}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2 transition-colors"
          >
            {appointment.payment ? "View Details" : "Reschedule"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointmentDetails;
