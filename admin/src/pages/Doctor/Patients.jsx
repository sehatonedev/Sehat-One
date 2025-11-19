import React, { useState } from 'react'
import {
  UserPlus,
  MagnifyingGlass,
  User,
  Phone,
  Envelope,
  Calendar,
  FileText,
  Eye
} from 'phosphor-react'

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with actual API call
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      image: 'https://via.placeholder.com/60',
      age: 35,
      gender: 'Male',
      lastVisit: '15 Jan 2024',
      totalAppointments: 5,
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      image: 'https://via.placeholder.com/60',
      age: 28,
      gender: 'Female',
      lastVisit: '12 Jan 2024',
      totalAppointments: 3,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 234 567 8902',
      image: 'https://via.placeholder.com/60',
      age: 42,
      gender: 'Male',
      lastVisit: '10 Jan 2024',
      totalAppointments: 8,
      status: 'active'
    }
  ]

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">View and manage all your patients</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{patients.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserPlus size={28} className="text-blue-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <User size={28} className="text-green-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {patients.reduce((sum, p) => sum + p.totalAppointments, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar size={28} className="text-purple-600" weight="duotone" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="relative">
          <MagnifyingGlass size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-16">
            <UserPlus size={64} className="text-gray-300 mx-auto mb-4" weight="duotone" />
            <p className="text-gray-500 font-medium text-lg">No patients found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={patient.image}
                      alt={patient.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Envelope size={16} className="text-[#5F6FFF]" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone size={16} className="text-[#5F6FFF]" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User size={16} className="text-[#5F6FFF]" />
                          <span>{patient.age} years, {patient.gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient Stats */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-[#5F6FFF]" weight="duotone" />
                      <span>Last Visit: {patient.lastVisit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText size={16} className="text-[#5F6FFF]" weight="duotone" />
                      <span>{patient.totalAppointments} Appointments</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium text-sm flex items-center gap-2">
                      <Eye size={18} weight="bold" />
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Patients

