import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { Video, Shield, Clock, DollarSign, Users, CheckCircle, Star, Phone } from "lucide-react";

const Vc = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleBookConsultation = () => {
    if (token) {
      // User is logged in, redirect to doctors page to select a doctor
      navigate('/doctors');
    } else {
      // User is not logged in, redirect to login page
      navigate('/login');
    }
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Instant Access",
      description: "Connect with doctors within minutes, no waiting rooms or travel time."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Secure & Private",
      description: "End-to-end encrypted calls ensuring your health data stays confidential."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Expert Doctors",
      description: "Verified specialists across multiple disciplines ready to help you."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-orange-600" />,
      title: "Affordable Care",
      description: "Save on travel costs and get quality healthcare at competitive prices."
    }
  ];

  const benefits = [
    "No travel or parking hassles",
    "Consult from home, office, or anywhere",
    "Available 24/7 for urgent consultations",
    "Digital prescriptions delivered instantly",
    "Follow-up consultations made easy",
    "Access to specialist doctors nationwide"
  ];

  const stats = [
    { number: "50K+", label: "Happy Patients" },
    { number: "500+", label: "Expert Doctors" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Available Support" }
  ];

  const faqs = [
    {
      q: "How do I book a video consultation?",
      a: "Simply choose your doctor, select your time slot, and confirm your booking. You'll receive a confirmation email with the meeting link.",
    },
    {
      q: "Is my data and call private?",
      a: "Absolutely. We use end-to-end encryption for all video calls, and our platform is compliant with all necessary healthcare data privacy standards. Your consultation is strictly between you and your doctor.",
    },
    {
      q: "Can I cancel or reschedule?",
      a: "Yes, you can modify your appointment anytime from the My Appointments page. Cancellations made 24 hours in advance are fully refundable.",
    },
    {
      q: "Can I get a prescription?",
      a: "Yes, if medically appropriate, the doctor will issue a valid, digital prescription directly after your consultation. This can then be used with our integrated medicine ordering service.",
    },
    {
      q: "What devices can I use for video consultation?",
      a: "You can use any device with a camera and internet connection - smartphones, tablets, laptops, or desktop computers. Our platform works on all major browsers.",
    },
    {
      q: "Are video consultations covered by insurance?",
      a: "Many insurance plans now cover telemedicine consultations. Please check with your insurance provider for specific coverage details.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-8 pb-16">

      {/* HERO SECTION */}
      <div className="relative w-full mb-0">
        <img
          src={assets.videoconsultation}
          alt="Video Consultation"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              🩺 Video Consultation: Your Doctor, Anywhere
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-2xl">
              Seamless healthcare from the comfort of your home. Connect with expert doctors instantly via secure video calls.
            </p>
            <button
              onClick={handleBookConsultation}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <Video className="w-5 h-5" />
              Book a Video Consultation
            </button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="w-full py-12 mt-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Video Consultation?</h2>
            <p className="text-gray-700 text-lg mb-6"> 
              Get the expert medical advice you need without the travel or wait. 
              Our Easy Video Consultation service connects you instantly with verified doctors 
              via a secure video call, making quality healthcare accessible, convenient, and safe. 
              Perfect for follow-ups, general advice, minor ailments, and prescription refills.
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
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg">
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
      <section className="w-full py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Choose Doctor", desc: "Browse and select from our verified doctors", action: handleBookConsultation, clickable: true },
              { step: "2", title: "Book Slot", desc: "Pick a convenient time slot for your consultation", action: null, clickable: false },
              { step: "3", title: "Video Call", desc: "Join the secure video call at your scheduled time", action: null, clickable: false },
              { step: "4", title: "Get Prescription", desc: "Receive digital prescription and follow-up care", action: null, clickable: false }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`bg-white p-6 rounded-xl shadow-md text-center transition-all ${
                  item.clickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''
                }`}
                onClick={item.clickable ? item.action : undefined}
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Patients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Johnson", rating: 5, text: "Amazing experience! Got consultation within minutes and the doctor was very helpful." },
              { name: "Michael Chen", rating: 5, text: "Saved me so much time. The video quality was excellent and prescription was instant." },
              { name: "Priya Sharma", rating: 5, text: "Best healthcare service I've used. Highly recommend to everyone!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md">
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
      <section className="px-6 py-16 max-w-4xl mx-auto bg-gray-50">
        <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-800 text-center">
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h4 className="font-semibold text-lg text-gray-800 pr-4">{item.q}</h4>
                <span className="text-2xl font-bold text-blue-600 flex-shrink-0">
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
      <section className="w-full py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of satisfied patients who trust us for their healthcare needs.
          </p>
          <button
            onClick={handleBookConsultation}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Phone className="w-5 h-5" />
            Book Your Consultation Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default Vc;

