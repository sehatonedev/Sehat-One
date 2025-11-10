import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
<<<<<<< HEAD
import { Home, Compass, CalendarDays, User, Search, Bell, X, LogOut } from "lucide-react";
=======
import { Home, Compass, CalendarDays, User, Search, Bell, X, Menu } from "lucide-react";
>>>>>>> 7d9f544 (third commit)
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
<<<<<<< HEAD
  const { token, setToken, userData } = useContext(AppContext);
=======
  const { fakeLoggedIn } = useContext(AppContext);

>>>>>>> 7d9f544 (third commit)
  const [activePath, setActivePath] = useState("/");
  const [selectedLocation, setSelectedLocation] = useState("New Delhi");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
<<<<<<< HEAD
  const notificationRef = useRef(null);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Close notifications when clicking outside
=======
  const [mobileMenu, setMobileMenu] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => setActivePath(location.pathname), [location.pathname]);

>>>>>>> 7d9f544 (third commit)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

<<<<<<< HEAD
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
=======
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

      {/* Logo on Left */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <img src={assets.Logo1} alt="Logo" className="h-9 w-9" />
        <span className="text-lg font-semibold">Sehat One</span>
      </div>

      {/* Centered Nav Items for Desktop */}
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
>>>>>>> 7d9f544 (third commit)
            </button>
          );
        })}
      </div>

<<<<<<< HEAD
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
=======
      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Location */}
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

        {/* Search */}
        <div className="relative">
          <button onClick={() => setShowSearch(!showSearch)} className="p-1">
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>
          {showSearch && (
            <div className="absolute right-0 mt-2 bg-white text-black p-3 shadow w-64 rounded-lg">
              <input className="border w-full p-2 rounded" placeholder="Search doctors..." />
>>>>>>> 7d9f544 (third commit)
            </div>
          )}
        </div>

<<<<<<< HEAD
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
=======
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-1">
            <Bell size={20} />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white text-black shadow rounded-lg w-72">
              <div className="p-3 font-semibold text-[#0077B6] border-b">Notifications</div>
              {notifications.map((n) => (
                <p key={n.id} className="p-3 border-b text-sm">{n.message}</p>
              ))}
>>>>>>> 7d9f544 (third commit)
            </div>
          )}
        </div>

<<<<<<< HEAD
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
=======
        {/* Login / Logout */}
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
>>>>>>> 7d9f544 (third commit)
  );
};

export default Navbar;
<<<<<<< HEAD
=======

>>>>>>> 7d9f544 (third commit)
