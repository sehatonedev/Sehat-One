import React, { useState } from "react";
import { assets } from "../assets/assets";

const Vc = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I book a video consultation?",
      a: "Simply choose your doctor, select your time slot, and confirm your booking.",
    },
    {
      q: "Is my data and call private?",
      a: "Absolutely. We use end-to-end encryption for all video calls, and our platform is compliant with all necessary healthcare data privacy standards. Your consultation is strictly between you and your doctor.",
    },
    {
      q: "Can I cancel or reschedule?",
      a: "Yes, you can modify your appointment anytime from the My Appointments page.",
    },
    {
      q: "Can I get a prescription?",
      a: "Yes, if medically appropriate, the doctor will issue a valid, digital prescription directly after your consultation. This can then be used with our integrated medicine ordering service.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/*HERO IMAGE */}
      <div className="w-full mb-0">
        <img
          src={assets.videoconsultation}
          alt="Video Consultation"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
      </div>
      {/*Consultation*/}
      <section className="w-full py-5 bg-white">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 px-6">
    
    <div className="bg-blue-200 p-8 rounded-xl shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🩺 Easy Video Consultation: Your Doctor, Anywhere.</h1> {/* ✅ text-white for contrast */}
            <p className="text-gray-600 text-lg"> 
              Seamless Healthcare from the Comfort of Your Home <br /> <br />
              Get the expert medical advice you need without the travel or wait. 
              Our Easy Video Consultation service connects you instantly with verified doctors 
              via a secure video call, making quality healthcare accessible, convenient, and safe. 
              Perfect for follow-ups, general advice, minor ailments, and prescription refills.
            </p>

            <button
    onClick={() => window.location.href = "/login"}
    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
  >
    Book a Video Chat
  </button>
  
          </div>
    
    {/*WHY US */}
    <div className="bg-blue-200 p-8 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
      <p className="text-gray-600 text-lg">
        ⚡ Easy & Instant Access: Skip the commute and crowded waiting rooms. Consult a doctor within minutes, 
        right from your home, office, or anywhere you have internet. 
        <br />
        🧑‍⚕️ Trusted and Certified Doctors: Connect only with vetted, specialist doctors across various disciplines. 
        Our doctors are committed to providing personalized and high-quality virtual care.
        <br />
        🔒 Complete Privacy & Security: Your consultation is 100% private and confidential. Our platform is built with advanced security 
        measures to ensure your health data remains protected, just like an in-person visit.
        <br />
        💰 Time and Cost-Saving: Save money on travel, parking, 
        and lost time from work. Efficient care means you get better faster and for less.
      </p>
    </div>

  </div>
</section>


      {/*FAQ SECTION */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-gray-800 text-center">Frequently Asked Questions</h3>
        
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

export default Vc;

