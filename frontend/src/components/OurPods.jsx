import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const OurPods = () => {
  const navigate = useNavigate();

  const hospitals = [
    { name: "AIIMS", location: "Delhi, India", rating: 4.8, reviews: 456, image: assets.doc1 },
    { name: "Care Hospital", location: "Hyderabad, India", rating: 4.7, reviews: 320, image: assets.doc2 },
    { name: "SUM Hospital", location: "Bhubaneswar, India", rating: 4.6, reviews: 210, image: assets.doc3 },
    { name: "Apollo Hospital", location: "Chennai, India", rating: 4.5, reviews: 400, image: assets.doc4 },
    { name: "Fortis", location: "Bangalore, India", rating: 4.4, reviews: 180, image: assets.doc5 },
    { name: "KIMS", location: "Kolkata, India", rating: 4.3, reviews: 150, image: assets.doc6 }
  ];

  return (
    <section className="flex flex-col gap-4 my-16 text-black px-4 md:mx-10 overflow-hidden">
      {/* Header */}
<div className="text-center mb-4">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
    Our Pods
  </h2>
  <button
    onClick={() => navigate("/pods")}
    className="mt-2 text-blue-600 font-medium hover:underline text-xs sm:text-sm md:text-base"
  >
    View All
  </button>
</div>


      {/* Horizontal Scroll */}
      <div className="flex gap-3 sm:gap-5 pt-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar">
        {hospitals.map((pod, index) => (
          <div
            key={index}
            className="min-w-[180px] sm:min-w-[220px] md:min-w-[250px] bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1 relative"
          >
            {/* Hospital Image */}
            <img
              src={pod.image}
              alt={pod.name}
              className="w-full h-32 sm:h-40 md:h-44 object-cover"
            />

            {/* Hospital Info */}
            <div className="p-2 sm:p-3 md:p-4">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                {pod.name}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
                {pod.location}
              </p>
              <div className="flex items-center mt-1 sm:mt-2 gap-1">
                <span className="text-xs sm:text-sm md:text-base font-medium">{pod.rating}</span>
                <span className="text-xs sm:text-sm md:text-base text-gray-500">
                  ({pod.reviews} Reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPods;
