import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UpcomingAppointment = () => {
  const { fakeLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  if (!fakeLoggedIn) return null;

  const appointment = {
    day: "29",
    weekday: "Tue",
    time: "08:00 AM",
    title: "Dental checkup",
    doctor: "Dr. Anna Nicholas",
  };

  return (
    <div className="w-full bg-white py-2 px-1 sm:px-3 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Upcoming Appointment
        </h2>

        <button
          onClick={() => navigate("/appointment-details")}
          className="mt-2 sm:mt-0 text-blue-600 font-semibold hover:underline text-sm sm:text-base"
        >
          View All Bookings
        </button>
      </div>

      {/* Card */}
      <div className="flex flex-row items-center p-3 sm:p-4 bg-gray-50 rounded-xl border gap-3 sm:gap-4">
        {/* Date */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex flex-col items-center justify-center text-green-700 font-semibold">
          <span className="text-xl sm:text-2xl">{appointment.day}</span>
          <span className="text-xs sm:text-sm">{appointment.weekday}</span>
        </div>

        {/* Middle */}
        <div className="flex flex-col flex-grow">
          <p className="text-purple-600 text-sm sm:text-base font-semibold">
            {appointment.time}
          </p>
          <p className="text-md sm:text-lg font-semibold">{appointment.title}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{appointment.doctor}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointment;
