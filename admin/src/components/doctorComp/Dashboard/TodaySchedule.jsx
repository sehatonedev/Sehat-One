import React, { useState } from 'react'
import { Eye, Plus } from 'phosphor-react'

/**
 * TodaySchedule Component
 * Shows today's schedule with tabs and summary
 */
const TodaySchedule = () => {
  const [activeTab, setActiveTab] = useState('all')

  const schedule = [
    {
      patientName: 'Adrian Marshall',
      condition: 'Headache',
      time: '4:30 PM',
      initial: 'A',
      color: 'bg-blue-500'
    },
    {
      patientName: 'Kelly Stevens',
      condition: 'Chest Pain',
      time: '5:00 PM',
      initial: 'K',
      color: 'bg-green-500'
    },
    {
      patientName: 'Samuel Anderson',
      condition: 'Allergies',
      time: '5:30 PM',
      initial: 'S',
      color: 'bg-purple-500'
    },
    {
      patientName: 'Catherine Griffin',
      condition: 'Hypertension',
      time: '6:00 PM',
      initial: 'C',
      color: 'bg-yellow-500'
    },
    {
      patientName: 'Robert Hutchinson',
      condition: 'Depression',
      time: '6:30 PM',
      initial: 'R',
      color: 'bg-pink-500'
    }
  ]

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-gray-800'>Today's Schedule</h3>
        <button className='flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors'>
          <Plus size={16} weight="bold" />
          Add Walk-in Appointments
        </button>
      </div>

      {/* Tabs */}
      <div className='flex gap-2 border-b border-gray-200 mb-4'>
        {['All', 'Online', 'Offline'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`pb-2 px-3 font-medium text-sm ${
              activeTab === tab.toLowerCase()
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary Bar */}
      <div className='flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg'>
        <div className='text-sm'>
          <span className='text-gray-600'>Today's</span>{' '}
          <span className='font-semibold text-gray-800'>5</span>
        </div>
        <div className='text-sm'>
          <span className='text-gray-600'>Waiting</span>{' '}
          <span className='font-semibold text-gray-800'>1</span>
        </div>
        <div className='text-sm'>
          <span className='text-gray-600'>Engaged</span>{' '}
          <span className='font-semibold text-gray-800'>2</span>
        </div>
        <div className='text-sm'>
          <span className='text-gray-600'>Done</span>{' '}
          <span className='font-semibold text-gray-800'>1</span>
        </div>
      </div>

      {/* Schedule List */}
      <div className='space-y-3'>
        {schedule.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <div
              className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white font-semibold`}
            >
              {item.initial}
            </div>
            <div className='flex-1'>
              <p className='font-medium text-gray-800'>{item.patientName}</p>
              <p className='text-xs text-gray-600'>{item.condition}</p>
              <p className='text-xs text-gray-500 mt-1'>{item.time}</p>
            </div>
            <button className='p-2 hover:bg-blue-50 rounded-lg transition-colors'>
              <Eye size={18} className='text-blue-600' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodaySchedule

