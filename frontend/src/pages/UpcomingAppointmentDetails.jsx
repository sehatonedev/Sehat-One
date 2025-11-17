import React, { useContext, useState } from "react";
import { Video, MoreVertical, Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import VideoCall from "../components/VideoCall";

const UpcomingAppointmentDetails = ({ appointment: appointmentProp }) => {
  const { token, backendUrl, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const [showVideoCall, setShowVideoCall] = useState(false);

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
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format date
  const formatDate = (slotDate) => {
    if (!slotDate) return "Date not available";
    const [day, month, year] = slotDate.split('_').map(Number);
    return `${day} ${months[month - 1]} ${year}`;
  };

  // Format date for completed appointments (short format)
  const formatDateShort = (slotDate) => {
    if (!slotDate) return "Date not available";
    const [day, month, year] = slotDate.split('_').map(Number);
    return `${day} ${monthsShort[month - 1]} ${year}`;
  };

  const handleReschedule = () => {
    if (appointmentProp && appointmentProp.docData && appointmentProp._id) {
      navigate(`/appointment/${appointmentProp.docId}?reschedule=${appointmentProp._id}`);
    }
  };

  const handleStartVideoCall = () => {
    // Only allow video call if payment is done
    if (!appointmentProp?.payment) {
      alert('Please complete payment first to start video call');
      return;
    }
    setShowVideoCall(true);
  };

  // Check if appointment is completed (either marked as completed or time has passed)
  const checkIfCompleted = () => {
    if (appointment.isCompleted || (appointmentProp && appointmentProp.isCompleted)) {
      return true;
    }
    // Also check if time has passed
    if (appointment.slotDate && appointment.slotTime) {
      const [day, month, year] = appointment.slotDate.split('_').map(Number);
      let hours = 0;
      let minutes = 0;
      
      if (appointment.slotTime) {
        const timeStr = appointment.slotTime.trim().toUpperCase();
        const hasAMPM = timeStr.includes('AM') || timeStr.includes('PM');
        
        if (hasAMPM) {
          const parts = timeStr.replace(/\s*(AM|PM)\s*/i, '').split(':');
          hours = parseInt(parts[0]) || 0;
          minutes = parseInt(parts[1]) || 0;
          
          if (timeStr.includes('PM') && hours !== 12) {
            hours += 12;
          } else if (timeStr.includes('AM') && hours === 12) {
            hours = 0;
          }
        } else {
          const parts = appointment.slotTime.split(':');
          hours = parseInt(parts[0]) || 0;
          minutes = parseInt(parts[1]) || 0;
        }
      }
      
      const appointmentDateTime = new Date(year, month - 1, day, hours, minutes, 0);
      const now = new Date();
      return appointmentDateTime < now;
    }
    return false;
  };
  
  const isCompleted = checkIfCompleted();

  return (
    <>
      {showVideoCall && appointmentProp && (
        <VideoCall 
          appointment={appointmentProp} 
          onClose={() => setShowVideoCall(false)} 
        />
      )}
      <div className="w-full bg-white flex flex-col mb-6">
      {/* Outer card */}
        <div className="bg-white shadow-lg rounded-3xl px-4 py-4">
          {isCompleted ? (
            /* Completed Appointment Layout */
            <div className="flex flex-row justify-between items-center gap-4">
              {/* Left Section */}
              <div className="flex items-center gap-3 flex-grow">
                {/* Circular Avatar */}
                <img
                  src={appointment.docData?.image || "https://via.placeholder.com/150"}
                  alt="doctor"
                  className="w-16 h-16 rounded-full object-cover bg-blue-100"
                />
                
                {/* Doctor Info */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    {appointment.docData?.name || "Doctor"}
                  </h2>
                  <p className="text-blue-600 text-sm font-medium">
                    {appointment.docData?.speciality || "Speciality"}
                  </p>
                  
                  {/* Appointment Details with Icons */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDateShort(appointment.slotDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{appointment.slotTime || "Time not set"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{appointment.docData?.address?.line1 || "Location not available"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm hover:bg-blue-100 transition-colors">
                  Completed
                </button>
                <button className={`px-4 py-2 font-semibold rounded-lg text-sm transition-colors ${
                  appointment.payment 
                    ? "bg-green-50 text-green-700 hover:bg-green-100" 
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                }`}>
                  {appointment.payment ? "Paid" : "Unpaid"}
                </button>
                <button 
                  onClick={() => navigate(`/bookings`)}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ) : (
            /* Non-Completed Appointment Layout (Original) */
            <div className="space-y-1">
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
            <div className="bg-gray-50 rounded-2xl border gap-2 py-2 px-3">
              <div className="flex flex-row items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 rounded-xl p-2">
                    <Video className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="font-medium text-gray-700 text-xs sm:text-sm">Video Call</p>
                </div>

                <button 
                  onClick={handleStartVideoCall}
                  className="rounded-full bg-purple-600 text-white font-semibold shadow text-xs sm:text-sm px-3 py-1 hover:bg-purple-700 transition-colors"
                >
                  Start Now →
                </button>
              </div>
              
              {/* Reschedule button below Start Now - same size as Start Now */}
              <div className="flex justify-end">
                <button
                  onClick={handleReschedule}
                  className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow text-xs sm:text-sm px-3 py-1 transition-colors"
                >
                  Reschedule
                </button>
              </div>
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
          )}
        </div>
    </div>
    </>
  );
};

export default UpcomingAppointmentDetails;
