import React from 'react'
import { VideoCamera, FileText, DotsThree } from 'phosphor-react'

/**
 * TodayAppointments Component
 * Shows today's appointments list
 */
const TodayAppointments = () => {
  const appointments = [
    {
      patientName: 'Adrian Marshall',
      conditions: 'Headache, Diabetes',
      status: 'pending',
      statusText: 'Start',
      statusColor: 'bg-red-500'
    },
    {
      patientName: 'Kelly Stevens',
      conditions: 'Chest Pain',
      status: 'inProgress',
      statusText: 'In Progress',
      statusColor: 'bg-green-500',
      hasEndButton: true
    },
    {
      patientName: 'Samuel Anderson',
      conditions: 'Allergies',
      status: 'upcoming',
      statusText: 'In 30 minutes',
      statusColor: 'bg-gray-400'
    },
    {
      patientName: 'Catherine Griffin',
      conditions: 'Hypertension, Asthma',
      status: 'cancelled',
      statusText: 'Cancelled',
      statusColor: 'bg-red-500'
    },
    {
      patientName: 'Robert Hutchinson',
      conditions: 'Depression',
      status: 'rescheduled',
      statusText: 'Rescheduled',
      statusColor: 'bg-yellow-500'
    },
    {
      patientName: 'Kelly Stevens',
      conditions: 'Chest Pain',
      status: 'inProgress',
      statusText: 'In Progress',
      statusColor: 'bg-green-500',
      hasEndButton: true
    }
  ]

  const getCurrentDate = () => {
    const now = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
  }

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4'>{getCurrentDate()}</h3>

      <div className='space-y-3'>
        {appointments.map((apt, index) => (
          <div key={index} className='p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow'>
            <div className='flex items-start justify-between mb-2'>
              <div className='flex-1'>
                <p className='font-medium text-gray-800'>{apt.patientName}</p>
                <p className='text-sm text-gray-600 mt-1'>{apt.conditions}</p>
              </div>
              <button className='p-1 hover:bg-gray-100 rounded'>
                <DotsThree size={20} className='text-gray-500' />
              </button>
            </div>

            <div className='flex items-center gap-2 mt-3'>
              <button
                className={`px-3 py-1 rounded text-xs font-medium text-white ${apt.statusColor}`}
              >
                {apt.statusText}
              </button>
              {apt.hasEndButton && (
                <button className='px-3 py-1 rounded text-xs font-medium text-white bg-red-500 hover:bg-red-600'>
                  End
                </button>
              )}
              <div className='flex gap-2 ml-auto'>
                <button className='p-1.5 hover:bg-blue-50 rounded'>
                  <VideoCamera size={16} className='text-blue-600' />
                </button>
                <button className='p-1.5 hover:bg-blue-50 rounded'>
                  <FileText size={16} className='text-blue-600' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodayAppointments

