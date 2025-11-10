import React, { useState } from "react";
import { assets } from "../assets/assets";

const LabTests = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I book a lab test?",
      a: "Choose your test, pick a timeslot, and confirm your booking. Our technician will visit you at home.",
    },
    {
      q: "Do you offer home sample collection?",
      a: "Yes, certified phlebotomists collect samples from your home safely and hygienically.",
    },
    {
      q: "When will I get my reports?",
      a: "Most reports are delivered within 6–24 hours depending on the test.",
    },
    {
      q: "Are the labs certified?",
      a: "Yes, all partner labs are NABL/ISO certified to ensure high accuracy.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HEADER IMAGE */}
      <div className="w-full mb-0">
        <img
          src={assets.about_image}  // <-- Make sure key matches your assets.js
          alt="Lab Tests"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
      </div>

      {/* MAIN SECTIONS */}
      <section className="w-full py-5 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 px-6">

          {/* LAB TESTS OVERVIEW */}
          <div className="bg-blue-200 p-8 rounded-xl shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🧪 Lab Tests Made Easy
            </h1>

            <p className="text-gray-700 text-lg">
              Book lab tests from home with hassle-free sample collection.  
              Certified technicians ensure safe and accurate testing every time.
            </p>
            <button
    onClick={() => window.location.href = "/login"}
    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
  >
    Book a Lab Test
  </button>

          </div>

          {/* ✅ WHY US SECTION */}
          <div className="bg-blue-200 p-8 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Our Lab Services?
            </h2>

            <p className="text-gray-700 text-lg">
              ✅ Home Sample Collection  
              <br />
              ✅ NABL/ISO Certified Labs  
              <br />
              ✅ Accurate & Fast Reports  
              <br />
              ✅ Affordable Test Packages  
            </p>
          </div>

        </div>
      </section>

      {/* ✅ FAQ SECTION */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-gray-800 text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border rounded-xl p-4 bg-white shadow-sm">

              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h4 className="font-semibold text-lg text-gray-800">
                  {item.q}
                </h4>
                <span className="text-2xl font-bold text-gray-600">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <p className="mt-3 text-gray-600">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LabTests;
