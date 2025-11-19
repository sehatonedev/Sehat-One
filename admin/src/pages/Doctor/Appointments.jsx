import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { CalendarCheck, Clock, User, VideoCamera, MapPin, CheckCircle, XCircle, CurrencyCircleDollar, MagnifyingGlass } from 'phosphor-react'

const Appointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all') // all, upcoming, past

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // Determine filter type from URL
  useEffect(() => {
    if (location.pathname.includes('/upcoming')) {
      setFilterType('upcoming')
    } else if (location.pathname.includes('/past')) {
      setFilterType('past')
    } else {
      setFilterType('all')
    }
  }, [location.pathname])

  // Parse slotDate format (DD_MM_YYYY) to Date object
  const parseSlotDate = (slotDate) => {
    if (!slotDate) return null
    if (typeof slotDate === 'string' && slotDate.includes('_')) {
      const parts = slotDate.split('_')
      if (parts.length === 3) {
        const day = parseInt(parts[0])
        const month = parseInt(parts[1]) - 1
        const year = parseInt(parts[2])
        return new Date(year, month, day)
      }
    }
    return new Date(slotDate)
  }

  // Check if appointment is upcoming or past
  const isUpcoming = (appointment) => {
    if (appointment.cancelled || appointment.isCompleted) return false
    const aptDate = parseSlotDate(appointment.slotDate)
    if (!aptDate || isNaN(aptDate.getTime())) return false
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    aptDate.setHours(0, 0, 0, 0)
    
    return aptDate >= today
  }

  // Filter appointments based on type
  const getFilteredAppointments = () => {
    let filtered = appointments || []

    // Filter by type (upcoming/past/all)
    if (filterType === 'upcoming') {
      filtered = filtered.filter(apt => isUpcoming(apt))
    } else if (filterType === 'past') {
      filtered = filtered.filter(apt => {
        if (apt.cancelled || apt.isCompleted) return true
        const aptDate = parseSlotDate(apt.slotDate)
        if (!aptDate || isNaN(aptDate.getTime())) return false
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate < today
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(apt => {
        const name = apt.userData?.name?.toLowerCase() || ''
        const email = apt.userData?.email?.toLowerCase() || ''
        const search = searchTerm.toLowerCase()
        return name.includes(search) || email.includes(search)
      })
    }

    return filtered
  }

  const filteredAppointments = getFilteredAppointments()

  // Get status badge
  const getStatusBadge = (appointment) => {
    if (appointment.cancelled) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
          <XCircle size={14} weight="fill" />
          Cancelled
        </span>
      )
    }
    if (appointment.isCompleted) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
          <CheckCircle size={14} weight="fill" />
          Completed
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
        <Clock size={14} weight="fill" />
        Upcoming
      </span>
    )
  }

  // Get appointment type icon
  const getAppointmentTypeIcon = (appointment) => {
    const type = appointment.appointmentType?.toLowerCase() || ''
    if (type.includes('video')) {
      return <VideoCamera size={20} className="text-blue-600" weight="duotone" />
    }
    return <MapPin size={20} className="text-green-600" weight="duotone" />
  }

  // Handle tab navigation
  const handleTabClick = (tab) => {
    if (tab === 'all') {
      navigate('/doctor-appointments')
    } else if (tab === 'upcoming') {
      navigate('/doctor-appointments/upcoming')
    } else if (tab === 'past') {
      navigate('/doctor-appointments/past')
    }
  }

  // Get statistics
  const stats = {
    all: appointments?.length || 0,
    upcoming: appointments?.filter(apt => isUpcoming(apt)).length || 0,
    past: appointments?.filter(apt => {
      if (apt.cancelled || apt.isCompleted) return true
      const aptDate = parseSlotDate(apt.slotDate)
      if (!aptDate || isNaN(aptDate.getTime())) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      aptDate.setHours(0, 0, 0, 0)
      return aptDate < today
    }).length || 0
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage and track all your patient appointments</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.all}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CalendarCheck size={28} className="text-blue-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.upcoming}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock size={28} className="text-green-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Past</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.past}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <CheckCircle size={28} className="text-gray-600" weight="duotone" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <button
            onClick={() => handleTabClick('all')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              filterType === 'all'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Appointments ({stats.all})
          </button>
          <button
            onClick={() => handleTabClick('upcoming')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              filterType === 'upcoming'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Upcoming ({stats.upcoming})
          </button>
          <button
            onClick={() => handleTabClick('past')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              filterType === 'past'
                ? 'bg-[#5F6FFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Past ({stats.past})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <MagnifyingGlass size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16">
            <CalendarCheck size={64} className="text-gray-300 mx-auto mb-4" weight="duotone" />
            <p className="text-gray-500 font-medium text-lg">No appointments found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchTerm ? 'Try adjusting your search terms' : 'No appointments match the selected filter'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAppointments.map((appointment, index) => (
              <div
                key={appointment._id || index}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={appointment.userData?.image || 'https://via.placeholder.com/60'}
                      alt={appointment.userData?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.userData?.name || 'Unknown Patient'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <User size={16} />
                          <span>Age: {calculateAge(appointment.userData?.dob)}</span>
                        </div>
                        {appointment.userData?.email && (
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <span>•</span>
                            <span>{appointment.userData.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <CalendarCheck size={18} className="text-[#5F6FFF]" weight="duotone" />
                        <span className="font-medium">{slotDateFormat(appointment.slotDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-[#5F6FFF]" weight="duotone" />
                        <span className="font-medium">{appointment.slotTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        {getAppointmentTypeIcon(appointment)}
                        <span className="text-sm">{appointment.appointmentType || 'General Visit'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Status */}
                  <div className="flex flex-col lg:items-end gap-3">
                    <div className="flex items-center gap-2">
                      <CurrencyCircleDollar size={20} className="text-green-600" weight="duotone" />
                      <span className="text-lg font-bold text-gray-900">
                        {currency}{appointment.amount}
                      </span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        appointment.payment
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {appointment.payment ? 'Online' : 'Cash'}
                      </span>
                    </div>
                    {getStatusBadge(appointment)}
                  </div>

                  {/* Actions */}
                  {!appointment.cancelled && !appointment.isCompleted && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => completeAppointment(appointment._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <CheckCircle size={18} weight="fill" />
                        Complete
                      </button>
                      <button
                        onClick={() => cancelAppointment(appointment._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <XCircle size={18} weight="fill" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Appointments

