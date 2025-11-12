<<<<<<< HEAD
import React from 'react';
=======
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
>>>>>>> 7d9f544 (third commit)
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, CreditCard, RefreshCw, Video, Star } from 'lucide-react';

const Banner = () => {
  const navigate = useNavigate();
<<<<<<< HEAD

  const features = [
    { icon: <RefreshCw className="text-blue-600 w-6 h-6" />, title: "One Free Reschedule" },
    { icon: <CreditCard className="text-blue-600 w-6 h-6" />, title: "Pay at Pod Option" },
    { icon: <ShieldCheck className="text-blue-600 w-6 h-6" />, title: "Secure Reports & Records" },
    { icon: <Clock className="text-blue-600 w-6 h-6" />, title: "Real-Time Slot Availability" },
    { icon: <Video className="text-blue-600 w-6 h-6" />, title: "ZegoCloud Video Calls for Home Consults" },
=======
  const { fakeLoggedIn } = useContext(AppContext);

  const features = [
    { icon: <RefreshCw className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />, title: "One Free Reschedule" },
    { icon: <CreditCard className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />, title: "Pay at Pod Option" },
    { icon: <ShieldCheck className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />, title: "Secure Reports & Records" },
    { icon: <Clock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />, title: "Real-Time Slot Availability" },
    { icon: <Video className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />, title: "ZegoCloud Video Calls for Home Consults" },
>>>>>>> 7d9f544 (third commit)
  ];

  const reviews = [
    {
      name: "Aarav Mehta",
<<<<<<< HEAD
      feedback:
        "The booking process was so smooth! Got my appointment in just a few clicks and even rescheduled once easily. Highly recommend it!",
=======
      feedback: "The booking process was so smooth! Got my appointment in just a few clicks and even rescheduled once easily. Highly recommend it!",
>>>>>>> 7d9f544 (third commit)
      rating: 5,
    },
    {
      name: "Priya Sharma",
<<<<<<< HEAD
      feedback:
        "Had a great experience consulting a dermatologist online. The video quality was excellent and the doctor was really helpful.",
=======
      feedback: "Had a great experience consulting a dermatologist online. The video quality was excellent and the doctor was really helpful.",
>>>>>>> 7d9f544 (third commit)
      rating: 4,
    },
    {
      name: "Rahul Verma",
<<<<<<< HEAD
      feedback:
        "Real-time slot updates saved me so much time. The secure report access feature is very convenient. Love this platform!",
=======
      feedback: "Real-time slot updates saved me so much time. The secure report access feature is very convenient. Love this platform!",
>>>>>>> 7d9f544 (third commit)
      rating: 5,
    },
  ];

  return (
    <>
      {/* -------- Banner / Features Section -------- */}
<<<<<<< HEAD
      <div
        className="flex flex-col md:flex-row bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl 
                   px-6 sm:px-10 md:px-14 lg:px-12 py-10 my-20 md:mx-10 text-white relative overflow-hidden"
      >
        {/* ------- Left Section (Features) ------- */}
        <div className="flex-1 flex flex-col justify-center gap-8 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
=======
      <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl 
                      px-6 sm:px-10 md:px-14 lg:px-12 py-10 my-20 md:mx-10 text-white relative overflow-hidden">
        {/* ------- Left Section (Features) ------- */}
        <div className="flex-1 flex flex-col justify-center gap-6 z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
>>>>>>> 7d9f544 (third commit)
            App Highlights & Features
          </h2>

          {/* Feature Cards Grid */}
<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4">
>>>>>>> 7d9f544 (third commit)
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 
<<<<<<< HEAD
                           rounded-xl p-4 hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                  {feature.icon}
                </div>
                <p className="text-sm sm:text-base font-medium">{feature.title}</p>
=======
                           rounded-xl p-3 sm:p-4 hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10">
                  {feature.icon}
                </div>
                <p className="text-xs sm:text-sm font-medium">{feature.title}</p>
>>>>>>> 7d9f544 (third commit)
              </div>
            ))}
          </div>

          {/* CTA Button */}
<<<<<<< HEAD
          <button
            onClick={() => {
              navigate('/login');
              scrollTo(0, 0);
            }}
            className="bg-white text-blue-700 text-sm sm:text-base font-semibold px-8 py-3 
                       rounded-full mt-6 w-fit hover:scale-105 transition-all shadow-md"
          >
            Create Your Account to Start
          </button>
        </div>

        {/* ------- Right Section (Image) ------- */}
        <div className="hidden md:flex md:w-1/2 lg:w-[370px] relative justify-end items-end">
          <img
            className="w-full max-w-md absolute bottom-0 right-0 drop-shadow-xl"
=======
          {!fakeLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-700 text-xs sm:text-sm font-semibold px-6 sm:px-8 py-2 sm:py-3 
                         rounded-full mt-6 w-fit hover:scale-105 transition-all shadow-md"
            >
              Create Your Account to Start
            </button>
          )}
        </div>

        {/* ------- Right Section (Image) ------- */}
        <div className="flex w-full md:w-1/2 lg:w-[370px] justify-center items-center mt-6 md:mt-0 relative">
          <img
            className="w-full max-w-sm md:max-w-md drop-shadow-xl"
>>>>>>> 7d9f544 (third commit)
            src={assets.appointment_img}
            alt="App illustration"
          />
        </div>
      </div>

      {/* -------- Customer Reviews Section -------- */}
      <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20 text-center">
<<<<<<< HEAD
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-10">
          What Our Patients Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
=======
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-10">
          What Our Patients Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
>>>>>>> 7d9f544 (third commit)
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 
<<<<<<< HEAD
                         p-6 max-w-sm text-left border border-gray-100"
=======
                         p-5 sm:p-6 max-w-sm text-left border border-gray-100"
>>>>>>> 7d9f544 (third commit)
            >
              {/* Rating Stars */}
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
<<<<<<< HEAD
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i} className="text-gray-300 w-5 h-5" />
=======
                  <Star key={i} className="text-yellow-400 w-4 sm:w-5 h-4 sm:h-5 fill-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i} className="text-gray-300 w-4 sm:w-5 h-4 sm:h-5" />
>>>>>>> 7d9f544 (third commit)
                ))}
              </div>

              {/* Feedback */}
<<<<<<< HEAD
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
=======
              <p className="text-gray-700 text-xs sm:text-sm sm:leading-relaxed mb-4">
>>>>>>> 7d9f544 (third commit)
                “{review.feedback}”
              </p>

              {/* Name */}
<<<<<<< HEAD
              <h3 className="text-gray-900 font-semibold text-base sm:text-lg">
=======
              <h3 className="text-gray-900 font-semibold text-xs sm:text-sm">
>>>>>>> 7d9f544 (third commit)
                — {review.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Banner;
