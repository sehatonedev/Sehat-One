import React, { useContext, useEffect, useState } from "react";
import { Video, MoreVertical } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpcomingAppointmentDetails = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  };

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      if (data.success) {
        // Filter upcoming appointments (not cancelled, not completed, future date)
        const upcoming = data.appointments
          .filter(apt => !apt.cancelled && !apt.isCompleted)
          .sort((a, b) => {
            const dateA = a.slotDate.split('_').reverse().join('-');
            const dateB = b.slotDate.split('_').reverse().join('-');
            return new Date(dateA) - new Date(dateB);
          });
        setAppointments(upcoming);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: 'Appointment Payment',
          description: "Appointment Payment",
          order_id: data.order.id,
          receipt: data.order.receipt,
          handler: async (response) => {
            try {
              const { data } = await axios.post(
                backendUrl + "/api/user/verifyRazorpay",
                response,
                { headers: { token } }
              );
              if (data.success) {
                toast.success(data.message);
                getUserAppointments();
              }
            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to make payment using stripe
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-stripe',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading appointments...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your appointments</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="w-full bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No upcoming appointments found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-col justify-start px-3 pb-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Upcoming</h1>

        {appointments.map((appointment, index) => (
          <div key={index} className="bg-white shadow-lg rounded-3xl mt-4 px-3 py-2 space-y-1">
          {/* Doctor Info */}
          <div className="flex flex-row justify-between items-start gap-1 py-1">
            <div className="flex items-center gap-2">
              <img
                  src={appointment.docData?.image || "https://via.placeholder.com/150"}
                alt="doctor"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover"
              />
              <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-semibold">
                    {appointment.docData?.name || "Doctor"}
                  </h2>
                <p className="text-gray-500 text-xs sm:text-sm">
                    {appointment.docData?.speciality || ""} | {appointment.docData?.address?.line1 || ""}
                </p>

                <div className="flex gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                    <span>{slotDateFormat(appointment.slotDate)}</span>
                    <span>{appointment.slotTime}</span>
                  </div>
              </div>
            </div>

            <MoreVertical className="text-gray-500" />
          </div>

          {/* Video Call */}
          <div className="flex flex-row items-center justify-between bg-gray-50 rounded-2xl border gap-2 py-2">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 rounded-xl p-2">
                <Video className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="font-medium text-gray-700 text-xs sm:text-sm">Video Call</p>
            </div>

            <button className="rounded-full bg-purple-600 text-white font-semibold shadow text-xs sm:text-sm px-3 py-1">
              Start Now →
            </button>
          </div>

            {/* Patient Details */}
          <div>
            <h3 className="text-sm sm:text-md font-semibold">Patient Details</h3>

            <div className="grid grid-cols-2 gap-y-2">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Name</p>
                  <p className="font-medium text-xs sm:text-sm">
                    {userData?.name || appointment.userData?.name || "N/A"}
                  </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                <p className="font-medium text-xs sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                    {userData?.email || appointment.userData?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Gender</p>
                  <p className="font-medium text-xs sm:text-sm">
                    {userData?.gender || appointment.userData?.gender || "N/A"}
                  </p>
                </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
            <div className="w-full flex flex-row gap-2 mt-4">
              {!appointment.payment && (
                <button
                  onClick={() => appointmentStripe(appointment._id)}
                  className="flex-1 bg-green-500 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2"
                >
          Pay Now
        </button>
              )}
              {appointment.payment && (
                <button className="flex-1 bg-gray-400 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2" disabled>
                  Paid
                </button>
              )}

              <button
                onClick={() => cancelAppointment(appointment._id)}
                className="flex-1 bg-blue-600 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2"
              >
                {appointment.payment ? "Cancel" : "Reschedule"}
        </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointmentDetails;
