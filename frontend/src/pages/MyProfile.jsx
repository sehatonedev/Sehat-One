import React from "react";

const Profile = () => {
  const user = {
    name: "sumit s",
    email: "sumit_s@email.com",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // placeholder profile pic
  };

  const sections = [
    "Messages",
    "Favourites",
    "Order History",
    "Settings",
    "Help & Support",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={user.image}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {user.name}
        </h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Boxes Section */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {sections.map((item, index) => (
          <div
            key={index}
            className="border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-all cursor-pointer rounded-xl py-3 px-5 shadow-sm flex justify-between items-center"
          >
            <span className="text-blue-700 font-medium">{item}</span>
            <span className="text-blue-600 text-lg">{">"}</span>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="w-full max-w-md mt-10 flex flex-col gap-3">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all">
          Logout
        </button>
        <button className="w-full border border-blue-300 text-blue-600 font-semibold py-2 rounded-xl hover:bg-blue-50 transition-all">
          Add Another Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
