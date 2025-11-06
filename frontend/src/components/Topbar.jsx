// Commented out for future use in responsiveness
// import React, { useState, useEffect, useRef } from "react";
// import { Search, Bell, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Topbar = () => {
//   const [location, setLocation] = useState("New Delhi");
//   const [showSearch, setShowSearch] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const notificationRef = useRef(null);
//   const navigate = useNavigate();

//   // demo notifiations (replace with API data later)
//   const notifications = [
//     { id: 1, message: "Your appointment with Dr. Mehta is confirmed." },
//     { id: 2, message: "Your test reports are now available." },
//     { id: 3, message: "Reminder: Follow-up visit tomorrow at 4 PM." },
//   ];

//   // Close notifications when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (notificationRef.current && !notificationRef.current.contains(e.target)) {
//         setShowNotifications(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="fixed top-14 sm:top-16 left-0 w-full z-40 bg-white shadow-md flex items-center justify-between px-6 py-3">
      
//       {/* --- Location Dropdown --- */}
//       <div className="flex items-center gap-2">
//         <label htmlFor="location" className="text-gray-700 font-medium text-sm">
//           Location:
//         </label>
//         <select
//           id="location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
//         >
//           <option>New Delhi</option>
//           <option>Bhubaneswar</option>
//           <option>Jajpur</option>
//           <option>Mumbai</option>
//           <option>Bangalore</option>
//           <option>Hyderabad</option>
//           <option>Chennai</option>
//         </select>
//       </div>

//       {/* --- Right Side Section (Icons + Button) --- */}
//       <div className="flex items-center gap-4 relative">
        
//         {/* --- Search Icon --- */}
//         <div className="relative">
//           <button
//             onClick={() => {
//               setShowSearch(!showSearch);
//               setShowNotifications(false);
//             }}
//             className="text-gray-700 hover:text-[#0077B6] transition-colors"
//           >
//             {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
//           </button>

//           {/* Search Bar Pop-Up */}
//           {showSearch && (
//             <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 w-64 z-50">
//               <input
//                 type="text"
//                 placeholder="Search doctors, hospitals..."
//                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
//               />
//               <button className="mt-2 w-full bg-[#0077B6] text-white text-sm py-1.5 rounded-lg hover:bg-[#005f8e] transition">
//                 Search
//               </button>
//             </div>
//           )}
//         </div>

//         {/* --- Notification Icon --- */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={() => {
//               setShowNotifications(!showNotifications);
//               setShowSearch(false);
//             }}
//             className="text-gray-700 hover:text-[#0077B6] transition-colors relative"
//           >
//             <Bell className="w-5 h-5" />
//           </button>

//           {/* Notifications Dropdown */}
//           {showNotifications && (
//             <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-64 z-50">
//               <div className="p-3 border-b font-semibold text-sm text-[#0077B6]">
//                 Notifications
//               </div>
//               <ul className="max-h-60 overflow-y-auto">
//                 {notifications.length > 0 ? (
//                   notifications.map((note) => (
//                     <li
//                       key={note.id}
//                       className={`text-sm px-4 py-2 transition ${
//                         note.read
//                           ? "text-gray-500"
//                           : "text-gray-800 font-medium bg-gray-50"
//                       } hover:bg-gray-100`}
//                     >
//                       {note.message}
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-sm px-4 py-2 text-gray-400">
//                     No notifications
//                   </li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* --- Login / Signup Button (Orange) --- */}
//         <button
//   onClick={() => navigate("/login")}
//   className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full 
//              shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-500 
//              transition-all duration-300 ease-in-out"
// >
//   Login / Signup
// </button>

//       </div>
//     </div>
//   );
// };

// export default Topbar;

// Temporary return to prevent errors
const Topbar = () => {
  return null;
};

export default Topbar;
