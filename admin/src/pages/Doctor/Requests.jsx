import React, { useState } from 'react'
import {
  ChatCircle,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Eye
} from 'phosphor-react'

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // all, pending, approved, rejected

  // Mock data - replace with actual API call
  const requests = [
    {
      id: 1,
      patientName: 'John Doe',
      patientImage: 'https://via.placeholder.com/50',
      requestType: 'Appointment Reschedule',
      currentDate: '20 Jan 2024',
      currentTime: '10:00 AM',
      requestedDate: '25 Jan 2024',
      requestedTime: '02:00 PM',
      reason: 'Family emergency',
      status: 'pending',
      submittedDate: '15 Jan 2024'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientImage: 'https://via.placeholder.com/50',
      requestType: 'Prescription Refill',
      currentDate: '18 Jan 2024',
      currentTime: '11:30 AM',
      requestedDate: null,
      requestedTime: null,
      reason: 'Need refill for ongoing medication',
      status: 'approved',
      submittedDate: '12 Jan 2024'
    },
    {
      id: 3,
      patientName: 'Mike Johnson',
      patientImage: 'https://via.placeholder.com/50',
      requestType: 'Appointment Reschedule',
      currentDate: '22 Jan 2024',
      currentTime: '03:00 PM',
      requestedDate: '24 Jan 2024',
      requestedTime: '10:00 AM',
      reason: 'Work conflict',
      status: 'rejected',
      submittedDate: '10 Jan 2024'
    }
  ]

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
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
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            <CheckCircle size={14} weight="fill" />
            Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
            <XCircle size={14} weight="fill" />
            Rejected
          </span>
        )
      default:
        return null
    }
  }

  const handleApprove = (requestId) => {
    console.log('Approve request:', requestId)
    // Add API call here
  }

  const handleReject = (requestId) => {
    console.log('Reject request:', requestId)
    // Add API call here
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Requests</h1>
          <p className="text-gray-500 mt-1">Manage patient requests and approvals</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChatCircle size={28} className="text-blue-600" weight="duotone" />
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
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.approved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle size={28} className="text-green-600" weight="duotone" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.rejected}</p>
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
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'approved'
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Approved ({stats.approved})
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'rejected'
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Rejected ({stats.rejected})
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlass size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or request type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-16">
            <ChatCircle size={64} className="text-gray-300 mx-auto mb-4" weight="duotone" />
            <p className="text-gray-500 font-medium text-lg">No requests found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchTerm ? 'Try adjusting your search terms' : 'No requests match the selected filter'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={request.patientImage}
                      alt={request.patientName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
                      <p className="text-sm text-gray-600 mt-1 font-medium">{request.requestType}</p>
                      <p className="text-xs text-gray-500 mt-1">Submitted: {request.submittedDate}</p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex flex-col gap-2">
                    {request.requestedDate && (
                      <>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-[#5F6FFF]" weight="duotone" />
                          <span>Current: {request.currentDate} at {request.currentTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-green-600" weight="duotone" />
                          <span>Requested: {request.requestedDate} at {request.requestedTime}</span>
                        </div>
                      </>
                    )}
                    {request.reason && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <FileText size={16} className="text-[#5F6FFF] mt-0.5" weight="duotone" />
                        <span>{request.reason}</span>
                      </div>
                    )}
                    {getStatusBadge(request.status)}
                  </div>

                  {/* Actions */}
                  {request.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <CheckCircle size={18} weight="bold" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <XCircle size={18} weight="bold" />
                        Reject
                      </button>
                    </div>
                  )}
                  {request.status !== 'pending' && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-2">
                      <Eye size={18} />
                      View Details
                    </button>
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

export default Requests

