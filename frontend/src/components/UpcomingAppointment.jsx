import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpcomingAppointment = () => {
  const { isLoggedIn, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [upcomingAppointment, setUpcomingAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return {
      day: dateArray[0],
      month: months[Number(dateArray[1]) - 1],
      year: dateArray[2],
      weekday: (() => {
        const date = new Date(Number(dateArray[2]), Number(dateArray[1]) - 1, Number(dateArray[0]));
        return daysOfWeek[date.getDay()];
      })()
    };
  };

  useEffect(() => {
    const fetchUpcomingAppointment = async () => {
      if (!isLoggedIn || !token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', {
          headers: { token }
        });

        if (data.success && data.appointments) {
          // Find the first upcoming appointment that is not cancelled and not completed
          const upcoming = data.appointments.find(
            (apt) => !apt.cancelled && !apt.isCompleted
          );

          if (upcoming) {
            setUpcomingAppointment(upcoming);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingAppointment();
  }, [isLoggedIn, token, backendUrl]);

  if (!isLoggedIn || loading) return null;
  if (!upcomingAppointment) return null;

  const formattedDate = slotDateFormat(upcomingAppointment.slotDate);
  const time12hr = upcomingAppointment.slotTime;

  return (
    <div className="w-full bg-white py-2 px-1 sm:px-3 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Upcoming Appointment
        </h2>

        <button
          onClick={() => navigate("/bookings")}
          className="mt-2 sm:mt-0 text-blue-600 font-semibold hover:underline text-sm sm:text-base"
        >
          View All Bookings
        </button>
      </div>

      {/* Card */}
      <div className="flex flex-row items-center p-3 sm:p-4 bg-gray-50 rounded-xl border gap-3 sm:gap-4">
        {/* Date */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex flex-col items-center justify-center text-green-700 font-semibold">
          <span className="text-xl sm:text-2xl">{formattedDate.day}</span>
          <span className="text-xs sm:text-sm">{formattedDate.weekday}</span>
        </div>

        {/* Middle */}
        <div className="flex flex-col flex-grow">
          <p className="text-purple-600 text-sm sm:text-base font-semibold">
            {time12hr}
          </p>
          <p className="text-md sm:text-lg font-semibold">{upcomingAppointment.docData?.speciality || 'Appointment'}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{upcomingAppointment.docData?.name || 'Doctor'}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointment;
