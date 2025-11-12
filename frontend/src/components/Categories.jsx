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
    <section className="text-center text-black w-full mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 mt-10 mb-6">
      <div className="relative mb-0 sm:mb-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        <div className="text-center mb-2 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Top Categories
          </h2>
        </div>

        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-blue-600 font-medium hover:underline text-sm sm:text-base mt-2 sm:mt-0"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>

      <div
        className={`transition-all duration-500 ${
          viewAll
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-start"
            : "flex flex-nowrap overflow-x-auto gap-3 sm:gap-4 justify-start scrollbar-hide items-start"
        }`}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start flex-shrink-0 h-full min-h-[220px] sm:min-h-[240px] md:min-h-[260px]"
          >
            <div className="p-1 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 bg-white flex-shrink-0">
              <img
                src={item.img}
                alt={item.name}
                className="w-28 h-28 sm:w-32 sm:h-20 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain rounded-xl"
              />
            </div>
            <p className="mt-2 sm:mt-3 text-gray-800 font-medium text-xs sm:text-sm md:text-base max-w-[160px] sm:max-w-[180px] md:max-w-[200px] leading-tight text-center flex-grow">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
