import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Flask,
  MagnifyingGlass,
  Plus,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download
} from 'phosphor-react'

const LabTestAll = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // all, pending, completed, cancelled

  // Mock data - replace with actual API call
  const labTests = [
    {
      id: 1,
      patientName: 'John Doe',
      patientImage: 'https://via.placeholder.com/50',
      testName: 'Complete Blood Count (CBC)',
      requestedDate: '15 Jan 2024',
      requestedTime: '10:30 AM',
      status: 'pending',
      priority: 'normal',
      notes: 'Routine checkup'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientImage: 'https://via.placeholder.com/50',
      testName: 'Lipid Profile',
      requestedDate: '14 Jan 2024',
      requestedTime: '02:15 PM',
      status: 'completed',
      priority: 'urgent',
      notes: 'Follow-up test',
      resultUrl: '#',
      completedDate: '16 Jan 2024'
    },
    {
      id: 3,
      patientName: 'Mike Johnson',
      patientImage: 'https://via.placeholder.com/50',
      testName: 'Blood Sugar (Fasting)',
      requestedDate: '13 Jan 2024',
      requestedTime: '09:00 AM',
      status: 'cancelled',
      priority: 'normal',
      notes: 'Patient requested cancellation'
    }
  ]

  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.testName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: labTests.length,
    pending: labTests.filter(t => t.status === 'pending').length,
    completed: labTests.filter(t => t.status === 'completed').length,
    cancelled: labTests.filter(t => t.status === 'cancelled').length
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
            <Clock size={14} weight="fill" />
            Pending
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            <CheckCircle size={14} weight="fill" />
            Completed
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
            <XCircle size={14} weight="fill" />
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority) => {
    if (priority === 'urgent') {
      return (
        <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
          Urgent
        </span>
      )
    }
    return (
      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
        Normal
      </span>
    )
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lab Tests</h1>
          <p className="text-gray-500 mt-1">Manage and track all lab test requests</p>
        </div>
        <button
          onClick={() => navigate('/lab-test/request')}
          className="flex items-center gap-2 px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md"
        >
          <Plus size={20} weight="bold" />
          Request Lab Test
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Tests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Flask size={28} className="text-blue-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock size={28} className="text-yellow-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle size={28} className="text-green-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Cancelled</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.cancelled}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle size={28} className="text-red-600" weight="duotone" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'pending'
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'completed'
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Completed ({stats.completed})
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'cancelled'
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Cancelled ({stats.cancelled})
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlass size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or test name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Lab Tests List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredTests.length === 0 ? (
          <div className="text-center py-16">
            <Flask size={64} className="text-gray-300 mx-auto mb-4" weight="duotone" />
            <p className="text-gray-500 font-medium text-lg">No lab tests found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchTerm ? 'Try adjusting your search terms' : 'No lab tests match the selected filter'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTests.map((test) => (
              <div key={test.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={test.patientImage}
                      alt={test.patientName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{test.patientName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.testName}</p>
                      {test.notes && (
                        <p className="text-xs text-gray-500 mt-1">{test.notes}</p>
                      )}
                    </div>
                  </div>

                  {/* Test Details */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-[#5F6FFF]" weight="duotone" />
                      <span>{test.requestedDate} at {test.requestedTime}</span>
                    </div>
                    {test.completedDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-600" weight="duotone" />
                        <span>Completed: {test.completedDate}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(test.priority)}
                      {getStatusBadge(test.status)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {test.status === 'completed' && test.resultUrl && (
                      <>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Results">
                          <Eye size={20} />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download Results">
                          <Download size={20} />
                        </button>
                      </>
                    )}
                    {test.status === 'pending' && (
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                        Cancel Request
                      </button>
                    )}
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

export default LabTestAll

