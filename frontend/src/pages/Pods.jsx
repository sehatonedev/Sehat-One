import React, { useState } from "react";
import { assets } from "../assets/assets";
import OurPods from "../components/OurPods"; // Import your OurPods component

const Pods = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the Prescription on Doorstep Service work?",
      a: "Upload your prescription, place your order, and our pharmacy team will deliver your medicines right to your home.",
    },
    {
      q: "Is the service available 24/7?",
      a: "Orders can be placed anytime, but delivery timings depend on your location and pharmacy working hours.",
    },
    {
      q: "Can I track my order?",
      a: "Yes, you can track your delivery status in real-time directly through your profile dashboard.",
    },
    {
      q: "Do I need a prescription for all medicines?",
      a: "Prescription is mandatory for regulated medicines but not required for general wellness products.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ✅ HEADER IMAGE */}
      <div className="w-full mb-6">
        <img
          src={assets.hero_img}
          alt="Prescription Delivery"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
      </div>

      {/* ✅ HOSPITAL CARDS */}
      <OurPods /> {/* Reuse the OurPods component */}

      {/* ✅ MAIN SECTIONS */}
      <section className="w-full py-5 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 px-6">
          
          {/* ✅ PODS / ABOUT SECTION */}
          <div className="bg-blue-200 p-8 rounded-xl shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🚚 Prescription on Doorstep Service
            </h1>

            <p className="text-gray-600 text-lg">
              Fast, reliable medicine delivery straight to your home. <br /><br />
              Our Prescription on Doorstep Service ensures that you receive your
              essential medications without delays or hassles.  
              Simply upload your prescription, confirm your order, and relax —
              our verified pharmacy partners will handle the rest.
              <br /><br />
              Ideal for chronic patients, elderly individuals, busy professionals,
              or anyone who wants timely access to medicines without the wait.
            </p>
            <button
              onClick={() => window.location.href = "/login"}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
            >
              Book a POD 
            </button>
          </div>

          {/* WHY US SECTION */}
          <div className="bg-blue-200 p-8 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our PODS?</h2>

            <p className="text-gray-600 text-lg">
              ✅ <strong>Fast & Secure Delivery</strong> — Medicines are delivered safely and quickly, right to your doorstep.  
              <br />
              ✅ <strong>Certified Pharmacies Only</strong> — All orders are fulfilled by registered and certified pharmacy partners.  
              <br />
              ✅ <strong>Accurate & Verified Orders</strong> — We ensure each prescription is validated by licensed pharmacists.
              <br />
              ✅ <strong>Convenient & Time-Saving</strong> — Avoid pharmacy queues and get your medicines without stepping outside.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
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
                <h4 className="font-semibold text-lg text-gray-800">{item.q}</h4>
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

export default Pods;
