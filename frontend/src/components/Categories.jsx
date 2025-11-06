import React, { useState } from "react";
import { assets } from "../assets/assets";

const Categories = () => {
  const [viewAll, setViewAll] = useState(false);

  const categories = [
    { name: "Dermatology (Pigmentation and dark spots)", img: assets.dermatology_icon },
    { name: "Radiology (Fractures or injuries)", img: assets.radiology_icon },
    { name: "Cardiology (Chest pain or tightness)", img: assets.cardiology_icon },
    { name: "Neurology (Headaches and migraines)", img: assets.neurology_icon },
    { name: "Pediatrics (Cough and breathing issues)", img: assets.pediatrics_icon },
    { name: "General Physician (General health checkup)", img: assets.General_physician },
    { name: "Gynecology (Women's health and wellness)", img: assets.Gynecologist },
    { name: "Gastroenterology (Digestive system issues)", img: assets.Gastroenterologist },
    { name: "Orthopedics (Bone and joint problems)", img: assets.radiology_icon },
    { name: "ENT (Ear, nose and throat disorders)", img: assets.cardiology_icon },
    { name: "Urology (Urinary system issues)", img: assets.pediatrics_icon },
  ];

  return (
    <section className="text-center text-black w-full m-auto px-4 md:px-10 py-8 mt-16 mb-6">
      {/* --- Section Header --- */}
      <div className="relative mb-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Top Categories</h2>
        </div>
        
        {/* View All Button - Positioned absolutely to the right */}
        <button
          onClick={() => setViewAll(!viewAll)}
          className="absolute top-0 right-0 text-blue-600 font-medium hover:underline text-sm sm:text-base"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>

      
      <div
        className={`transition-all duration-500 ${
          viewAll
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-start"
            : "flex flex-nowrap overflow-x-auto gap-4 sm:gap-6 justify-start scrollbar-hide items-start"
        }`}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start flex-shrink-0 h-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px]"
          >
            <div className="p-1 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 bg-white flex-shrink-0">
              <img
                src={item.img}
                alt={item.name}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-contain rounded-xl"
              />
            </div>
            <p className="mt-4 text-gray-800 font-medium text-sm sm:text-base md:text-lg max-w-[180px] leading-tight text-center flex-grow">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
