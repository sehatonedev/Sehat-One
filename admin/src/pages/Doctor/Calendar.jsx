import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { 
  CaretLeft, 
  CaretRight, 
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  VideoCamera,
  MapPin
} from 'phosphor-react'

const Calendar = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // 'month', 'week', 'day'
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // Generate time slots for the day view (8 AM to 8 PM)
  useEffect(() => {
    const slots = []
    for (let hour = 8; hour <= 20; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        hour: hour
      })
    }
    setTimeSlots(slots)
  }, [])

  const month = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay()
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate()
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Parse slotDate format (DD_MM_YYYY) to Date object
  const parseSlotDate = (slotDate) => {
    if (!slotDate) return null
    // Check if it's in DD_MM_YYYY format
    if (typeof slotDate === 'string' && slotDate.includes('_')) {
      const parts = slotDate.split('_')
      if (parts.length === 3) {
        const day = parseInt(parts[0])
        const month = parseInt(parts[1]) - 1 // Month is 0-indexed
        const year = parseInt(parts[2])
        return new Date(year, month, day)
      }
    }
    // If it's already a date string or Date object
    return new Date(slotDate)
  }

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    if (!appointments || appointments.length === 0) return []
    
    const dateStr = formatDateForComparison(date)
    return appointments.filter(apt => {
      if (!apt.slotDate) return false
      const aptDate = parseSlotDate(apt.slotDate)
      if (!aptDate || isNaN(aptDate.getTime())) return false
      const aptDateStr = formatDateForComparison(aptDate)
      return aptDateStr === dateStr
    })
  }

  // Format date for comparison (YYYY-MM-DD)
  const formatDateForComparison = (date) => {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  // Check if date has appointments
  const hasAppointments = (day) => {
    if (!day) return false
    const date = new Date(year, currentDate.getMonth(), day)
    return getAppointmentsForDate(date).length > 0
  }

  // Get appointment count for a date
  const getAppointmentCount = (day) => {
    if (!day) return 0
    const date = new Date(year, currentDate.getMonth(), day)
    return getAppointmentsForDate(date).length
  }

  // Check if date is today
  const isToday = (day) => {
    if (!day) return false
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  // Check if date is selected
  const isSelected = (day) => {
    if (!day) return false
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))
  }

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(year, currentDate.getMonth(), day))
    }
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  // Generate calendar days
  const days = []
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Get week view dates
  const getWeekDates = () => {
    const weekDates = []
    const startOfWeek = new Date(selectedDate)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDates.push(date)
    }
    return weekDates
  }

  const weekDates = viewMode === 'week' ? getWeekDates() : []

  // Get appointment status badge
  const getStatusBadge = (appointment) => {
    if (appointment.cancelled) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <XCircle size={12} weight="fill" />
          Cancelled
        </span>
      )
    }
    if (appointment.isCompleted) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle size={12} weight="fill" />
          Completed
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        <Clock size={12} weight="fill" />
        Upcoming
      </span>
    )
  }

  // Get appointment type icon
  const getAppointmentTypeIcon = (appointment) => {
    if (appointment.appointmentType === 'Video Consultation' || appointment.appointmentType === 'Video') {
      return <VideoCamera size={18} className="text-blue-600" />
    }
    return <MapPin size={18} className="text-green-600" />
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 mt-1">Manage your appointments and schedule</p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'month'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'week'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'day'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Day
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className={`${viewMode === 'day' ? 'lg:col-span-2' : 'lg:col-span-2'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#5F6FFF] to-[#7B8AFF]">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <CaretLeft size={24} weight="bold" className="text-white" />
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">{month} {year}</h2>
                {viewMode === 'week' && (
                  <p className="text-white/90 text-sm mt-1">
                    {weekDates[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                    {weekDates[6]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <CaretRight size={24} weight="bold" className="text-white" />
              </button>
            </div>

            {/* Calendar Grid */}
            {viewMode === 'month' && (
              <div className="p-6">
                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map((day, index) => (
                    <div
                      key={index}
                      className="text-center text-sm font-semibold text-gray-600 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    const appointmentCount = getAppointmentCount(day)
                    const hasApt = hasAppointments(day)
                    const today = isToday(day)
                    const selected = isSelected(day)

                    if (day === null) {
                      return <div key={index} className="aspect-square"></div>
                    }

                    return (
                      <div
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`aspect-square flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all relative group ${
                          selected
                            ? 'bg-[#5F6FFF] text-white shadow-lg scale-105'
                            : today
                            ? 'bg-blue-50 border-2 border-[#5F6FFF] text-[#5F6FFF]'
                            : 'text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                        }`}
                      >
                        <span className={`text-sm font-semibold ${selected ? 'text-white' : ''}`}>
                          {day}
                        </span>
                        {hasApt && (
                          <div className="mt-1 flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              selected ? 'bg-white' : 'bg-[#5F6FFF]'
                            }`}></div>
                            {appointmentCount > 1 && (
                              <span className={`text-xs font-medium ${
                                selected ? 'text-white' : 'text-[#5F6FFF]'
                              }`}>
                                {appointmentCount}
                              </span>
                            )}
                          </div>
                        )}
                        {today && !selected && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#5F6FFF] rounded-full"></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Week View */}
            {viewMode === 'week' && (
              <div className="p-6">
                <div className="grid grid-cols-7 gap-4">
                  {weekDates.map((date, index) => {
                    const dateAppointments = getAppointmentsForDate(date)
                    const isSelectedDay = formatDateForComparison(date) === formatDateForComparison(selectedDate)
                    const isTodayDate = formatDateForComparison(date) === formatDateForComparison(new Date())

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`cursor-pointer rounded-lg p-4 transition-all border-2 ${
                          isSelectedDay
                            ? 'bg-[#5F6FFF] text-white border-[#5F6FFF] shadow-lg'
                            : isTodayDate
                            ? 'bg-blue-50 border-[#5F6FFF]'
                            : 'bg-gray-50 border-gray-200 hover:border-[#5F6FFF] hover:bg-blue-50'
                        }`}
                      >
                        <div className="text-center">
                          <p className={`text-xs font-medium mb-1 ${
                            isSelectedDay ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {dayNamesFull[date.getDay()]}
                          </p>
                          <p className={`text-2xl font-bold mb-2 ${
                            isSelectedDay ? 'text-white' : 'text-gray-900'
                          }`}>
                            {date.getDate()}
                          </p>
                          <div className={`text-xs font-medium ${
                            isSelectedDay ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {dateAppointments.length} appointment{dateAppointments.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Day View */}
            {viewMode === 'day' && (
              <div className="p-6">
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {dayNamesFull[selectedDate.getDay()]}, {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <p className="text-gray-500">
                    {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''} scheduled
                  </p>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {timeSlots.map((slot, index) => {
                    const slotAppointments = selectedDateAppointments.filter(apt => {
                      const aptTime = apt.slotTime?.split(':')[0]
                      return parseInt(aptTime) === slot.hour
                    })

                    return (
                      <div key={index} className="flex gap-4">
                        <div className="w-20 flex-shrink-0 text-right pt-2">
                          <span className="text-sm font-semibold text-gray-600">{slot.time}</span>
                        </div>
                        <div className="flex-1 min-h-[80px] border-l-2 border-gray-200 pl-4 relative">
                          {slotAppointments.length > 0 ? (
                            slotAppointments.map((apt, aptIndex) => (
                              <div
                                key={aptIndex}
                                className="mb-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={apt.userData?.image || 'https://via.placeholder.com/40'}
                                      alt={apt.userData?.name}
                                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                    <div>
                                      <p className="font-semibold text-gray-900">{apt.userData?.name}</p>
                                      <p className="text-xs text-gray-500">{apt.slotTime}</p>
                                    </div>
                                  </div>
                                  {getAppointmentTypeIcon(apt)}
                                </div>
                                {getStatusBadge(apt)}
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-gray-400 pt-2">No appointments</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Appointments Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <CalendarIcon size={24} className="text-[#5F6FFF]" weight="duotone" />
              <h3 className="text-xl font-bold text-gray-900">Appointments</h3>
            </div>

            <div className="mb-4 p-4 bg-gradient-to-r from-[#5F6FFF] to-[#7B8AFF] rounded-lg text-white">
              <p className="text-sm font-medium opacity-90">Selected Date</p>
              <p className="text-lg font-bold mt-1">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No appointments</p>
                  <p className="text-sm text-gray-400 mt-1">Select a date to view appointments</p>
                </div>
              ) : (
                selectedDateAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={appointment.userData?.image || 'https://via.placeholder.com/50'}
                        alt={appointment.userData?.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{appointment.userData?.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {appointment.userData?.email || 'No email'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} className="text-[#5F6FFF]" />
                        <span>{appointment.slotTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getAppointmentTypeIcon(appointment)}
                        <span>{appointment.appointmentType || 'General Visit'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">{currency}{appointment.amount}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          appointment.payment 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {appointment.payment ? 'Online' : 'Cash'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      {getStatusBadge(appointment)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar

