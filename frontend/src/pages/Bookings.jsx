import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import UpcomingAppointmentDetails from "./UpcomingAppointmentDetails";

const Bookings = () => {
  const [tab, setTab] = useState("upcoming");
  const { token, backendUrl, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', {
          headers: { token }
        });

        if (data.success) {
          setAppointments(data.appointments || []);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token, backendUrl, isLoggedIn, navigate]);

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

  // Filter and sort appointments based on tab
  const getFilteredAppointments = () => {
    const now = new Date();
    
    const filtered = appointments.filter(apt => {
      // Skip cancelled appointments
      if (apt.cancelled) return false;
      
      // Get the full appointment datetime (date + time)
      const appointmentDateTime = getAppointmentDateTime(apt.slotDate, apt.slotTime);
      
      // Check if appointment time has passed
      const isPast = appointmentDateTime < now;
      
      // Filter based on tab
      if (tab === "completed") {
        // Completed: Either marked as completed OR time has passed (regardless of payment)
        return apt.isCompleted || isPast;
      } else if (tab === "upcoming") {
        // Upcoming: Future appointments (not completed, time hasn't passed, can be paid or unpaid)
        return !apt.isCompleted && !isPast;
      }
      
      return false;
    });

    // Sort appointments based on tab
    return filtered.sort((a, b) => {
      const dateTimeA = getAppointmentDateTime(a.slotDate, a.slotTime);
      const dateTimeB = getAppointmentDateTime(b.slotDate, b.slotTime);
      
      if (tab === "completed") {
        // For completed, show newest first
        return dateTimeB - dateTimeA;
      } else {
        // For upcoming, show earliest first
        return dateTimeA - dateTimeB;
      }
    });
  };

  const filteredAppointments = getFilteredAppointments();

  if (!isLoggedIn) return null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 sm:px-6 lg:px-10 py-6">

      {/* Page Heading with Description */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6 sm:py-8 flex flex-col items-center justify-center rounded-2xl mb-8 shadow-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-2">
          My Bookings
        </h1>
        <p className="text-blue-100 text-sm sm:text-base text-center px-4">
          Manage your upcoming and completed appointments in one place
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 sm:mb-8 w-full">
        <div className="flex bg-white px-3 sm:px-4 py-2 rounded-full shadow-md overflow-x-auto whitespace-nowrap border border-gray-200">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap
                ${
                  tab === t.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT SECTIONS */}
      <div className="w-full flex flex-col items-center">

        {loading ? (
          <div className="w-full max-w-4xl text-center text-gray-700 text-base sm:text-lg py-8">
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <>
            {/* UPCOMING BOOKINGS */}
            {tab === "upcoming" && (
              <div className="w-full px-4">
                {filteredAppointments.length > 0 ? (
                  <>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                      Appointment Details
                    </h1>
                    {filteredAppointments.map((apt, index) => (
                      <UpcomingAppointmentDetails key={apt._id || index} appointment={apt} />
                    ))}
                  </>
                ) : (
                  <div className="text-center text-gray-700 text-base sm:text-lg py-8">
                    <p>No upcoming bookings.</p>
                  </div>
                )}
              </div>
            )}

            {/* COMPLETED BOOKINGS */}
            {tab === "completed" && (
              <div className="w-full max-w-4xl px-4">
                {filteredAppointments.length > 0 ? (
                  <>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                      Appointment Details
                    </h1>
                    {filteredAppointments.map((apt, index) => (
                      <UpcomingAppointmentDetails key={apt._id || index} appointment={apt} />
                    ))}
                  </>
                ) : (
                  <div className="text-center text-gray-700 text-base sm:text-lg py-8">
                    <p>Your Completed bookings will appear here.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
};

export default Bookings;
