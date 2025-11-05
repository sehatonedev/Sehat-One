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
  ];

  return (
    <section className="text-center text-black w-full m-auto px-4 md:px-10 py-8 mt-4 mb-6">
      {/* --- Section Header --- */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-left">Top Categories</h2>

        {/* View All Button */}
        <button
          onClick={() => setViewAll(!viewAll)}
          className="text-blue-600 font-medium hover:underline text-sm sm:text-base"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>

      
      <div
        className={`transition-all duration-500 ${
          viewAll
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center"
            : "flex flex-nowrap overflow-x-auto gap-4 sm:gap-6 justify-start scrollbar-hide"
        }`}
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center flex-shrink-0"
          >
            <div className="p-1 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 bg-white">
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain rounded-xl"
              />
            </div>
            <p className="mt-3 text-gray-800 font-medium text-xs sm:text-sm md:text-base max-w-[150px] leading-tight text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
