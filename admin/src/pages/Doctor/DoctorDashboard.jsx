import React, { useState, useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import WelcomeBanner from '../../components/doctorComp/Dashboard/WelcomeBanner'
import UpcomingAppointmentCard from '../../components/doctorComp/Dashboard/UpcomingAppointmentCard'
import StatisticsCard from '../../components/doctorComp/Dashboard/StatisticsCard'
import CalendarWidget from '../../components/doctorComp/Dashboard/CalendarWidget'
import WeeklyOverview from '../../components/doctorComp/Dashboard/WeeklyOverview'
import RecentInvoices from '../../components/doctorComp/Dashboard/RecentInvoices'
import TodayAppointments from '../../components/doctorComp/Dashboard/TodayAppointments'
import TodaySchedule from '../../components/doctorComp/Dashboard/TodaySchedule'
import ClinicsAvailability from '../../components/doctorComp/Dashboard/ClinicsAvailability'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, profileData, getProfileData } = useContext(DoctorContext)
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    if (dToken) {
      getDashData()
      getProfileData()
    }
  }, [dToken])
  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      
      const dayName = days[now.getDay()]
      const day = now.getDate()
      const month = months[now.getMonth()]
      const year = now.getFullYear()
      
      setCurrentDate(`${dayName}, ${day} ${month} ${year}`)
      
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12
      
      setCurrentTime(`${hours}:${minutes} ${ampm}`)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // Format slot date for display
  const formatSlotDate = (slotDate) => {
    if (!slotDate) return ''
    const dateArray = slotDate.split('_')
    if (dateArray.length === 3) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`
    }
    return slotDate
  }

  // Get upcoming appointment
  const getUpcomingAppointment = () => {
    if (!dashData?.latestAppointments || dashData.latestAppointments.length === 0) {
      return null
    }
    
    // Find first non-cancelled, non-completed appointment
    const upcoming = dashData.latestAppointments.find(
      apt => !apt.cancelled && !apt.isCompleted
    )
    
    return upcoming || dashData.latestAppointments[0]
  }

  // Statistics data - using dashData or defaults
  const statistics = [
    {
      title: "Today's Appointments",
      value: dashData?.todayAppointments || 100,
      change: "↑ 20% from Yesterday",
      changeType: "up",
      iconType: "today"
    },
    {
      title: "Video Consult Appointments",
      value: dashData?.videoAppointments || 50,
      change: "↑ 15% from last week",
      changeType: "up",
      iconType: "video"
    },
    {
      title: "Pre Visit Appointments",
      value: dashData?.preVisitAppointments || 50,
      change: "↑ 15% from last week",
      changeType: "up",
      iconType: "preVisit"
    },
    {
      title: "Cancelled Appointments",
      value: dashData?.cancelledAppointments || 10,
      change: "↓ 20% from Yesterday",
      changeType: "down",
      iconType: "cancelled"
    },
    {
      title: "Walk-in Appointment",
      value: dashData?.walkinAppointments || 80,
      change: "↓ 15% from Yesterday",
      changeType: "down",
      iconType: "walkin"
    },
    {
      title: "Rescheduled Appointment",
      value: dashData?.rescheduledAppointments || 50,
      change: "↑ 30% from last week",
      changeType: "up",
      iconType: "rescheduled"
    }
  ]

  const upcomingAppointment = getUpcomingAppointment()
  const doctorName = profileData?.name ? `Dr. ${profileData.name}` : 'Doctor'
  const doctorImage = profileData?.image || 'https://via.placeholder.com/150'

  return (dashData || profileData) && (
    <div className='m-5 space-y-6'>
      {/* Top Section - Welcome Banner and Upcoming Appointment */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <WelcomeBanner
          doctorName={doctorName}
          doctorImage={doctorImage}
          currentDate={currentDate}
          currentTime={currentTime}
        />
        <UpcomingAppointmentCard
          appointment={upcomingAppointment ? {
            ...upcomingAppointment,
            slotDate: formatSlotDate(upcomingAppointment.slotDate),
            appointmentType: upcomingAppointment.appointmentType || 'General Visit'
          } : null}
        />
        </div>

      {/* Statistics Cards Section */}
      <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
        {statistics.map((stat, index) => (
          <StatisticsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            iconType={stat.iconType}
          />
        ))}
      </div>

      {/* Main Dashboard Content - Two Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Left Panel - Wider (2 columns) */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Calendar */}
          <CalendarWidget />

          {/* Weekly Overview */}
          <WeeklyOverview />

          {/* Recent Invoices */}
          <RecentInvoices />
        </div>

        {/* Right Panel - Narrower (1 column) */}
        <div className='space-y-6'>
          {/* Today's Appointments */}
          <TodayAppointments />

          {/* Today's Schedule */}
          <TodaySchedule />

          {/* Clinics & Availability */}
          <ClinicsAvailability />
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard