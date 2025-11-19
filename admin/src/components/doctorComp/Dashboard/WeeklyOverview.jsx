import React, { useState } from 'react'

/**
 * WeeklyOverview Component
 * Shows weekly revenue/appointments with bar chart
 */
const WeeklyOverview = () => {
  const [activeTab, setActiveTab] = useState('revenue')

  const revenueData = [
    { day: 'Mon', value: 2 },
    { day: 'Tue', value: 14 },
    { day: 'Wed', value: 28 },
    { day: 'Thu', value: 3 },
    { day: 'Fri', value: 14 },
    { day: 'Sat', value: 18 },
    { day: 'Sun', value: 7 }
  ]

  const maxValue = 35
  const dateRange = '26 August 2024 - 02 September 2024'

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>Weekly Overview</h3>
          <p className='text-sm text-gray-500 mt-1'>{dateRange}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-4 border-b border-gray-200 mb-4'>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`pb-2 px-1 font-medium text-sm ${
            activeTab === 'revenue'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          Revenue
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`pb-2 px-1 font-medium text-sm ${
            activeTab === 'appointments'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
        >
          Appointments
        </button>
      </div>

      {/* Bar Chart */}
      {activeTab === 'revenue' && (
        <div className='space-y-4'>
          {/* Y-axis labels */}
          <div className='flex items-end gap-2 h-48'>
            <div className='flex flex-col justify-between h-full text-xs text-gray-500 pr-2'>
              {[35, 30, 25, 20, 15, 10, 5, 0].map((val) => (
                <span key={val}>{val}k</span>
              ))}
            </div>

            {/* Bars */}
            <div className='flex-1 flex items-end gap-2'>
              {revenueData.map((item, index) => {
                const height = (item.value / maxValue) * 100
                return (
                  <div key={index} className='flex-1 flex flex-col items-center'>
                    <div
                      className='w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors'
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className='text-xs text-gray-600 mt-2'>{item.day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className='text-center py-10 text-gray-500'>
          Appointments data will be shown here
        </div>
      )}
    </div>
  )
}

export default WeeklyOverview

