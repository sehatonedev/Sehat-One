import React, { useState } from "react";
import UpcomingAppointmentDetails from "./UpcomingAppointmentDetails";

const Bookings = () => {
  const [tab, setTab] = useState("upcoming");

  const tabs = [
    { id: "active", label: "Active" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past Bookings" },
  ];

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
          <div className="w-full max-w-4xl text-center text-gray-700 text-base sm:text-lg py-8">
            <p>No active bookings right now.</p>
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
          <div className="w-full max-w-4xl text-center text-gray-700 text-base sm:text-lg py-8">
            <p>Your past bookings will appear here.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Bookings;
