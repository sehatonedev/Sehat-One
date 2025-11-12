import React, { useState } from "react";
import Consultations from "../components/Consultations";
import Prescriptions from "../components/Prescriptions";
import Reports from "../components/Reports";

const Records = () => {
  const [tab, setTab] = useState("consultations");

  const tabs = [
    { id: "consultations", label: "Consultations" },
    { id: "prescriptions", label: "Prescriptions" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-6">

      {/* Page Heading */}
      <div className="w-full bg-blue-600 py-3 sm:py-4 flex justify-center rounded-xl mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-wide">
          My Records
        </h1>
      </div>

      {/* Tabs */}
{/* Tabs */}
<div className="flex justify-center mb-8 overflow-x-auto scrollbar-none">
  <div className="flex gap-4 bg-gray-100 px-3 py-2 rounded-full shadow-sm whitespace-nowrap">
    {tabs.map(t => (
      <button
        key={t.id}
        onClick={() => setTab(t.id)}
        className={`px-3 sm:px-5 py-1.5 rounded-full text-sm sm:text-base font-semibold transition-all 
          ${tab === t.id
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-blue-100"
          }`}
      >
        {t.label}
      </button>
    ))}
  </div>
</div>


      {/* Active Tab Content */}
      <div className="w-full">
        {tab === "consultations" && <Consultations />}
        {tab === "prescriptions" && <Prescriptions />}
        {tab === "reports" && <Reports />}
      </div>

    </div>
  );
};

export default Records;
