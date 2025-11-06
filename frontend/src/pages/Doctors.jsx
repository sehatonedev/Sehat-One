import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");

  // Get unique specialities from doctors data
  const specialities = ["All", ...new Set(doctors.map(doc => doc.speciality).filter(Boolean))];

  // --- Search & Filter Logic ---
  const filteredDoctors = doctors.filter((doc) => {
    const query = search.toLowerCase();
    const matchesSearch =
      doc.name?.toLowerCase().includes(query) ||
      doc.speciality?.toLowerCase().includes(query);
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
        className={`fixed top-14 sm:top-16 left-0 w-full bg-white z-40 transition-all duration-300 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 px-4 md:px-10 py-4 sm:py-5">
          {/* --- Title --- */}
          <div className="w-full bg-blue-600 py-3 sm:py-4 flex justify-center rounded-xl">
            <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
              Our Top Doctors
            </h1>
          </div>

          {/* --- Search Bar --- */}
          <div className="flex items-center w-full sm:w-1/2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm px-4 py-2.5">
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
      <div className="pt-[220px] sm:pt-[220px] md:pt-[260px] px-4 md:px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl 
                         transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow gap-3">
                <div className="space-y-2">
                  <p className="text-gray-900 text-lg font-semibold">{doc.name}</p>
                  <p className="text-blue-600 text-sm font-medium">{doc.speciality}</p>
                  {doc.address && (
                    <p className="text-gray-600 text-sm">
                      {doc.address.line1}{doc.address.line2 ? `, ${doc.address.line2}` : ''}
                    </p>
                  )}
                  {doc.fees && (
                    <p className="text-gray-700 text-sm font-medium">
                      Fee: {currencySymbol}{doc.fees}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/appointment/${doc._id}`)}
                  className="mt-2 bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg 
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
