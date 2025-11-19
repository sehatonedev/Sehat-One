import React, { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  DownloadSimple,
  FunnelSimple,
  MagnifyingGlass,
  Pill,
  Plus,
  UploadSimple,
  VideoCamera,
  MapPin
} from 'phosphor-react'
import AttachmentPreview from '../../components/doctorComp/Prescription/AttachmentPreview'

const samplePrescriptions = [
  {
    id: 'PR-24001',
    patient: {
      name: 'Amina Khan',
      age: 32,
      gender: 'Female',
      email: 'amina.khan@example.com',
      image: 'https://i.pravatar.cc/150?img=47'
    },
    visitDate: '2025-02-15',
    followUpDate: '2025-02-28',
    diagnosis: 'Acute Bronchitis',
    consultationType: 'Video Consultation',
    status: 'pending',
    medications: [
      { name: 'Azithromycin 500mg', dosage: '1 tablet', frequency: 'Once daily', duration: '5 days' },
      { name: 'Cough Syrup', dosage: '10ml', frequency: 'Thrice daily', duration: '7 days' }
    ],
    instructions: 'Drink plenty of warm fluids and rest. Use humidifier at night.',
    patientUploads: [
      { name: 'Lungs_Xray.pdf', type: 'pdf', size: 320000 },
      { name: 'Allergy_Report.jpg', type: 'image', size: 210000 }
    ],
    doctorUploads: [
      { name: 'Prescription_V1.pdf', type: 'pdf', size: 180000 }
    ]
  },
  {
    id: 'PR-24002',
    patient: {
      name: 'Sanjay Patel',
      age: 45,
      gender: 'Male',
      email: 'sanjay.patel@example.com',
      image: 'https://i.pravatar.cc/150?img=12'
    },
    visitDate: '2025-02-12',
    followUpDate: '2025-02-20',
    diagnosis: 'Hypertension Management',
    consultationType: 'In-person',
    status: 'completed',
    medications: [
      { name: 'Amlodipine 5mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' },
      { name: 'Aspirin 75mg', dosage: '1 tablet', frequency: 'Once daily', duration: '30 days' }
    ],
    instructions: 'Monitor BP twice daily. Reduce salt intake and follow DASH diet.',
    patientUploads: [
      { name: 'BP_Log.xlsx', type: 'doc', size: 98000 }
    ],
    doctorUploads: [
      { name: 'DietPlan.pdf', type: 'pdf', size: 140000 },
      { name: 'Prescription_Final.pdf', type: 'pdf', size: 175000 }
    ]
  },
  {
    id: 'PR-24003',
    patient: {
      name: 'Lara Sebastian',
      age: 27,
      gender: 'Female',
      email: 'lara.sebastian@example.com',
      image: 'https://i.pravatar.cc/150?img=65'
    },
    visitDate: '2025-02-10',
    followUpDate: '2025-02-24',
    diagnosis: 'Migraine with aura',
    consultationType: 'In-person',
    status: 'pending',
    medications: [
      { name: 'Sumatriptan 50mg', dosage: '1 tablet', frequency: 'As needed', duration: '—' },
      { name: 'Magnesium Supplement', dosage: '250mg', frequency: 'Once daily', duration: '30 days' }
    ],
    instructions: 'Maintain headache diary. Avoid trigger foods and practice relaxation.',
    patientUploads: [],
    doctorUploads: [
      { name: 'MigraineGuide.pdf', type: 'pdf', size: 110000 }
    ]
  }
]

const statusClasses = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  completed: 'bg-emerald-100 text-emerald-700 border border-emerald-200'
}

const statusLabels = {
  pending: 'Pending Review',
  completed: 'Completed'
}

const PrescriptionAll = () => {
  const navigate = useNavigate()
  const [prescriptions, setPrescriptions] = useState(samplePrescriptions)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const uploadRefs = useRef({})

  const stats = useMemo(() => ({
    total: prescriptions.length,
    pending: prescriptions.filter(item => item.status === 'pending').length,
    completed: prescriptions.filter(item => item.status === 'completed').length
  }), [prescriptions])

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(item => {
      const matchStatus = statusFilter === 'all' || item.status === statusFilter
      const matchSearch =
        item.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      return matchStatus && matchSearch
    })
  }, [prescriptions, statusFilter, searchTerm])

  const handleUploadClick = (id) => {
    if (uploadRefs.current[id]) {
      uploadRefs.current[id].click()
    }
  }

  const handleDoctorUpload = (id, files) => {
    if (!files || files.length === 0) return
    const uploadedFiles = Array.from(files).map(file => ({
      name: file.name,
      type: file.type.includes('pdf')
        ? 'pdf'
        : file.type.includes('image')
        ? 'image'
        : 'doc',
      size: file.size,
      uploadedOn: new Date().toISOString()
    }))

    setPrescriptions(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, doctorUploads: [...item.doctorUploads, ...uploadedFiles] }
          : item
      )
    )
  }

  const markCompleted = (id) => {
    setPrescriptions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'completed' } : item
      )
    )
  }

  const renderMedication = (med) => (
    <div key={`${med.name}-${med.dosage}`} className='flex flex-col bg-white border border-gray-100 rounded-lg p-3 shadow-sm'>
      <p className='font-semibold text-gray-900'>{med.name}</p>
      <p className='text-sm text-gray-600'>{med.dosage}</p>
      <p className='text-xs text-gray-400'>{med.frequency} • {med.duration}</p>
    </div>
  )

  return (
    <div className='m-5 space-y-6'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Prescriptions</h1>
          <p className='text-gray-500 mt-1'>Review, download and add prescriptions shared with patients</p>
        </div>
        <button
          onClick={() => navigate('/prescription/create')}
          className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5F6FFF] text-white font-semibold shadow-lg shadow-[#5F6FFF]/30 hover:shadow-[#5F6FFF]/40 transition-all'
        >
          <Plus size={18} weight='bold' />
          Create Prescription
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='bg-white border border-gray-200 rounded-2xl p-5 shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>Total</p>
            <CalendarBlank size={20} className='text-[#5F6FFF]' />
          </div>
          <h3 className='text-3xl font-bold text-gray-900 mt-3'>{stats.total}</h3>
          <p className='text-xs text-gray-400 mt-1'>All prescriptions</p>
        </div>
        <div className='bg-white border border-gray-200 rounded-2xl p-5 shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>Pending</p>
            <Clock size={20} className='text-amber-500' />
          </div>
          <h3 className='text-3xl font-bold text-gray-900 mt-3'>{stats.pending}</h3>
          <p className='text-xs text-gray-400 mt-1'>Awaiting completion</p>
        </div>
        <div className='bg-white border border-gray-200 rounded-2xl p-5 shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>Completed</p>
            <CheckCircle size={20} className='text-emerald-500' />
          </div>
          <h3 className='text-3xl font-bold text-gray-900 mt-3'>{stats.completed}</h3>
          <p className='text-xs text-gray-400 mt-1'>Shared with patient</p>
        </div>
      </div>

      <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4'>
        <div className='flex flex-wrap items-center gap-3'>
          {['all', 'pending', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                statusFilter === status
                  ? 'bg-[#5F6FFF] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : statusLabels[status]}
            </button>
          ))}
          <div className='ml-auto flex items-center gap-2 text-sm text-gray-500'>
            <FunnelSimple size={18} />
            Advanced filters coming soon
          </div>
        </div>
        <div className='relative'>
          <MagnifyingGlass size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search by patient, email, diagnosis...'
            className='w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none'
          />
        </div>
      </div>

      <div className='space-y-5'>
        {filteredPrescriptions.map((item) => (
          <div key={item.id} className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5'>
            <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
              <div className='flex items-center gap-4 flex-1'>
                <img
                  src={item.patient.image}
                  alt={item.patient.name}
                  className='w-16 h-16 rounded-2xl object-cover border border-gray-200'
                />
                <div>
                  <div className='flex items-center gap-3'>
                    <h3 className='text-lg font-semibold text-gray-900'>{item.patient.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[item.status]}`}>
                      {statusLabels[item.status]}
                    </span>
                  </div>
                  <p className='text-sm text-gray-500'>{item.patient.email}</p>
                  <p className='text-xs text-gray-400'>ID: {item.id}</p>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-3 text-sm text-gray-500'>
                <div className='flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl'>
                  <CalendarBlank size={16} className='text-[#5F6FFF]' />
                  <span>
                    Visit{' '}
                    <strong className='text-gray-900'>
                      {new Date(item.visitDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </strong>
                  </span>
                </div>
                <div className='flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl'>
                  <CalendarBlank size={16} className='text-emerald-500' />
                  <span>
                    Follow-up{' '}
                    <strong className='text-gray-900'>
                      {new Date(item.followUpDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                    </strong>
                  </span>
                </div>
                <div className='flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl'>
                  {item.consultationType.includes('Video') ? (
                    <VideoCamera size={16} className='text-purple-500' />
                  ) : (
                    <MapPin size={16} className='text-rose-500' />
                  )}
                  <span>{item.consultationType}</span>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <div className='lg:col-span-2 space-y-3'>
                <div className='p-4 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white'>
                  <p className='text-xs font-semibold text-gray-400 uppercase'>Diagnosis</p>
                  <p className='text-lg font-semibold text-gray-900 mt-1'>{item.diagnosis}</p>
                  <p className='text-sm text-gray-500 mt-2'>{item.instructions}</p>
                </div>

                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <Pill size={18} className='text-[#5F6FFF]' />
                    <h4 className='text-sm font-semibold text-gray-700'>Medications</h4>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {item.medications.map(renderMedication)}
                  </div>
                </div>
              </div>
              <div className='space-y-3'>
                <AttachmentPreview title='Patient uploads' subtitle='Reports shared by patient' files={item.patientUploads} />
                <AttachmentPreview title='Doctor uploads' subtitle='Files you shared' files={item.doctorUploads} />
                <input
                  type='file'
                  hidden
                  multiple
                  ref={(ref) => (uploadRefs.current[item.id] = ref)}
                  onChange={(e) => {
                    handleDoctorUpload(item.id, e.target.files)
                    e.target.value = ''
                  }}
                />
                <button
                  onClick={() => handleUploadClick(item.id)}
                  className='w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50'
                >
                  <UploadSimple size={18} />
                  Add to doctor uploads
                </button>
              </div>
            </div>

            <div className='flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100'>
              <div className='text-sm text-gray-500'>
                Last updated{' '}
                <strong className='text-gray-900'>
                  {new Date(item.visitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </strong>
              </div>
              <div className='flex flex-wrap items-center gap-3'>
                <button className='px-4 py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2'>
                  <DownloadSimple size={18} />
                  Download PDF
                </button>
                {item.status === 'pending' && (
                  <button
                    onClick={() => markCompleted(item.id)}
                    className='px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 shadow-sm hover:bg-emerald-600'
                  >
                    <CheckCircle size={18} weight='bold' />
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredPrescriptions.length === 0 && (
          <div className='bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-500'>
            <p className='font-semibold text-lg'>No prescriptions match this filter</p>
            <p className='text-sm text-gray-400 mt-2'>Try adjusting the status or search keywords</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PrescriptionAll


