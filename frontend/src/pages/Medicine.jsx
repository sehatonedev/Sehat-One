import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Pill, Shield, Truck, CheckCircle, Star, Search, ShoppingCart, CreditCard, Award, Clock } from "lucide-react";

const Medicine = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Genuine Medicines",
      description: "100% authentic medicines from licensed pharmacies only."
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Fast Delivery",
      description: "Quick delivery within 1-6 hours at your doorstep."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Verified Pharmacies",
      description: "All medicines sourced from certified and registered pharmacies."
    },
    {
      icon: <Search className="w-8 h-8 text-orange-600" />,
      title: "Easy Search",
      description: "Search by name, brand, or prescription - find medicines instantly."
    }
  ];

  const benefits = [
    "Wide range of medicines available",
    "Prescription and OTC medicines",
    "Competitive pricing with discounts",
    "Secure payment options",
    "Real-time order tracking",
    "Expert pharmacist consultation available"
  ];

  const categories = [
    { name: "Prescription Medicines", count: "10,000+", icon: "💊" },
    { name: "OTC Products", count: "5,000+", icon: "🩹" },
    { name: "Wellness Products", count: "3,000+", icon: "🌿" },
    { name: "Health Supplements", count: "2,000+", icon: "💪" }
  ];

  const stats = [
    { number: "20K+", label: "Medicines Available" },
    { number: "200+", label: "Partner Pharmacies" },
    { number: "50K+", label: "Happy Customers" },
    { number: "99%", label: "Genuine Products" }
  ];

  const faqs = [
    {
      q: "How do I order medicines?",
      a: "Simply search for medicines by name or brand, add them to your cart, upload prescription if required, and place the order. You can also upload your prescription and our team will help you find the right medicines.",
    },
    {
      q: "Do you deliver prescription medicines?",
      a: "Yes, we deliver prescription medicines after pharmacist verification. You need to upload a valid prescription for prescription-only medicines. Our licensed pharmacists verify each prescription before processing the order.",
    },
    {
      q: "How fast is the delivery?",
      a: "Delivery usually takes between 1–6 hours depending on your location and availability. Express delivery options are available in select areas. You can track your order in real-time through your dashboard.",
    },
    {
      q: "Is there a minimum order value?",
      a: "No, we do not have any minimum order requirement. However, delivery charges may apply for orders below a certain amount depending on your location.",
    },
    {
      q: "Are the medicines genuine?",
      a: "Absolutely! All medicines are sourced directly from licensed pharmacies and verified suppliers. We guarantee 100% genuine products and have strict quality control measures in place.",
    },
    {
      q: "Can I return medicines if I don't need them?",
      a: "Due to health and safety regulations, medicines cannot be returned once delivered. However, if you receive wrong or damaged products, we will replace them immediately. Please contact our support team for assistance.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-8 pb-16">

      {/* HERO SECTION */}
      <div className="relative w-full mb-0">
        <img
          src={assets.contact_image}
          alt="Medicine Delivery"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              💊 Genuine Medicines Delivered to Your Doorstep
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-2xl">
              Get authentic medicines quickly and safely. Upload your prescription, choose your products, and receive your order — all from home.
            </p>
            <button
              onClick={() => window.location.href = "/login"}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Shop Medicines Now
            </button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="w-full py-12 mt-8 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition cursor-pointer">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{category.name}</h3>
                <p className="text-green-600 font-medium">{category.count} Products</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Medicine Service?</h2>
            <p className="text-gray-700 text-lg mb-6">
              Get genuine medicines delivered quickly at your doorstep.  
              Upload your prescription, choose your products, and receive your order safely — all from home.
              We ensure quality, authenticity, and convenience in every order.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Search Medicines", desc: "Search by name, brand, or upload prescription" },
              { step: "2", title: "Add to Cart", desc: "Select medicines and add them to your cart" },
              { step: "3", title: "Checkout", desc: "Upload prescription if needed and make payment" },
              { step: "4", title: "Get Delivered", desc: "Receive genuine medicines at your doorstep" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Anita Desai", rating: 5, text: "Best online medicine store! Genuine products and fast delivery. Highly recommended!" },
              { name: "Vikram Reddy", rating: 5, text: "Great service! Got my prescription medicines delivered on time. Very reliable." },
              { name: "Sunita Mehta", rating: 5, text: "Love the easy search feature and the wide range of medicines available. Excellent service!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 py-16 max-w-4xl mx-auto bg-white">
        <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-800 text-center">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50 shadow-sm hover:shadow-md transition">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h4 className="font-semibold text-lg text-gray-800 pr-4">{item.q}</h4>
                <span className="text-2xl font-bold text-green-600 flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-16 bg-gradient-to-r from-green-600 to-green-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Order Your Medicines?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join thousands of satisfied customers who trust us for genuine medicines and reliable delivery.
          </p>
          <button
            onClick={() => window.location.href = "/login"}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Pill className="w-5 h-5" />
            Start Shopping Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default Medicine;
