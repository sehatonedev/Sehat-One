import React from 'react'
import { CalendarCheck, VideoCamera, Calendar, XCircle, User, Clock } from 'phosphor-react'

/**
 * StatisticsCard Component
 * Displays appointment statistics with icon, value, and percentage change
 */
const StatisticsCard = ({ title, value, change, changeType, iconType }) => {
  const icons = {
    today: CalendarCheck,
    video: VideoCamera,
    preVisit: Calendar,
    cancelled: XCircle,
    walkin: User,
    rescheduled: Clock
  }

  const IconComponent = icons[iconType] || CalendarCheck
  const isPositive = changeType === 'up'

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200 min-w-[200px] flex-shrink-0'>
      <div className='flex items-center justify-between mb-3'>
        <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center'>
          <IconComponent size={20} weight="regular" className='text-blue-600' />
        </div>
      </div>
      
      <h3 className='text-gray-600 text-sm mb-2'>{title}</h3>
      <p className='text-3xl font-bold text-gray-800 mb-2'>{value}</p>
      
      <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span>{change}</span>
      </div>
    </div>
  )
}

export default StatisticsCard

