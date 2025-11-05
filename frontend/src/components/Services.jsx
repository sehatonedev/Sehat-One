import React, { useState, useEffect } from "react";
import { FlaskConical, Video, Hospital, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Slider images (place these inside /public folder) ---
 const sliderImages = [
  "/assets/slider1.jpg",
  "/assets/slider2.jpg",
  "/assets/slider3.jpg",
  "/assets/slider4.jpg",
];


  // --- Autoplay logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen pt-10">

      {/* --- Image Slider --- */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] overflow-hidden rounded-2xl shadow-md mb-8">
        {sliderImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            onClick={() => navigate("/login")}
            className={`absolute top-0 left-0 w-full h-full object-cover cursor-pointer transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

{/* --- Smaller Services Boxes --- */}
<section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 px-0 sm:px-0 md:px-0 mb-6">

  {/* Video Consultation */}
  <div className="flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl p-2 h-[65px] shadow-md 
                  transition-all duration-300 hover:bg-[#7A5C47] hover:shadow-lg">
    <Video className="text-orange-400 w-5 h-5 mb-0.5" />
    <h3 className="font-semibold text-xs md:text-sm">Video Consultation</h3>
  </div>

  {/* Pods */}
  <div className="flex flex-col items-center justify-center bg-[#225E5E] text-white rounded-xl p-2 h-[65px] shadow-md 
                  transition-all duration-300 hover:bg-[#2E7E7E] hover:shadow-lg">
    <Hospital className="text-teal-300 w-5 h-5 mb-0.5" />
    <h3 className="font-semibold text-xs md:text-sm">Pods</h3>
  </div>

  {/* Medicine */}
  <div className="flex flex-col items-center justify-center bg-[#0F4D43] text-white rounded-xl p-2 h-[65px] shadow-md 
                  transition-all duration-300 hover:bg-[#187364] hover:shadow-lg">
    <Pill className="text-green-400 w-5 h-5 mb-0.5" />
    <h3 className="font-semibold text-xs md:text-sm">Medicine</h3>
  </div>

  {/* Lab Tests */}
  <div className="flex flex-col items-center justify-center bg-[#542E31] text-white rounded-xl p-2 h-[65px] shadow-md 
                  transition-all duration-300 hover:bg-[#7A4448] hover:shadow-lg md:col-span-2 lg:col-span-1">
    <FlaskConical className="text-red-400 w-5 h-5 mb-0.5" />
    <h3 className="font-semibold text-xs md:text-sm">Lab Tests</h3>
  </div>

</section>

    </div>
  );
};

export default Services;
