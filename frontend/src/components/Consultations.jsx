import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl, token } = useContext(AppContext);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format date from slotDate format (DD_MM_YYYY)
  const formatDate = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split('_');
    if (dateArray.length !== 3) return slotDate;
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Check if appointment time has passed
  const isAppointmentPast = (slotDate, slotTime) => {
    if (!slotDate || !slotTime) return false;
    const [day, month, year] = slotDate.split('_').map(Number);
    
    let hours = 0;
    let minutes = 0;
    
    const timeStr = slotTime.trim().toUpperCase();
    const hasAMPM = timeStr.includes('AM') || timeStr.includes('PM');
    
    if (hasAMPM) {
      const parts = timeStr.replace(/\s*(AM|PM)\s*/i, '').split(':');
      hours = parseInt(parts[0]) || 0;
      minutes = parseInt(parts[1]) || 0;
      
      if (timeStr.includes('PM') && hours !== 12) {
        hours += 12;
      } else if (timeStr.includes('AM') && hours === 12) {
        hours = 0;
      }
    } else {
      const parts = slotTime.split(':');
      hours = parseInt(parts[0]) || 0;
      minutes = parseInt(parts[1]) || 0;
    }
    
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes, 0);
    const now = new Date();
    
    return appointmentDateTime < now;
  };

  // Fetch completed appointments
  useEffect(() => {
    const fetchConsultations = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(backendUrl + '/api/user/appointments', {
          headers: { token }
        });

        if (data.success) {
          // Filter only paid, completed appointments or past appointments
          const completedAppointments = (data.appointments || []).filter(apt => {
            if (apt.cancelled) return false;
            if (!apt.payment) return false; // Only show paid appointments
            return apt.isCompleted || isAppointmentPast(apt.slotDate, apt.slotTime);
          });

          // Sort by date (newest first)
          completedAppointments.sort((a, b) => {
            const dateA = new Date(a.slotDate.split('_').reverse().join('-'));
            const dateB = new Date(b.slotDate.split('_').reverse().join('-'));
            return dateB - dateA;
          });

          setConsultations(completedAppointments);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load consultations");
      } finally {
      setLoading(false);
      }
    };

    fetchConsultations();
  }, [token, backendUrl]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your consultations...</p>
        </div>
      </div>
    );
  }

  if (consultations.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Consultations Yet</h3>
          <p className="text-gray-600 mb-6">
            Your completed consultations will appear here once you've had appointments with doctors.
          </p>
          <a
            href="/doctors"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Book Your First Consultation
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Stats */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              Consultation History
            </h2>
            <p className="text-gray-600 text-sm">
              Total {consultations.length} {consultations.length === 1 ? 'consultation' : 'consultations'}
            </p>
          </div>
          <div className="bg-blue-100 rounded-full p-3">
            <span className="text-3xl">📊</span>
          </div>
        </div>
      </div>

      {/* Consultation Cards */}
      <div className="space-y-4">
        {consultations.map((item, index) => (
          <div
            key={item._id || index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Doctor Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-blue-100 flex-shrink-0">
                    <img
                      src={item.docData?.image || "/default-doctor.png"}
                      alt={item.docData?.name || "Doctor"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=Dr";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {item.docData?.name || "Dr. Unknown"}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {item.docData?.speciality || "General Physician"}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        {formatDate(item.slotDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🕐</span>
                        {item.slotTime || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {item.docData?.address?.line1 || "In-clinic"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                      item.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {item.isCompleted ? "✓ Completed" : "Completed"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                      onClick={() => {
                        // Navigate to prescriptions tab or show prescription
                        toast.info("Prescription will be available in Prescriptions tab");
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultations;
