import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState(null);
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

  // Fetch completed appointments to show as prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
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

          // Transform appointments to prescription format
          const prescriptionsData = completedAppointments.map(apt => ({
            id: apt._id,
            _id: apt._id,
            appointmentId: apt._id,
            title: `Prescription - ${apt.docData?.name || "Dr. Unknown"}`,
            doctorName: apt.docData?.name || "Dr. Unknown",
            speciality: apt.docData?.speciality || "General Physician",
            date: formatDate(apt.slotDate),
            slotDate: apt.slotDate,
            slotTime: apt.slotTime,
            file: apt.prescriptionUrl || null,
            type: apt.prescriptionType || "pdf",
            size: apt.prescriptionSize || "N/A",
            uploadedDate: apt.prescriptionUploadedDate || formatDate(apt.slotDate),
            uploadedTime: apt.prescriptionUploadedTime || apt.slotTime || "N/A",
            doctorImage: apt.docData?.image
          }));

          // Sort by date (newest first)
          prescriptionsData.sort((a, b) => {
            const dateA = new Date(a.slotDate.split('_').reverse().join('-'));
            const dateB = new Date(b.slotDate.split('_').reverse().join('-'));
            return dateB - dateA;
          });

          setPrescriptions(prescriptionsData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [token, backendUrl]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your prescriptions...</p>
        </div>
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Prescriptions Available</h3>
          <p className="text-gray-600 mb-6">
            Your prescriptions will appear here after completing consultations with doctors.
          </p>
          <a
            href="/doctors"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Book a Consultation
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
              Your Prescriptions
            </h2>
            <p className="text-gray-600 text-sm">
              {prescriptions.length} {prescriptions.length === 1 ? 'prescription' : 'prescriptions'} available
            </p>
          </div>
          <div className="bg-green-100 rounded-full p-3">
            <span className="text-3xl">💊</span>
          </div>
        </div>
      </div>

      {/* Prescription Cards */}
      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Prescription Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-green-100 flex-shrink-0 flex items-center justify-center">
                    {rx.doctorImage ? (
                      <img
                        src={rx.doctorImage}
                        alt={rx.doctorName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150?text=Dr";
                        }}
                      />
                    ) : ""}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {rx.doctorName}
                    </h3>
                    <p className="text-green-600 font-medium mb-2">
                      {rx.speciality}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        {rx.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🕐</span>
                        {rx.slotTime || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {rx.file ? (
                    <>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                        onClick={() => setSelectedRx(rx)}
                      >
                        View
                      </button>
                      <a
                        href={rx.file}
                        download={`Prescription-${rx.doctorName}-${rx.date}.${rx.type === 'pdf' ? 'pdf' : 'jpg'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        Download
                      </a>
                    </>
                  ) : (
                    <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                      <span>⏳</span>
                      Prescription Pending
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline PDF Viewer Modal */}
      {selectedRx && selectedRx.file && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRx(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedRx.title}
              </h3>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                onClick={() => setSelectedRx(null)}
              >
                ✕ Close
              </button>
            </div>
            <div className="p-4 bg-gray-100">
              {selectedRx.type === "image" ? (
                <img
                  src={selectedRx.file}
                  alt="Prescription"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg mx-auto"
                />
              ) : (
                <iframe
                  src={selectedRx.file}
                  className="w-full h-[70vh] rounded-lg border border-gray-300"
                  title="Prescription PDF Viewer"
                ></iframe>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
              <a
                href={selectedRx.file}
                download={`Prescription-${selectedRx.doctorName}-${selectedRx.date}.${selectedRx.type === 'pdf' ? 'pdf' : 'jpg'}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
