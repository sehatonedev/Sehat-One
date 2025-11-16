import React, { useState } from "react";
import { assets } from "../assets/assets";
import OurPods from "../components/OurPods";
import { Truck, Shield, Clock, CheckCircle, Star, Package, MapPin, Phone } from "lucide-react";

const Pods = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Fast Delivery",
      description: "Get your medicines delivered within 1-6 hours at your doorstep."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Certified Pharmacies",
      description: "All orders fulfilled by registered and licensed pharmacy partners."
    },
    {
      icon: <Package className="w-8 h-8 text-purple-600" />,
      title: "Verified Orders",
      description: "Each prescription validated by licensed pharmacists for accuracy."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "24/7 Ordering",
      description: "Place orders anytime, delivery based on location and pharmacy hours."
    }
  ];

  const benefits = [
    "No need to visit pharmacy physically",
    "Safe and contactless delivery",
    "Prescription validation by experts",
    "Real-time order tracking",
    "Multiple payment options available",
    "Scheduled deliveries for regular medicines"
  ];

  const stats = [
    { number: "100K+", label: "Deliveries Done" },
    { number: "500+", label: "Partner Pharmacies" },
    { number: "99%", label: "On-Time Delivery" },
    { number: "4.8★", label: "Customer Rating" }
  ];

  const faqs = [
    {
      q: "How does the Prescription on Doorstep Service work?",
      a: "Simply upload your prescription, select your medicines, place your order, and our pharmacy team will deliver your medicines right to your home. You can track your order in real-time through your dashboard.",
    },
    {
      q: "Is the service available 24/7?",
      a: "Orders can be placed anytime through our platform, but delivery timings depend on your location and pharmacy working hours. Most areas have same-day delivery available.",
    },
    {
      q: "Can I track my order?",
      a: "Yes, you can track your delivery status in real-time directly through your profile dashboard. You'll receive SMS and email updates at every step of the delivery process.",
    },
    {
      q: "Do I need a prescription for all medicines?",
      a: "Prescription is mandatory for regulated medicines (Schedule H/H1 drugs) but not required for general wellness products, vitamins, and over-the-counter medications.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept all major payment methods including credit/debit cards, UPI, net banking, and cash on delivery (COD) for eligible orders.",
    },
    {
      q: "Is there a minimum order value?",
      a: "No, there's no minimum order value. However, delivery charges may apply for orders below a certain amount depending on your location.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-8 pb-16">

      {/* HERO SECTION */}
      <div className="relative w-full mb-0">
        <img
          src={assets.hero_img}
          alt="Prescription Delivery"
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-b-2xl shadow-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl flex items-end">
          <div className="w-full max-w-6xl mx-auto px-6 pb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              🚚 Prescription on Doorstep Service
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-2xl">
              Fast, reliable medicine delivery straight to your home. Get your essential medications without delays or hassles.
            </p>
            <button
              onClick={() => window.location.href = "/login"}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2"
            >
              <Package className="w-5 h-5" />
              Order Medicines Now
            </button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <section className="w-full py-12 mt-8 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-teal-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOSPITAL CARDS */}
      <OurPods />

      {/* MAIN CONTENT SECTION */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About Our PODS Service
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Our Prescription on Doorstep Service ensures that you receive your
              essential medications without delays or hassles.  
              Simply upload your prescription, confirm your order, and relax —
              our verified pharmacy partners will handle the rest.
              <br /><br />
              Ideal for chronic patients, elderly individuals, busy professionals,
              or anyone who wants timely access to medicines without the wait.
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our PODS?</h2>
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
              { step: "1", title: "Upload Prescription", desc: "Upload your prescription or search for medicines" },
              { step: "2", title: "Select Medicines", desc: "Add required medicines to your cart" },
              { step: "3", title: "Place Order", desc: "Confirm delivery address and payment" },
              { step: "4", title: "Get Delivered", desc: "Receive medicines at your doorstep safely" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Kumar", rating: 5, text: "Excellent service! Got my medicines delivered on time. Very convenient for my elderly parents." },
              { name: "Meera Patel", rating: 5, text: "Love the prescription validation feature. Makes me feel safe about the medicines I'm getting." },
              { name: "Amit Singh", rating: 5, text: "Best medicine delivery service. Fast, reliable, and the tracking feature is amazing!" }
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
                <span className="text-2xl font-bold text-teal-600 flex-shrink-0">
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
      <section className="w-full py-16 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Your Medicines Delivered?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Join thousands of satisfied customers who trust us for their medicine needs.
          </p>
          <button
            onClick={() => window.location.href = "/login"}
            className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <MapPin className="w-5 h-5" />
            Order Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default Pods;
