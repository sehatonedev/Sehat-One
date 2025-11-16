import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FlaskConical, Home, Award, Clock, CheckCircle, Star, FileText, Shield, Users, Calendar } from "lucide-react";

const LabTests = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    {
      icon: <Home className="w-8 h-8 text-red-600" />,
      title: "Home Sample Collection",
      description: "Certified phlebotomists collect samples from your home safely and hygienically."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "NABL/ISO Certified",
      description: "All partner labs are certified to ensure high accuracy and reliability."
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Fast Reports",
      description: "Most reports delivered within 6-24 hours, depending on the test type."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Safe & Hygienic",
      description: "Strict safety protocols followed for sample collection and processing."
    }
  ];

  const benefits = [
    "No need to visit lab physically",
    "Certified technicians at your doorstep",
    "Accurate and reliable test results",
    "Digital reports delivered online",
    "Affordable test packages available",
    "Expert consultation on reports"
  ];

  const testCategories = [
    { name: "Blood Tests", count: "100+", icon: "🩸", desc: "Complete blood count, lipid profile, and more" },
    { name: "Health Packages", count: "50+", icon: "📋", desc: "Comprehensive health checkup packages" },
    { name: "Diabetes Tests", count: "30+", icon: "🍯", desc: "HbA1c, glucose, and related tests" },
    { name: "Thyroid Tests", count: "25+", icon: "🦋", desc: "TSH, T3, T4, and thyroid function tests" }
  ];

  const stats = [
    { number: "500+", label: "Tests Available" },
    { number: "100+", label: "Certified Labs" },
    { number: "50K+", label: "Tests Done" },
    { number: "99%", label: "Accuracy Rate" }
  ];

  const faqs = [
    {
      q: "How do I book a lab test?",
      a: "Simply choose your test from our catalog, select a convenient time slot, and confirm your booking. Our certified technician will visit you at home for sample collection. You'll receive a confirmation SMS and email with all details.",
    },
    {
      q: "Do you offer home sample collection?",
      a: "Yes, we offer home sample collection service. Certified phlebotomists collect samples from your home safely and hygienically. All technicians follow strict safety protocols and use sterile equipment.",
    },
    {
      q: "When will I get my reports?",
      a: "Most reports are delivered within 6–24 hours depending on the test type. Routine tests like CBC, lipid profile are usually ready within 6-12 hours, while specialized tests may take 24-48 hours. You'll receive your digital reports via email and can also access them through your dashboard.",
    },
    {
      q: "Are the labs certified?",
      a: "Yes, all partner labs are NABL (National Accreditation Board for Testing and Calibration Laboratories) and/or ISO certified to ensure high accuracy and reliability. We work only with certified laboratories that maintain the highest standards.",
    },
    {
      q: "What if I need to fast before the test?",
      a: "For tests requiring fasting (like lipid profile, blood glucose), you'll receive clear instructions when you book. Our technicians will confirm fasting requirements before sample collection. Most fasting tests require 8-12 hours of fasting.",
    },
    {
      q: "Can I get a doctor's consultation on my reports?",
      a: "Yes, we offer expert consultation services where qualified doctors can review your reports and provide guidance. You can book a consultation appointment after receiving your test results.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-8 pb-16">

      {/* HERO SECTION */}
      <div className="relative w-full mb-0">
        <img
          src={assets.about_image}
          alt="Lab Tests"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              🧪 Lab Tests Made Easy - At Your Home
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-2xl">
              Book lab tests from home with hassle-free sample collection. Certified technicians ensure safe and accurate testing every time.
            </p>
            <button
              onClick={() => window.location.href = "/login"}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <FlaskConical className="w-5 h-5" />
              Book a Lab Test
            </button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="w-full py-12 mt-8 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEST CATEGORIES SECTION */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Popular Test Categories
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {testCategories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="text-5xl mb-4 text-center">{category.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2 text-center">{category.name}</h3>
                <p className="text-red-600 font-medium text-center mb-2">{category.count} Tests</p>
                <p className="text-gray-600 text-sm text-center">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="w-full py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Our Lab Services?
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Book lab tests from home with hassle-free sample collection.  
              Certified technicians ensure safe and accurate testing every time.
              Get your reports quickly and consult with experts if needed.
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
              { step: "1", title: "Choose Test", desc: "Browse and select from 500+ available tests" },
              { step: "2", title: "Book Slot", desc: "Pick a convenient time for sample collection" },
              { step: "3", title: "Home Collection", desc: "Certified technician collects sample at home" },
              { step: "4", title: "Get Reports", desc: "Receive digital reports within 6-24 hours" }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
              { name: "Deepak Verma", rating: 5, text: "Excellent service! The technician was professional and the reports were accurate. Very convenient!" },
              { name: "Kavita Nair", rating: 5, text: "Home sample collection saved me so much time. Reports came quickly and were easy to understand." },
              { name: "Rahul Joshi", rating: 5, text: "Best lab test service I've used. Professional staff and reliable results. Highly recommend!" }
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
                <h4 className="font-semibold text-lg text-gray-800 pr-4">
                  {item.q}
                </h4>
                <span className="text-2xl font-bold text-red-600 flex-shrink-0">
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
      <section className="w-full py-16 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Book Your Lab Test?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Join thousands of satisfied customers who trust us for accurate and reliable lab testing.
          </p>
          <button
            onClick={() => window.location.href = "/login"}
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Calendar className="w-5 h-5" />
            Book Your Test Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default LabTests;
