import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Home, Compass, CalendarDays, User, Search, Bell, X, Menu } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fakeLoggedIn } = useContext(AppContext);
  const [activePath, setActivePath] = useState("/");
  const [selectedLocation, setSelectedLocation] = useState("New Delhi");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => setActivePath(location.pathname), [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, message: "Your appointment with Dr. Mehta is confirmed." },
    { id: 2, message: "Your test reports are now available." },
    { id: 3, message: "Reminder: Follow-up visit tomorrow at 4 PM." }
  ];

  const navItems = fakeLoggedIn
    ? [
        { label: "Home", path: "/", icon: <Home size={20} /> },
        { label: "Doctors", path: "/doctors", icon: <Compass size={20} /> },
        { label: "Bookings", path: "/bookings", icon: <CalendarDays size={20} /> },
        { label: "Records", path: "/records", icon: <CalendarDays size={20} /> },
        { label: "Profile", path: "/my-profile", icon: <User size={20} /> },
      ]
    : [
        { label: "Home", path: "/", icon: <Home size={20} /> },
        { label: "Doctors", path: "/doctors", icon: <Compass size={20} /> },
        { label: "Appointment", path: "/my-appointments", icon: <CalendarDays size={20} /> },
        { label: "Profile", path: "/my-profile", icon: <User size={20} /> },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0077B6] px-4 py-3 flex items-center justify-between text-white z-50 h-16">
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <img src={assets.Logo1} alt="Logo" className="h-9 w-9" />
        <span className="text-lg font-semibold">Sehat One</span>
      </div>

      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-2">
        {navItems.map((item, i) => {
          const isActive = activePath === item.path;
          return (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full transition text-sm md:text-base ${
                isActive ? "bg-white text-[#0077B6]" : "hover:bg-white/20 text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="hidden md:block bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-sm text-white"
        >
          <option className="bg-[#0077B6]">New Delhi</option>
          <option className="bg-[#0077B6]">Bhubaneswar</option>
          <option className="bg-[#0077B6]">Jajpur</option>
          <option className="bg-[#0077B6]">Mumbai</option>
          <option className="bg-[#0077B6]">Bangalore</option>
          <option className="bg-[#0077B6]">Hyderabad</option>
          <option className="bg-[#0077B6]">Chennai</option>
        </select>

        <div className="relative">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1">
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>
          {showSearch && (
            <div className="absolute right-0 mt-2 bg-white text-black p-3 shadow w-64 rounded-lg">
              <input className="border w-full p-2 rounded" placeholder="Search doctors..." />
            </div>
          )}
        </div>

        <div className="relative" ref={notificationRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-1">
            <Bell size={20} />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow rounded-lg w-72">
              <div className="p-3 font-semibold text-[#0077B6] border-b">Notifications</div>
              {notifications.map((n) => (
                <p key={n.id} className="p-3 border-b text-sm">
                  {n.message}
                </p>
              ))}
            </div>
          )}
        </div>

        {!fakeLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-white text-[#0077B6] px-4 py-2 rounded-full shadow text-sm"
          >
            Login / Signup
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("fakeLoggedIn");
              window.location.reload();
            }}
            className="hidden md:block bg-white text-[#0077B6] px-4 py-2 rounded-full shadow text-sm"
          >
            Logout
          </button>
        )}

        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-[#0077B6] flex flex-col gap-2 p-4 md:hidden text-white z-40">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                setMobileMenu(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
                activePath === item.path ? "bg-white text-[#0077B6]" : "hover:bg-white/20"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-sm text-white mt-2"
          >
            <option className="bg-[#0077B6]">New Delhi</option>
            <option className="bg-[#0077B6]">Bhubaneswar</option>
            <option className="bg-[#0077B6]">Jajpur</option>
            <option className="bg-[#0077B6]">Mumbai</option>
            <option className="bg-[#0077B6]">Bangalore</option>
            <option className="bg-[#0077B6]">Hyderabad</option>
            <option className="bg-[#0077B6]">Chennai</option>
          </select>

          {!fakeLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#0077B6] px-4 py-2 rounded-full shadow mt-2"
            >
              Login / Signup
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("fakeLoggedIn");
                window.location.reload();
              }}
              className="bg-white text-[#0077B6] px-4 py-2 rounded-full shadow mt-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

