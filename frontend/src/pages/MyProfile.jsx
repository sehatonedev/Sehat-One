import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, token, setToken, backendUrl, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    dob: "",
    gender: "Not Selected",
    image: ""
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "000000000",
        address: userData.address || { line1: "", line2: "" },
        dob: userData.dob || "Not Selected",
        gender: userData.gender || "Not Selected",
        image: userData.image || ""
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", JSON.stringify(formData.address));
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("gender", formData.gender);
      
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formDataToSend,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        loadUserProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      {userData ? (
        <>
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-10">
            <img
              src={formData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-md object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {formData.name}
            </h2>
            <p className="text-gray-500 text-sm">{formData.email}</p>
          </div>

          {/* Edit Profile Form */}
          {isEdit ? (
            <form onSubmit={updateProfile} className="w-full max-w-md flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Address Line 1</label>
                <input
                  type="text"
                  name="line1"
                  value={formData.address.line1}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Address Line 2</label>
                <input
                  type="text"
                  name="line2"
                  value={formData.address.line2}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob !== "Not Selected" ? formData.dob : ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Profile Info Display */}
              <div className="w-full max-w-md flex flex-col gap-4 mb-6">
                <div className="border border-blue-100 bg-blue-50 rounded-xl py-3 px-5 shadow-sm">
                  <p className="text-blue-700 font-medium">Phone: {formData.phone}</p>
                </div>
                <div className="border border-blue-100 bg-blue-50 rounded-xl py-3 px-5 shadow-sm">
                  <p className="text-blue-700 font-medium">Date of Birth: {formData.dob}</p>
                </div>
                <div className="border border-blue-100 bg-blue-50 rounded-xl py-3 px-5 shadow-sm">
                  <p className="text-blue-700 font-medium">Gender: {formData.gender}</p>
                </div>
                {formData.address.line1 && (
                  <div className="border border-blue-100 bg-blue-50 rounded-xl py-3 px-5 shadow-sm">
                    <p className="text-blue-700 font-medium">Address:</p>
                    <p className="text-blue-600 text-sm">{formData.address.line1}</p>
                    {formData.address.line2 && (
                      <p className="text-blue-600 text-sm">{formData.address.line2}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-md flex flex-col gap-3">
                <button
                  onClick={() => setIsEdit(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all"
                >
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full border border-red-300 text-red-600 font-semibold py-2 rounded-xl hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
