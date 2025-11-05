import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, CreditCard, RefreshCw, Video, Star } from 'lucide-react';

const Banner = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <RefreshCw className="text-blue-600 w-6 h-6" />, title: "One Free Reschedule" },
    { icon: <CreditCard className="text-blue-600 w-6 h-6" />, title: "Pay at Pod Option" },
    { icon: <ShieldCheck className="text-blue-600 w-6 h-6" />, title: "Secure Reports & Records" },
    { icon: <Clock className="text-blue-600 w-6 h-6" />, title: "Real-Time Slot Availability" },
    { icon: <Video className="text-blue-600 w-6 h-6" />, title: "ZegoCloud Video Calls for Home Consults" },
  ];

  const reviews = [
    {
      name: "Aarav Mehta",
      feedback:
        "The booking process was so smooth! Got my appointment in just a few clicks and even rescheduled once easily. Highly recommend it!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      feedback:
        "Had a great experience consulting a dermatologist online. The video quality was excellent and the doctor was really helpful.",
      rating: 4,
    },
    {
      name: "Rahul Verma",
      feedback:
        "Real-time slot updates saved me so much time. The secure report access feature is very convenient. Love this platform!",
      rating: 5,
    },
  ];

  return (
    <>
      {/* -------- Banner / Features Section -------- */}
      <div
        className="flex flex-col md:flex-row bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl 
                   px-6 sm:px-10 md:px-14 lg:px-12 py-10 my-20 md:mx-10 text-white relative overflow-hidden"
      >
        {/* ------- Left Section (Features) ------- */}
        <div className="flex-1 flex flex-col justify-center gap-8 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            App Highlights & Features
          </h2>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 
                           rounded-xl p-4 hover:bg-white/30 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-center bg-white rounded-full w-10 h-10">
                  {feature.icon}
                </div>
                <p className="text-sm sm:text-base font-medium">{feature.title}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
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
            src={assets.appointment_img}
            alt="App illustration"
          />
        </div>
      </div>

      {/* -------- Customer Reviews Section -------- */}
      <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-10">
          What Our Patients Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 
                         p-6 max-w-sm text-left border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i} className="text-gray-300 w-5 h-5" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                “{review.feedback}”
              </p>

              {/* Name */}
              <h3 className="text-gray-900 font-semibold text-base sm:text-lg">
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
