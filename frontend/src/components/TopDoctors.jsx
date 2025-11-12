import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [viewAll, setViewAll] = useState(false);

  const fallbackDoctors = [
    { name: "Dr. Olivia Smith", speciality: "Cardiology", hospital: "Apollo Hospital", image: assets.doc1 },
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

  const displayedDoctors = viewAll ? doctorsList : doctorsList.slice(0, 4);

  return (
    <section className="flex flex-col gap-4 my-16 text-black md:mx-10 px-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
          Top Doctors
        </h2>
        <button
          onClick={() => setViewAll(!viewAll)}
          className="mt-2 text-blue-600 font-medium hover:underline text-sm sm:text-base md:text-lg"
        >
          {viewAll ? "View Less" : "View All"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 overflow-x-auto no-scrollbar pt-2">
        {displayedDoctors.map((doc, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${doc._id || index}`);
              scrollTo(0, 0);
            }}
            className="flex flex-row sm:flex-col min-w-[250px] sm:min-w-[220px] md:min-w-[250px] bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
          >
            <div className="w-1/3 sm:w-full h-32 sm:h-44">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-3 sm:p-4 w-2/3 sm:w-full text-left sm:text-center">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                {doc.name}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-blue-600 font-medium mt-1">
                {doc.speciality}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{doc.hospital}</p>
              <div className="mt-2 sm:mt-4 flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/doctors");
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

