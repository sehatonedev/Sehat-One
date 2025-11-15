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
          const now = new Date();
          
          // Helper function to get appointment datetime
          const getAppointmentDateTime = (slotDate, slotTime) => {
            const [day, month, year] = slotDate.split('_').map(Number);
            
            // Parse time - handle both 12-hour (11:00 AM) and 24-hour (11:00) formats
            let hours = 0;
            let minutes = 0;
            
            if (slotTime) {
              const timeStr = slotTime.trim().toUpperCase();
              const hasAMPM = timeStr.includes('AM') || timeStr.includes('PM');
              
              if (hasAMPM) {
                // 12-hour format: "11:00 AM" or "11:00 PM"
                const parts = timeStr.replace(/\s*(AM|PM)\s*/i, '').split(':');
                hours = parseInt(parts[0]) || 0;
                minutes = parseInt(parts[1]) || 0;
                
                if (timeStr.includes('PM') && hours !== 12) {
                  hours += 12;
                } else if (timeStr.includes('AM') && hours === 12) {
                  hours = 0;
                }
              } else {
                // 24-hour format: "11:00"
                const parts = slotTime.split(':');
                hours = parseInt(parts[0]) || 0;
                minutes = parseInt(parts[1]) || 0;
              }
            }
            
            return new Date(year, month - 1, day, hours, minutes, 0);
          };
          
          // Filter for upcoming appointments: not cancelled, not completed, and datetime hasn't passed
          const upcomingAppointments = data.appointments
            .filter((apt) => {
              if (apt.cancelled || apt.isCompleted) return false;
              
              // Get the full appointment datetime (date + time)
              const appointmentDateTime = getAppointmentDateTime(apt.slotDate, apt.slotTime);
              
              // Only include appointments where time hasn't passed yet
              return appointmentDateTime >= now;
            })
            .sort((a, b) => {
              // Sort by datetime (earliest first)
              const dateTimeA = getAppointmentDateTime(a.slotDate, a.slotTime);
              const dateTimeB = getAppointmentDateTime(b.slotDate, b.slotTime);
              
              return dateTimeA - dateTimeB;
            });

          // Get the first (earliest) upcoming appointment
          if (upcomingAppointments.length > 0) {
            setUpcomingAppointment(upcomingAppointments[0]);
          } else {
            setUpcomingAppointment(null);
          }
        }
      } catch (error) {
        console.log(error);
        setUpcomingAppointment(null);
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
      <div 
        onClick={() => navigate("/bookings")}
        className="flex flex-row items-center p-3 sm:p-4 bg-gray-50 rounded-xl border gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        {/* Date */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-xl flex flex-col items-center justify-center text-green-700 font-semibold flex-shrink-0">
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
