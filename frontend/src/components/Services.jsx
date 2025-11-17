import React, { useState, useEffect } from "react";
import { FlaskConical, Video, Hospital, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import UpcomingAppointment from "./UpcomingAppointment";

const Services = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderImages = [
    assets.slider1,
    assets.slider2,
    assets.slider3,
    assets.slider4,
  ].filter(Boolean);

  useEffect(() => {
    if (sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 pt-6 sm:pt-8 md:pt-10">
      {/* Slider */}
      <div className="relative w-full h-[200px] sm:h-[320px] md:h-[450px] overflow-hidden rounded-2xl shadow-md mb-4 sm:mb-6 md:mb-8 px-4 sm:px-0">
        {sliderImages.map((src, index) => (
          <img
            key={`slider-${index}`}
            src={src}
            alt={`Slide ${index + 1}`}
            onClick={() => navigate("/login")}
            className={`absolute top-0 left-0 w-full h-full object-cover object-center cursor-pointer transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            onError={(e) => {
              console.error(`Failed to load slider image ${index + 1}:`, src);
              e.target.style.display = 'none';
            }}
          />
        ))}
      </div>

      {/* Upcoming/Active Appointments */}
      <div className="w-full mb-6 sm:mb-8 md:mb-10">
        <UpcomingAppointment />
      </div>

      {/* Heading */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
          Our Services
        </h2>
      </div>

      {/* Services Grid */}
      <section className="w-full grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 md:gap-4 px-4 sm:px-6 md:px-0">

        {/* Video Consultation */}
        <div
          onClick={() => navigate("/vc")}
          className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                    transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <img
            src={assets.videoconsultation}
            alt="Video Consultation"
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Video className="text-orange-400 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-center">Video Consultation</h3>
          </div>
        </div>

        {/* Pods */}
        <div
          onClick={() => navigate("/Pods")}
          className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                    transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <img
            src={assets.hero_img}
            alt="Pods"
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Hospital className="text-teal-300 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-center">Pods</h3>
          </div>
        </div>

        {/* Medicine */}
        <div
          onClick={() => navigate("/Medicine")}
          className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                    transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <img
            src={assets.contact_image}
            alt="Medicine"
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Pill className="text-green-400 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-center">Medicine</h3>
          </div>
        </div>

        {/* Lab Tests */}
        <div
          onClick={() => navigate("/LabTests")}
          className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                    transition-all duration-300 hover:shadow-lg cursor-pointer group"
        >
          <img
            src={assets.group_profiles}
            alt="Lab Tests"
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <FlaskConical className="text-red-400 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-center">Lab Tests</h3>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Services;
