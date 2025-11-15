import React, { useState } from "react";
import { assets } from "../assets/assets";

const Medicine = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I order medicines?",
      a: "Just upload your prescription or search for medicines, add them to cart, and place the order.",
    },
    {
      q: "Do you deliver prescription medicines?",
      a: "Yes, prescription medicines are delivered after pharmacist verification.",
    },
    {
      q: "How fast is the delivery?",
      a: "Delivery usually takes between 1–6 hours depending on your location.",
    },
    {
      q: "Is there a minimum order value?",
      a: "No, we do not have any minimum order requirement.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/*  HEADER IMAGE */}
      <div className="w-full mb-0">
        <img
          src={assets.contact_image}  // <-- Ensure this matches your assets key
          alt="Medicine Delivery"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
      </div>

      {/*  MAIN SECTIONS */}
      <section className="w-full py-5 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 px-6">
          
          {/*  MEDICINE OVERVIEW */}
          <div className="bg-blue-200 p-8 rounded-xl shadow">

            <p className="text-gray-700 text-lg">
              Get genuine medicines delivered quickly at your doorstep.  
              Upload your prescription, choose your products, and receive your order safely — all from home.
            </p>
          </div>

          {/*  WHY US */}
          <div className="bg-blue-200 p-8 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>

            <p className="text-gray-700 text-lg">
              ✅ Verified Pharmacies  
              <br />
              ✅ Fast Delivery  
              <br />
              ✅ Genuine Medicines Only  
              <br />
              ✅ Easy Ordering & Tracking  
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

export default Medicine;
