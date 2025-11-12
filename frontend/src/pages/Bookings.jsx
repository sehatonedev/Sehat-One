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
    { id: "active", label: "Active" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past Bookings" },
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

  // Filter appointments based on tab
  const getFilteredAppointments = () => {
    const now = new Date();
    
    return appointments.filter(apt => {
      if (apt.cancelled) return false;
      
      const [day, month, year] = apt.slotDate.split('_').map(Number);
      const appointmentDate = new Date(year, month - 1, day);
      
      if (tab === "active") {
        // Active: not cancelled, not completed, payment done, date is today or future
        return !apt.isCompleted && apt.payment && appointmentDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (tab === "upcoming") {
        // Upcoming: not cancelled, not completed, date is future
        return !apt.isCompleted && appointmentDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (tab === "past") {
        // Past: completed or date is past
        return apt.isCompleted || appointmentDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
      }
      return false;
    });
  };

  const filteredAppointments = getFilteredAppointments();

  if (!isLoggedIn) return null;

  return (
    <div className="w-full min-h-screen bg-white p-0">

      {/* Heading */}
      <div className="w-full bg-blue-600 py-2 flex justify-center rounded-none mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-wide">
          My Bookings
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 sm:mb-8 w-full px-2">
        <div className="flex gap-1 sm:gap-2 bg-gray-100 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm overflow-x-auto whitespace-nowrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200 whitespace-nowrap
                ${
                  tab === t.id
                    ? "text-white bg-blue-600 shadow-md"
                    : "text-gray-700 hover:bg-blue-100"
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
            {/* ACTIVE BOOKINGS */}
            {tab === "active" && (
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
                    <p>No active bookings right now.</p>
                  </div>
                )}
              </div>
            )}

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

            {/* PAST BOOKINGS */}
            {tab === "past" && (
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
                    <p>Your past bookings will appear here.</p>
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
