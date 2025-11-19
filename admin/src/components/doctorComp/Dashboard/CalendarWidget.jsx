import React, { useState } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'

/**
 * CalendarWidget Component
 * Displays a calendar with date selection
 */
const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(18) // Default selected date

  const month = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay()
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate()
  
  // Days with appointments (marked with red line)
  const appointmentDays = [1, 2, 4, 6, 15]

  const days = []
  const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Add next month's first few days
  const nextMonthDays = 4
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push(i)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))
  }

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200'>
      {/* Month Navigation */}
      <div className='flex items-center justify-between mb-4'>
        <button onClick={handlePrevMonth} className='p-1 hover:bg-gray-100 rounded'>
          <CaretLeft size={20} weight="bold" className='text-gray-600' />
        </button>
        <h3 className='text-lg font-semibold text-gray-800'>{month} {year}</h3>
        <button onClick={handleNextMonth} className='p-1 hover:bg-gray-100 rounded'>
          <CaretRight size={20} weight="bold" className='text-gray-600' />
        </button>
      </div>

      {/* Day Names */}
      <div className='grid grid-cols-7 gap-1 mb-2'>
        {dayNames.map((day, index) => (
          <div key={index} className='text-center text-xs font-medium text-gray-500 py-2'>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className='grid grid-cols-7 gap-1'>
        {days.map((day, index) => {
          const isCurrentMonth = day !== null && day <= daysInMonth
          const isSelected = day === selectedDate && isCurrentMonth
          const hasAppointment = appointmentDays.includes(day) && isCurrentMonth
          const isNextMonth = day !== null && day <= nextMonthDays && index >= daysInMonth + firstDay

          if (day === null) {
            return <div key={index} className='aspect-square'></div>
          }

          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && setSelectedDate(day)}
              className={`aspect-square flex flex-col items-center justify-center cursor-pointer rounded relative ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : isNextMonth
                  ? 'text-gray-300'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className='text-sm font-medium'>{day}</span>
              {hasAppointment && !isSelected && (
                <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full'></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarWidget

