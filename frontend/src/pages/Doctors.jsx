import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { assets } from "../assets/assets";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");

  // --- Mock Doctors ---
  const sampleDoctors = [
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

  // --- Filters ---
  const specialities = [
    "All",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "ENT",
    "General Surgery",
    "Gynaecology",
    "Urology",
  ];

  // --- Search & Filter Logic ---
  const filteredDoctors = sampleDoctors.filter((doc) => {
    const query = search.toLowerCase();
    const matchesSearch =
      doc.name.toLowerCase().includes(query) ||
      doc.speciality.toLowerCase().includes(query);
    const matchesSpeciality =
      selectedSpeciality === "All" || doc.speciality === selectedSpeciality;
    return matchesSearch && matchesSpeciality;
  });

  // --- Handle Scroll Shadow for Fixed Header ---
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Fixed Header --- */}
      <div
        className={`fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 md:px-10 py-4 pt-20 ">
          {/* --- Title --- */}
          <div className="w-full bg-blue-600 py-3 flex justify-center rounded-xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
              Our Top Doctors
            </h1>
          </div>

          {/* --- Search Bar --- */}
          <div className="flex items-center w-full sm:w-1/2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm px-3 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by doctor or speciality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-700"
            />
          </div>

          {/* --- Filters --- */}
          <div className="flex flex-wrap gap-2 sm:gap-3 text-sm text-gray-600 pb-2">
            {specialities.map((spec, i) => (
              <span
                key={i}
                onClick={() => setSelectedSpeciality(spec)}
                className={`border border-gray-300 rounded-full px-4 py-1.5 cursor-pointer transition-all 
                  ${
                    selectedSpeciality === spec
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-blue-50"
                  }`}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Doctor Cards Section --- */}
      <div className="pt-48 px-4 md:px-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDoctors.map((doc, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl 
                         transition-all duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-48 object-cover bg-gray-50"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-gray-900 text-lg font-semibold">{doc.name}</p>
                  <p className="text-blue-600 text-sm font-medium">{doc.speciality}</p>
                  <p className="text-gray-600 text-sm mt-1">{doc.hospital}</p>
                </div>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="mt-4 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg 
                             hover:bg-blue-500 transition-all shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <p className="text-center text-gray-500 col-span-full py-10">
              No doctors found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
