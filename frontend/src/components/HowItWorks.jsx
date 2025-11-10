<<<<<<< HEAD
import React from "react";
import { UserPlus, Calendar, Video, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();
=======
import React, { useContext } from "react";
import { UserPlus, Calendar, Video, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const HowItWorks = () => {
  const navigate = useNavigate();
  const { fakeLoggedIn } = useContext(AppContext);
>>>>>>> 7d9f544 (third commit)

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your account in seconds with basic details.",
      step: "01",
    },
    {
      icon: Calendar,
      title: "Choose Service",
      description: "Select your consultation type or home service easily.",
      step: "02",
    },
    {
      icon: Video,
      title: "Consult",
      description: "Connect with verified doctors instantly from anywhere.",
      step: "03",
    },
    {
      icon: CheckCircle,
      title: "Get Care",
      description: "Receive prescriptions and follow-up support effortlessly.",
      step: "04",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-50 flex flex-col items-center text-center px-6 md:px-12">
      {/* --- Section Header --- */}
      <div className="max-w-3xl mb-14">
<<<<<<< HEAD
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-lg">
=======
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
>>>>>>> 7d9f544 (third commit)
          Get healthcare in 4 simple steps — simple, fast, and affordable.
        </p>
      </div>

      {/* --- Steps Grid --- */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl justify-items-center">
        {/* Connection Line (Desktop Only) */}
        <div
          className="hidden lg:block absolute top-16 left-0 right-0 h-1 
                     bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 rounded-full"
          style={{ width: "calc(100% - 8rem)", left: "4rem" }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
<<<<<<< HEAD
              className="relative bg-white rounded-2xl shadow-md p-8 text-center 
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200 w-full max-w-[300px]"
            >
              {/* Icon + Step Number */}
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mx-auto shadow-lg">
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold shadow-md">
=======
              className="relative bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center 
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200 w-full max-w-[280px] sm:max-w-[300px]"
            >
              {/* Icon + Step Number */}
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mx-auto shadow-lg">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md">
>>>>>>> 7d9f544 (third commit)
                  {step.step}
                </div>
              </div>

              {/* Text */}
<<<<<<< HEAD
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
=======
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
>>>>>>> 7d9f544 (third commit)
            </div>
          );
        })}
      </div>

      {/* --- CTA Button --- */}
<<<<<<< HEAD
      <button
        onClick={() => navigate("/login")}
        className="mt-16 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold 
                   text-lg shadow-lg hover:shadow-xl hover:bg-blue-500 transition-transform duration-300 hover:-translate-y-1"
      >
        Create Your Account to Start
      </button>
=======
      {!fakeLoggedIn && (
        <button
          onClick={() => navigate("/login")}
          className="mt-16 bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold 
                     text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-blue-500 transition-transform duration-300 hover:-translate-y-1"
        >
          Create Your Account to Start
        </button>
      )}
>>>>>>> 7d9f544 (third commit)
    </section>
  );
};

export default HowItWorks;
