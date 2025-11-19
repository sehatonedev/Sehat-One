import React from 'react'
import { Calendar, Clock, ChatCircle, VideoCamera, PlusCircle } from 'phosphor-react'

/**
 * UpcomingAppointmentCard Component
 * Displays the next upcoming appointment with patient info and action buttons
 */
const UpcomingAppointmentCard = ({ appointment }) => {
  if (!appointment) {
    return (
      <div className='bg-white rounded-lg p-6 border border-gray-200'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>Upcoming Appointment</h3>
        <p className='text-gray-500'>No upcoming appointments</p>
      </div>
    )
  }

  const { userData, slotDate, slotTime, appointmentType, _id } = appointment
  const patientInitial = userData?.name?.charAt(0).toUpperCase() || 'P'
  // Format appointment ID like #PAVC500021
  const appointmentId = _id ? `#PAVC${_id.substring(_id.length - 6).toUpperCase()}` : '#N/A'

  return (
    <div className='bg-white rounded-lg p-6 border border-gray-200'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4'>Upcoming Appointment</h3>
      
      {/* Patient Info */}
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg'>
          {patientInitial}
        </div>
        <div>
          <p className='font-semibold text-gray-800'>{userData?.name || 'Patient'}</p>
          <p className='text-sm text-gray-500'>{appointmentId || '#N/A'}</p>
        </div>
      </div>

      {/* Appointment Type */}
      <div className='flex items-center gap-2 mb-3'>
        <PlusCircle size={16} weight="fill" className='text-gray-600' />
        <span className='text-gray-700'>{appointmentType || 'General Visit'}</span>
      </div>

      {/* Appointment Time */}
      <div className='flex items-center gap-4 mb-4 text-sm text-gray-600'>
        <div className='flex items-center gap-2'>
          <Calendar size={16} weight="regular" />
          <span>Today</span>
        </div>
        <div className='flex items-center gap-2'>
          <Clock size={16} weight="regular" />
          <span>{slotTime || 'N/A'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-2 flex-wrap'>
        <button className='flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
          <Calendar size={18} weight="regular" />
          Start Appointment
        </button>
        <button className='flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
          <ChatCircle size={18} weight="regular" />
          Chat Now
        </button>
        <button className='flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors'>
          <VideoCamera size={18} weight="regular" />
          Video Appointment
        </button>
      </div>
    </div>
  )
}

export default UpcomingAppointmentCard

