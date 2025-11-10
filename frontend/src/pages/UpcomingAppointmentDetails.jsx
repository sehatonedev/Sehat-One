import React from "react";
import { Video, MoreVertical } from "lucide-react";

const UpcomingAppointmentDetails = () => {
  const appointment = {
    doctor: {
      name: "Dr. Anna Nicholas",
      speciality: "Neurologist",
      hospital: "Metro Hospital",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600",
    },
    date: "01 November 2024",
    time: "11:30",
    complaint: "Headache and Nausea",
    description:
      "I am feeling pain in the eyes when looking into bright lights also tightness sensation in the head",
    patient: {
      name: "Pascal Desroche",
      email: "Appgenz@gmail.com",
      gender: "Male",
    },
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Content */}
      <div className="flex-col justify-start px-3 pb-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Upcoming</h1>

        {/* Outer card */}
        <div className="bg-white shadow-lg rounded-3xl mt-1 px-3 py-2 space-y-1">
          {/* Doctor Info */}
          <div className="flex flex-row justify-between items-start gap-1 py-1">
            <div className="flex items-center gap-2">
              <img
                src={appointment.doctor.image}
                alt="doctor"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover"
              />
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold">{appointment.doctor.name}</h2>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {appointment.doctor.speciality} | {appointment.doctor.hospital}
                </p>

                <div className="flex gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                  <span>{appointment.date}</span>
                  <span>{appointment.time}</span>
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

          {/* Consultation */}
          <div>
            <h3 className="text-sm sm:text-md font-semibold">Consultation</h3>

            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Complaint</p>
              <p className="font-medium text-xs sm:text-sm">{appointment.complaint}</p>
            </div>

            <div>
              <p className="text-gray-500 text-xs sm:text-sm">Description</p>
              <p className="font-medium leading-relaxed text-xs sm:text-sm">
                {appointment.description}
              </p>
            </div>
          </div>

          {/* Patient Details */}
          <div>
            <h3 className="text-sm sm:text-md font-semibold">Patient Details</h3>

            <div className="grid grid-cols-2 gap-y-2">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Name</p>
                <p className="font-medium text-xs sm:text-sm">{appointment.patient.name}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Email</p>
                <p className="font-medium text-xs sm:text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                  {appointment.patient.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Gender</p>
                <p className="font-medium text-xs sm:text-sm">{appointment.patient.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full flex flex-row gap-2 bg-white sticky bottom">
        <button className="flex-1 bg-green-500 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2">
          Pay Now
        </button>

        <button className="flex-1 bg-blue-600 text-white font-semibold rounded-xl shadow text-xs sm:text-sm py-2">
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default UpcomingAppointmentDetails;
