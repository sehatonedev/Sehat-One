import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Home, Compass, CalendarDays, User, Search, Bell, X, Menu } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AppContext);
  const [activePath, setActivePath] = useState("/");
  const [selectedLocation, setSelectedLocation] = useState("New Delhi");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => setActivePath(location.pathname), [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
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

  const navItems = isLoggedIn
    ? [
        { label: "Home", path: "/", icon: <Home size={20} /> },
        { label: "Doctors", path: "/doctors", icon: <Compass size={20} /> },
        { label: "Bookings", path: "/bookings", icon: <CalendarDays size={20} /> },
        { label: "Records", path: "/records", icon: <CalendarDays size={20} /> },
      ]
    : [
        { label: "Home", path: "/", icon: <Home size={20} /> },
        { label: "Doctors", path: "/doctors", icon: <Compass size={20} /> },
        { label: "Appointment", path: "/my-appointments", icon: <CalendarDays size={20} /> },
      ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowProfileMenu(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate("/");
    window.location.reload();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

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

        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-white text-[#0077B6] px-4 py-2 rounded-full shadow text-sm"
          >
            Login / Signup
          </button>
        ) : (
          <>
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="hidden md:flex items-center gap-2 bg-white text-[#0077B6] px-4 py-2 rounded-full shadow text-sm hover:bg-gray-50 transition-colors"
              >
                <User size={20} />
                <span>Profile</span>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg w-48 overflow-hidden z-50">
                  <button
                    onClick={() => {
                      navigate("/my-profile");
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                      activePath === "/my-profile" ? "bg-blue-50 text-[#0077B6] font-semibold" : "text-gray-700"
                    }`}
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowProfileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-t ${
                      activePath === "/my-appointments" ? "bg-blue-50 text-[#0077B6] font-semibold" : "text-gray-700"
                    }`}
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors border-t text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
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

          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#0077B6] px-4 py-2 rounded-full shadow mt-2"
            >
              Login / Signup
            </button>
          ) : (
            <>
              <div className="mt-2 border-t border-white/20 pt-2">
                <p className="text-white/80 text-sm font-semibold mb-2 px-3">Profile</p>
                <button
                  onClick={() => {
                    navigate("/my-profile");
                    setMobileMenu(false);
                  }}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-full transition ${
                    activePath === "/my-profile" ? "bg-white text-[#0077B6]" : "hover:bg-white/20 text-white"
                  }`}
                >
                  <User size={18} />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/my-appointments");
                    setMobileMenu(false);
                  }}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-full transition ${
                    activePath === "/my-appointments" ? "bg-white text-[#0077B6]" : "hover:bg-white/20 text-white"
                  }`}
                >
                  <CalendarDays size={18} />
                  <span>My Appointments</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setMobileMenu(false);
                }}
                className="bg-white text-[#0077B6] px-4 py-2 rounded-full shadow mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">Do you want to logout from your account?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

