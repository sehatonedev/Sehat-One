import React, { useState } from 'react'
import { CaretDown, CaretUp } from 'phosphor-react'

/**
 * ClinicsAvailability Component
 * Shows clinics with expandable availability details
 */
const ClinicsAvailability = () => {
  const [expandedClinic, setExpandedClinic] = useState(0) // First clinic expanded by default

  const clinics = [
    {
      id: 0,
      name: 'MedCare Clinic',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
      fee: 700,
      image: 'https://via.placeholder.com/60',
      schedule: {
        monday: '10:00 AM - 7:00 PM',
        tuesday: '10:00 AM - 7:00 PM',
        wednesday: '8:00 AM - 12:00 PM',
        thursday: '10:00 AM - 7:00 PM',
        friday: '10:00 AM - 7:00 PM',
        saturday: 'SAT & SUN: Closed'
      }
    },
    {
      id: 1,
      name: 'HealthHaven Medical Center',
      address: '123 Main Street, Health City, HC 12345',
      fee: 700,
      image: 'https://via.placeholder.com/60',
      schedule: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 2:00 PM',
        sunday: 'Closed'
      }
    }
  ]

  const toggleClinic = (id) => {
    setExpandedClinic(expandedClinic === id ? null : id)
  }

  return (
    <div className='bg-white rounded-lg p-5 border border-gray-200'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4'>Clinics & Availability</h3>

      <div className='space-y-3'>
        {clinics.map((clinic) => {
          const isExpanded = expandedClinic === clinic.id

          return (
            <div key={clinic.id} className='border border-gray-200 rounded-lg overflow-hidden'>
              {/* Clinic Header */}
              <div
                onClick={() => toggleClinic(clinic.id)}
                className='p-4 cursor-pointer hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-start gap-3'>
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    className='w-15 h-15 rounded-lg object-cover'
                  />
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-800'>{clinic.name}</h4>
                    <p className='text-xs text-gray-600 mt-1'>{clinic.address}</p>
                    <p className='text-sm font-medium text-gray-800 mt-2'>
                      ₹ {clinic.fee}
                    </p>
                  </div>
                  <button className='p-1'>
                    {isExpanded ? (
                      <CaretUp size={20} className='text-gray-600' />
                    ) : (
                      <CaretDown size={20} className='text-gray-600' />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Schedule */}
              {isExpanded && (
                <div className='px-4 pb-4 border-t border-gray-200 bg-gray-50'>
                  <div className='pt-3 space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>MON:</span>
                      <span className='text-gray-800 font-medium'>{clinic.schedule.monday}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>TUE:</span>
                      <span className='text-gray-800 font-medium'>{clinic.schedule.tuesday}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>WED:</span>
                      <span className='text-gray-800 font-medium'>{clinic.schedule.wednesday}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>THU:</span>
                      <span className='text-gray-800 font-medium'>{clinic.schedule.thursday}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>FRI:</span>
                      <span className='text-gray-800 font-medium'>{clinic.schedule.friday}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>SAT & SUN:</span>
                      <span className='text-gray-800 font-medium'>{clinic.schedule.saturday}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ClinicsAvailability

