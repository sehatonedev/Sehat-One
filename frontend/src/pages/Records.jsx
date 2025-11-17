import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Prescriptions from "../components/Prescriptions";
import Reports from "../components/Reports";

const Records = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("prescriptions");

  // Check for tab query parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'prescriptions' || tabParam === 'reports') {
      setTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: "prescriptions", label: "Prescriptions" },
    { id: "reports", label: "Reports" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 sm:px-6 lg:px-10 py-6">

      {/* Page Heading with Description */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6 sm:py-8 flex flex-col items-center justify-center rounded-2xl mb-8 shadow-lg">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-2">
          My Medical Records
        </h1>
        <p className="text-blue-100 text-sm sm:text-base text-center px-4">
          Access your prescriptions and medical reports all in one place
        </p>
      </div>

      {/* Enhanced Tabs */}
      <div className="flex justify-center mb-8 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 sm:gap-4 bg-white px-3 sm:px-4 py-2 rounded-full shadow-md whitespace-nowrap border border-gray-200">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300
                ${tab === t.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tab Content with Animation */}
      <div className="w-full animate-fadeIn">
        {tab === "prescriptions" && <Prescriptions />}
        {tab === "reports" && <Reports />}
      </div>

    </div>
  );
};

export default Records;
