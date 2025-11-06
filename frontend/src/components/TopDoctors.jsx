import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [viewAll, setViewAll] = useState(false);

  // --- Fallback doctor data (in case context is empty) ---
  const fallbackDoctors = [
    { name: "Dr. Olivia Smith", speciality: "Cardiology", hospital: "Apollo Hospital", image:assets.doc1 },
    { name: "Dr. Ethan Brown", speciality: "Dermatology", hospital: "Fortis Health", image: assets.doc2 },
    { name: "Dr. Ava Johnson", speciality: "Neurology", hospital: "AIIMS", image: assets.doc3 },
    { name: "Dr. Liam Patel", speciality: "Orthopedics", hospital: "Medanta Hospital", image: assets.doc4 },
    { name: "Dr. Sophia Lee", speciality: "Pediatrics", hospital: "CloudNine", image: assets.doc5 },
    { name: "Dr. Noah Kumar", speciality: "Radiology", hospital: "Manipal Hospital", image: assets.doc6 },
    { name: "Dr. Isabella Chen", speciality: "ENT", hospital: "Columbia Asia", image: assets.doc7 },
    { name: "Dr. Mason Roy", speciality: "General Surgery", hospital: "Max Healthcare", image: assets.doc8 },
    { name: "Dr. Amelia Davis", speciality: "Gynaecology", hospital: "Care Hospital", image: assets.doc9 },
    { name: "Dr. William Scott", speciality: "Urology", hospital: "KIMS", image: assets.doc10 },
  ];

  const doctorsList = doctors?.length ? doctors : fallbackDoctors;
const isSmallScreen = window.innerWidth < 640;
const displayedDoctors = viewAll
  ? doctorsList
  : doctorsList.slice(0, isSmallScreen ? 2 : 4);


  return (
    <section className="flex flex-col gap-4 my-16 text-black md:mx-10 px-4">
      {/* --- Header --- */}
      <div className="relative mb-2">
        <div className="text-center mb-2">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Top Doctors
          </h2>
        </div>
        
        {/* View All Button - Positioned absolutely to the right */}
        <button
          onClick={() => setViewAll(!viewAll)}
          className="absolute top-0 right-0 text-blue-600 font-medium hover:underline text-xs sm:text-sm md:text-base"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>

      {/* --- Doctor Cards --- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 pt-5">
        {displayedDoctors.map((doc, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${doc._id || index}`);
              scrollTo(0, 0);
            }}
            className="flex flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
          >
            {/* --- Doctor Image --- */}
            <div className="w-1/3 sm:w-2/5">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* --- Doctor Info --- */}
            <div className="flex flex-col justify-center p-3 sm:p-4 w-2/3 sm:w-3/5 text-left">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                {doc.name}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-blue-600 font-medium mt-1">
                {doc.speciality}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {doc.hospital}
              </p>
              <div className="mt-3 sm:mt-4">
               <button
  onClick={(e) => {
    e.stopPropagation(); 
    navigate("/login");
  }}
  className="bg-blue-100 text-blue-700 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-blue-200 transition"
>
  Book Now
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;
