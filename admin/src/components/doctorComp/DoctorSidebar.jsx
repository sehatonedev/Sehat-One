import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  GridFour,
  Calendar,
  CalendarCheck,
  FileText,
  UserPlus,
  ChatCircle,
  Flask,
  UserCircle,
  Star,
  Gear,
  CaretDown
} from 'phosphor-react'

/**
 * DoctorSidebar Component
 * Side navigation bar for doctor panel with dropdown menus
 */
const DoctorSidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({})
  const location = useLocation()

  const toggleDropdown = (menuItem) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [menuItem]: !prev[menuItem]
    }))
  }

  // Menu items with dropdown sub-items
  const menuItems = [
    {
      id: 'appointments',
      label: 'Appointments',
      icon: CalendarCheck,
      hasDropdown: true,
      subItems: [
        { path: '/doctor-appointments', label: 'All Appointments' },
        { path: '/doctor-appointments/upcoming', label: 'Upcoming' },
        { path: '/doctor-appointments/past', label: 'Past' }
      ]
    },
    {
      id: 'prescription',
      label: 'Prescription',
      icon: FileText,
      hasDropdown: true,
      subItems: [
        { path: '/prescription/all', label: 'All Prescriptions' },
        { path: '/prescription/create', label: 'Create Prescription' }
      ]
    },
    {
      id: 'labtest',
      label: 'Lab Test',
      icon: Flask,
      hasDropdown: true,
      subItems: [
        { path: '/lab-test/all', label: 'All Lab Tests' },
        { path: '/lab-test/request', label: 'Request Lab Test' }
      ]
    }
  ]

  // Single link menu items (no dropdown)
  const singleLinkItems = [
    { path: '/patients/all', label: 'Patients', icon: UserPlus },
    { path: '/requests', label: 'Requests', icon: ChatCircle }
  ]

  // Top menu items without dropdown (Dashboard, Calendar)
  const topMenuItems = [
    { path: '/doctor-dashboard', label: 'Dashboard', icon: GridFour },
    { path: '/calendar', label: 'Calendar', icon: Calendar }
  ]

  // Bottom menu items without dropdown (Profile, Review, Settings) - appears after Departments
  const bottomMenuItems = [
    { path: '/doctor-profile', label: 'Profile', icon: UserCircle },
    { path: '/review', label: 'Review', icon: Star },
    { path: '/settings', label: 'Settings', icon: Gear }
  ]

  return (
    <div className='sticky top-[64px] h-[calc(100vh-64px)] bg-white border-r flex flex-col overflow-y-auto'>
      <ul className='text-[#515151] mt-5'>
        {/* Top menu items without dropdown (Dashboard, Calendar) */}
        {topMenuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]'
                    : 'hover:bg-gray-50'
                }`
              }
            >
              <IconComponent size={20} weight="regular" />
              <p className='hidden md:block'>{item.label}</p>
            </NavLink>
          )
        })}

        {/* Menu items with dropdown */}
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isOpen = openDropdowns[item.id]
          const hasActiveSubItem = item.subItems?.some(subItem => {
            // Check if any sub-item path matches current location
            return location.pathname === subItem.path
          })

          return (
            <li key={item.id}>
              <div
                onClick={() => toggleDropdown(item.id)}
                className={`flex items-center justify-between gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  hasActiveSubItem
                    ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <IconComponent size={20} weight="regular" />
                  <p className='hidden md:block'>{item.label}</p>
                </div>
                <CaretDown
                  size={16}
                  weight="regular"
                  className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {/* Dropdown sub-items */}
              {isOpen && item.subItems && (
                <ul className='bg-gray-50'>
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-2.5 px-3 md:px-9 md:pl-16 cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF] font-medium'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`
                      }
                    >
                      <p className='hidden md:block text-sm'>{subItem.label}</p>
                    </NavLink>
                  ))}
                </ul>
              )}
            </li>
          )
        })}

        {/* Single link menu items (no dropdown) */}
        {singleLinkItems.map((item) => {
          const IconComponent = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]'
                    : 'hover:bg-gray-50'
                }`
              }
            >
              <IconComponent size={20} weight="regular" />
              <p className='hidden md:block'>{item.label}</p>
            </NavLink>
          )
        })}

        {/* Bottom menu items without dropdown (Profile, Review, Settings) - appears after Departments */}
        {bottomMenuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]'
                    : 'hover:bg-gray-50'
                }`
              }
            >
              <IconComponent size={20} weight="regular" />
              <p className='hidden md:block'>{item.label}</p>
            </NavLink>
          )
        })}
      </ul>
    </div>
  )
}

export default DoctorSidebar

