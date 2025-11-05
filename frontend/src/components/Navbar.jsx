import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Home, Compass, CalendarDays, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken } = useContext(AppContext);
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const navItems = [
    { label: "Home", path: "/", icon: <Home size={22} /> },
    { label: "Explore", path: "/doctors", icon: <Compass size={22} /> },
    { label: "Appointment", path: "/MyAppointments", icon: <CalendarDays size={22} /> },
    { label: "Profile", path: "/my-profile", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0077B6] py-3 flex justify-around items-center text-white border-t border-gray-700 z-50 h-14 sm:h-16">

      {navItems.map((item, index) => {
        const isActive = activePath === item.path;

        return (
          <button
            key={index}
            onClick={() => {
              navigate(item.path);
              setActivePath(item.path);
            }}
            className={`flex items-center justify-center transition-all duration-300 rounded-full px-3 py-2 ${
              isActive ? "bg-white text-[#0077B6]" : "bg-transparent text-white"
            }`}
            style={{
              gap: isActive ? "8px" : "0px",
              width: isActive ? "110px" : "45px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            {item.icon}
            <span
              className={`text-sm font-medium transition-opacity duration-300 ${
                isActive ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;
