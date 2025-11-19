import React from 'react'
import { Calendar, Clock } from 'phosphor-react'

/**
 * WelcomeBanner Component
 * Displays doctor's welcome message with profile, date, time, and clock graphic
 */
const WelcomeBanner = ({ doctorName, doctorImage, currentDate, currentTime }) => {
  return (
    <div className='bg-white rounded-lg p-6 border border-gray-200 flex items-center justify-between'>
      <div className='flex items-center gap-4 flex-1'>
        {/* Profile Image */}
        <img 
          src={doctorImage} 
          alt={doctorName}
          className='w-20 h-20 rounded-full object-cover border-2 border-gray-200'
        />
        
        {/* Welcome Text */}
        <div className='flex-1'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Hello, {doctorName}
          </h2>
          <p className='text-gray-500 text-lg mt-1'>Welcome Back</p>
          
          {/* Date and Time */}
          <div className='flex items-center gap-4 mt-3 text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <Calendar size={16} weight="regular" />
              <span>{currentDate}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock size={16} weight="regular" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Clock Graphic */}
      <div className='hidden md:block'>
        <div className='relative w-32 h-32'>
          <svg className='w-full h-full' viewBox='0 0 100 100'>
            {/* Clock Circle */}
            <circle cx='50' cy='50' r='45' fill='none' stroke='#e5e7eb' strokeWidth='2'/>
            {/* Clock Numbers */}
            {[12, 3, 6, 9].map((num, idx) => {
              const angle = (num * 30 - 90) * (Math.PI / 180)
              const x = 50 + 35 * Math.cos(angle)
              const y = 50 + 35 * Math.sin(angle)
              return (
                <text key={idx} x={x} y={y + 3} textAnchor='middle' fontSize='8' fill='#6b7280'>
                  {num}
                </text>
              )
            })}
            {/* Hour Hand */}
            <line 
              x1='50' y1='50' 
              x2='50' y2='35' 
              stroke='#ef4444' 
              strokeWidth='3' 
              strokeLinecap='round'
              transform='rotate(30 50 50)'
            />
            {/* Minute Hand */}
            <line 
              x1='50' y1='50' 
              x2='50' y2='25' 
              stroke='#ef4444' 
              strokeWidth='2' 
              strokeLinecap='round'
              transform='rotate(120 50 50)'
            />
            {/* Center Dot */}
            <circle cx='50' cy='50' r='3' fill='#ef4444'/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner

