import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Flask,
  ArrowLeft,
  User,
  FileText,
  Calendar,
  Clock,
  X,
  CheckCircle
} from 'phosphor-react'

const LabTestRequest = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    testName: '',
    testType: 'routine',
    priority: 'normal',
    notes: '',
    requestedDate: '',
    requestedTime: ''
  })

  const [selectedPatient, setSelectedPatient] = useState(null)

  // Mock patients list - replace with actual API call
  const patients = [
    { id: 1, name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', image: 'https://via.placeholder.com/50' }
  ]

  const commonTests = [
    'Complete Blood Count (CBC)',
    'Lipid Profile',
    'Blood Sugar (Fasting)',
    'Blood Sugar (Post Prandial)',
    'Liver Function Test (LFT)',
    'Kidney Function Test (KFT)',
    'Thyroid Function Test (TFT)',
    'Vitamin D',
    'Vitamin B12',
    'HbA1c',
    'ECG',
    'X-Ray Chest',
    'Ultrasound Abdomen'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setFormData(prev => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lab Test Request:', formData)
    // Add API call here
    alert('Lab test request submitted successfully!')
    navigate('/lab-test/all')
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/lab-test/all')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Request Lab Test</h1>
          <p className="text-gray-500 mt-1">Create a new lab test request for a patient</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Selection */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User size={24} className="text-[#5F6FFF]" weight="duotone" />
                Select Patient
              </h2>
              
              {!selectedPatient ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => handlePatientSelect(patient)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <img
                        src={patient.image}
                        alt={patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPatient.image}
                      alt={selectedPatient.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{selectedPatient.name}</p>
                      <p className="text-sm text-gray-600">{selectedPatient.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatient(null)
                      setFormData(prev => ({ ...prev, patientId: '', patientName: '' }))
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Test Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Flask size={24} className="text-[#5F6FFF]" weight="duotone" />
                Test Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Name *
                  </label>
                  <input
                    type="text"
                    name="testName"
                    value={formData.testName}
                    onChange={handleInputChange}
                    list="commonTests"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                    placeholder="Enter test name or select from common tests"
                  />
                  <datalist id="commonTests">
                    {commonTests.map((test, index) => (
                      <option key={index} value={test} />
                    ))}
                  </datalist>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Type
                    </label>
                    <select
                      name="testType"
                      value={formData.testType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                    >
                      <option value="routine">Routine</option>
                      <option value="urgent">Urgent</option>
                      <option value="stat">STAT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requested Date *
                    </label>
                    <input
                      type="date"
                      name="requestedDate"
                      value={formData.requestedDate}
                      onChange={handleInputChange}
                      min={getTodayDate()}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requested Time *
                    </label>
                    <input
                      type="time"
                      name="requestedTime"
                      value={formData.requestedTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                    placeholder="Add any special instructions or notes..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {selectedPatient ? selectedPatient.name : 'Not selected'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Test Name</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {formData.testName || 'Not specified'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="font-medium text-gray-900 mt-1 capitalize">
                    {formData.priority}
                  </p>
                </div>

                {formData.requestedDate && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Requested Date & Time</p>
                    <p className="font-medium text-gray-900 mt-1">
                      {new Date(formData.requestedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      {formData.requestedTime && ` at ${formData.requestedTime}`}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={!selectedPatient || !formData.testName || !formData.requestedDate || !formData.requestedTime}
                  className="w-full px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} weight="bold" />
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/lab-test/all')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LabTestRequest

