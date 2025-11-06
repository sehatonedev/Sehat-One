import React, { useState, useEffect } from "react";
import { FlaskConical, Video, Hospital, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Services = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Slider images ---
  const sliderImages = [
    assets.slider1,
    assets.slider2,
    assets.slider3,
    assets.slider4,
  ].filter(Boolean); // Filter out any undefined values

  // --- Autoplay logic ---
  useEffect(() => {
    if (sliderImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3s per slide
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen pt-10">

      {/* --- Image Slider --- */}
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-2xl shadow-md mb-8">
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
        
        {/* --- Left Side Text Overlay (Always Visible) --- */}
        <div className="absolute left-0 top-0 bottom-0 w-full sm:w-1/2 md:w-2/5 flex items-center z-20 px-4 sm:px-6 md:px-8">
          <div className="rounded-r-2xl p-4 sm:p-6 md:p-8 w-full sm:w-auto">
            <h2 className="text-blue-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight drop-shadow-lg">
              Your Health,<br />
              Our Priority
            </h2>
            <p className="text-blue-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed drop-shadow-md">
              Comprehensive healthcare services at your fingertips. Book appointments, consult with expert doctors, and manage your health seamlessly.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#0077B6] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#005f8e] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>

      {/* --- Our Services Heading --- */}
      <div className="text-center mb-12 mt-14">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Services</h2>
      </div>

      {/* --- Smaller Services Boxes --- */}
      <section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 px-0 sm:px-0 md:px-0 mb-6">

  {/* Video Consultation */}
  <div className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                  transition-all duration-300 hover:shadow-lg cursor-pointer group">
    <img 
      src={assets.videoconsultation} 
      alt="Video Consultation" 
      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
    />
    <div className="relative z-10 flex flex-col items-center justify-center">
      <Video className="text-orange-400 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
      <h3 className="font-semibold text-sm sm:text-base md:text-lg">Video Consultation</h3>
    </div>
  </div>

  {/* Pods */}
  <div className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                  transition-all duration-300 hover:shadow-lg cursor-pointer group">
    <img 
      src={assets.hero_img} 
      alt="Pods" 
      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
    />
    <div className="relative z-10 flex flex-col items-center justify-center">
      <Hospital className="text-teal-300 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
      <h3 className="font-semibold text-sm sm:text-base md:text-lg">Pods</h3>
    </div>
  </div>

  {/* Medicine */}
  <div className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                  transition-all duration-300 hover:shadow-lg cursor-pointer group">
    <img 
      src={assets.contact_image} 
      alt="Medicine" 
      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
    />
    <div className="relative z-10 flex flex-col items-center justify-center">
      <Pill className="text-green-400 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
      <h3 className="font-semibold text-sm sm:text-base md:text-lg">Medicine</h3>
    </div>
  </div>

  {/* Lab Tests */}
  <div className="relative flex flex-col items-center justify-center bg-[#5C4433] text-white rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] shadow-md 
                  transition-all duration-300 hover:shadow-lg cursor-pointer group">
    <img 
      src={assets.group_profiles} 
      alt="Lab Tests" 
      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
    />
    <div className="relative z-10 flex flex-col items-center justify-center">
      <FlaskConical className="text-red-400 w-8 h-8 sm:w-10 sm:h-10 mb-2" />
      <h3 className="font-semibold text-sm sm:text-base md:text-lg">Lab Tests</h3>
    </div>
  </div>

</section>

    </div>
  );
};

export default Services;
