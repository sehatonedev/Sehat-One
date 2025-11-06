import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Home, Compass, CalendarDays, User, Search, Bell, X, LogOut } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken, userData } = useContext(AppContext);
  const [activePath, setActivePath] = useState("/");
  const [selectedLocation, setSelectedLocation] = useState("New Delhi");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Demo notifications (replace with API data later)
  const notifications = [
    { id: 1, message: "Your appointment with Dr. Mehta is confirmed." },
    { id: 2, message: "Your test reports are now available." },
    { id: 3, message: "Reminder: Follow-up visit tomorrow at 4 PM." },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    { label: "Explore", path: "/doctors", icon: <Compass size={20} /> },
    { label: "Appointment", path: "/my-appointments", icon: <CalendarDays size={20} /> },
    { label: "Profile", path: "/my-profile", icon: <User size={20} /> },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#0077B6] px-2 sm:px-4 md:px-6 lg:px-8 py-3 flex justify-between items-center text-white border-b border-gray-700 z-50 h-14 sm:h-16">
      
      {/* Left Side - Logo + Name */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
      >
        <img src={assets.Logo1} alt="Logo" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" />
        <span className="text-base sm:text-lg md:text-xl font-semibold whitespace-nowrap">Sehat One</span>
      </div>

      {/* Middle - Navigation Items */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-1 justify-center">
        {navItems.map((item, index) => {
          const isActive = activePath === item.path;

          return (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setActivePath(item.path);
              }}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? "bg-white text-[#0077B6]" 
                  : "bg-transparent text-white hover:bg-white/20"
              }`}
            >
              {item.icon}
              <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Side - Location, Search, Notification, and Login/Signup Button */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
        {/* Location Dropdown */}
        <div className="flex items-center gap-1 sm:gap-2">
          <label htmlFor="location" className="text-white font-medium text-xs sm:text-sm whitespace-nowrap">
            Location:
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-lg px-2 py-1 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            style={{ 
              appearance: 'auto',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              paddingRight: '1.5rem'
            }}
          >
            <option value="New Delhi" className="bg-[#0077B6] text-white">New Delhi</option>
            <option value="Bhubaneswar" className="bg-[#0077B6] text-white">Bhubaneswar</option>
            <option value="Jajpur" className="bg-[#0077B6] text-white">Jajpur</option>
            <option value="Mumbai" className="bg-[#0077B6] text-white">Mumbai</option>
            <option value="Bangalore" className="bg-[#0077B6] text-white">Bangalore</option>
            <option value="Hyderabad" className="bg-[#0077B6] text-white">Hyderabad</option>
            <option value="Chennai" className="bg-[#0077B6] text-white">Chennai</option>
          </select>
        </div>

        {/* Search Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setShowNotifications(false);
            }}
            className="text-white hover:text-white/80 transition-colors p-1"
          >
            {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Search Bar Pop-Up */}
          {showSearch && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 w-64 z-50">
              <input
                type="text"
                placeholder="Search doctors, hospitals..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              />
              <button className="mt-2 w-full bg-[#0077B6] text-white text-sm py-1.5 rounded-lg hover:bg-[#005f8e] transition">
                Search
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSearch(false);
            }}
            className="text-white hover:text-white/80 transition-colors relative p-1"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-64 z-50">
              <div className="p-3 border-b font-semibold text-sm text-[#0077B6]">
                Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <li
                      key={note.id}
                      className={`text-sm px-4 py-2 transition ${
                        note.read
                          ? "text-gray-500"
                          : "text-gray-800 font-medium bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      {note.message}
                    </li>
                  ))
                ) : (
                  <li className="text-sm px-4 py-2 text-gray-400">
                    No notifications
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Login/Signup or User Profile Button */}
        {token ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {userData && (
              <div className="hidden sm:flex items-center gap-2">
                <img
                  src={userData.image}
                  alt={userData.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <span className="text-white text-xs sm:text-sm font-medium max-w-[100px] truncate">
                  {userData.name}
                </span>
              </div>
            )}
            <button
              onClick={logout}
              className="bg-white text-[#0077B6] text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-6 py-2 rounded-full 
                         shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 whitespace-nowrap 
                         flex items-center gap-1 sm:gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-[#0077B6] text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-6 py-2 rounded-full 
                       shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
          >
            Login / Signup
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
