import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UpcomingAppointmentDetails from "./UpcomingAppointmentDetails";

const Bookings = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "active", label: "Active" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past Bookings" },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
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

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Filter appointments based on tab
  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointments.filter(apt => {
      if (apt.cancelled) return false;

      const aptDate = new Date(apt.slotDate.split('_').reverse().join('-'));

      if (tab === "active") {
        return !apt.isCompleted && apt.payment && aptDate >= today;
      } else if (tab === "upcoming") {
        return !apt.isCompleted && aptDate >= today;
      } else if (tab === "past") {
        return apt.isCompleted || aptDate < today;
      }
      return false;
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white p-0 flex items-center justify-center">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full min-h-screen bg-white p-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your bookings</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const filteredAppointments = getFilteredAppointments();

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

        {/* ACTIVE BOOKINGS */}
        {tab === "active" && (
          <div className="w-full max-w-4xl px-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center text-gray-700 text-base sm:text-lg py-8">
                <p>No active bookings right now.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((apt, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <img
                        src={apt.docData?.image || "https://via.placeholder.com/150"}
                        alt="doctor"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{apt.docData?.name || "Doctor"}</h3>
                        <p className="text-gray-600 text-sm">{apt.docData?.speciality || ""}</p>
                        <p className="text-gray-500 text-sm">
                          {slotDateFormat(apt.slotDate)} | {apt.slotTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPCOMING BOOKINGS */}
        {tab === "upcoming" && (
          <div className="w-full">
            <UpcomingAppointmentDetails />
          </div>
        )}

        {/* PAST BOOKINGS */}
        {tab === "past" && (
          <div className="w-full max-w-4xl px-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center text-gray-700 text-base sm:text-lg py-8">
                <p>Your past bookings will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((apt, index) => (
                  <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <img
                        src={apt.docData?.image || "https://via.placeholder.com/150"}
                        alt="doctor"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{apt.docData?.name || "Doctor"}</h3>
                        <p className="text-gray-600 text-sm">{apt.docData?.speciality || ""}</p>
                        <p className="text-gray-500 text-sm">
                          {slotDateFormat(apt.slotDate)} | {apt.slotTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          apt.isCompleted 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {apt.isCompleted ? "Completed" : "Past"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

export default Bookings;
