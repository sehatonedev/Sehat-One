import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpcomingAppointment = () => {
  const { isLoggedIn, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [allActiveAppointments, setAllActiveAppointments] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllActive, setShowAllActive] = useState(false);

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
    const fetchAppointments = async () => {
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
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
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
          
          // Filter for active appointments: Today, paid, not completed, and time hasn't passed yet
          const activeAppointments = data.appointments
            .filter((apt) => {
              if (apt.cancelled || apt.isCompleted || !apt.payment) return false;
              
              const appointmentDateTime = getAppointmentDateTime(apt.slotDate, apt.slotTime);
              const appointmentDate = new Date(appointmentDateTime.getFullYear(), appointmentDateTime.getMonth(), appointmentDateTime.getDate());
              const isToday = appointmentDate.getTime() === today.getTime();
              const isPast = appointmentDateTime < now;
              
              return !isPast && isToday;
            })
            .sort((a, b) => {
              const dateTimeA = getAppointmentDateTime(a.slotDate, a.slotTime);
              const dateTimeB = getAppointmentDateTime(b.slotDate, b.slotTime);
              return dateTimeA - dateTimeB;
            });

          // Filter for upcoming appointments: not cancelled, not completed, and datetime hasn't passed
          const upcomingAppointments = data.appointments
            .filter((apt) => {
              if (apt.cancelled || apt.isCompleted) return false;
              
              const appointmentDateTime = getAppointmentDateTime(apt.slotDate, apt.slotTime);
              return appointmentDateTime >= now;
            })
            .sort((a, b) => {
              const dateTimeA = getAppointmentDateTime(a.slotDate, a.slotTime);
              const dateTimeB = getAppointmentDateTime(b.slotDate, b.slotTime);
              return dateTimeA - dateTimeB;
            });

          // Store all active appointments
          setAllActiveAppointments(activeAppointments);
          
          // Get the first (earliest) active appointment
          if (activeAppointments.length > 0) {
            setActiveAppointment(activeAppointments[0]);
          } else {
            setActiveAppointment(null);
          }

          // Get the first (earliest) upcoming appointment (excluding active ones)
          const upcomingWithoutActive = upcomingAppointments.filter(apt => {
            if (!activeAppointments.length) return true;
            return apt._id !== activeAppointments[0]._id;
          });

          if (upcomingWithoutActive.length > 0) {
            setUpcomingAppointment(upcomingWithoutActive[0]);
          } else {
            setUpcomingAppointment(null);
          }
        }
      } catch (error) {
        console.log(error);
        setActiveAppointment(null);
        setUpcomingAppointment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isLoggedIn, token, backendUrl]);

  if (!isLoggedIn || loading) return null;
  if (!activeAppointment && !upcomingAppointment) return null;

  const renderAppointmentCard = (appointment, showHeader = false, title = "", buttonType = "none") => {
    const formattedDate = slotDateFormat(appointment.slotDate);
    const time12hr = appointment.slotTime;

    const handleButtonClick = () => {
      if (buttonType === "toggle") {
        setShowAllActive(!showAllActive);
      } else if (buttonType === "navigate") {
        navigate("/bookings");
      }
    };

    const getButtonText = () => {
      if (buttonType === "toggle") {
        return showAllActive ? "Show Less" : "View All Bookings";
      } else if (buttonType === "navigate") {
        return "View All Bookings";
      }
      return "";
    };

    return (
      <div key={appointment._id} className="w-full bg-white py-2 px-1 sm:px-3 rounded-lg shadow-md mb-4">
        {/* Header - only show for first card */}
        {showHeader && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {title}
            </h2>

            {buttonType !== "none" && (
              <button
                onClick={handleButtonClick}
                className="mt-2 sm:mt-0 text-blue-600 font-semibold hover:underline text-sm sm:text-base"
              >
                {getButtonText()}
              </button>
            )}
          </div>
        )}

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
            <p className="text-md sm:text-lg font-semibold">{appointment.docData?.speciality || 'Appointment'}</p>
            <p className="text-gray-500 text-xs sm:text-sm">{appointment.docData?.name || 'Doctor'}</p>
          </div>
        </div>
      </div>
    );
  };

  // Get appointments to display
  const activeToShow = showAllActive 
    ? allActiveAppointments.slice(0, 5) 
    : (activeAppointment ? [activeAppointment] : []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-0">
      {/* Active Appointments */}
      {activeToShow.length > 0 && (
        <>
          {activeToShow.map((apt, index) => 
            renderAppointmentCard(apt, index === 0, "Active Appointment", "toggle")
          )}
        </>
      )}
      
      {/* Upcoming Appointment */}
      {upcomingAppointment && renderAppointmentCard(upcomingAppointment, true, "Upcoming Appointment", "navigate")}
    </div>
  );
};

export default UpcomingAppointment;
