import React, { useState } from 'react'
import {
  CalendarBlank,
  ClipboardText,
  FirstAid,
  FloppyDisk,
  ListPlus,
  Pill,
  Plus,
  UploadSimple
} from 'phosphor-react'
import AttachmentPreview from '../../components/doctorComp/Prescription/AttachmentPreview'

const patients = [
  { id: 'PT-01', name: 'Amina Khan', email: 'amina.khan@example.com' },
  { id: 'PT-02', name: 'Sanjay Patel', email: 'sanjay.patel@example.com' },
  { id: 'PT-03', name: 'Lara Sebastian', email: 'lara.sebastian@example.com' }
]

const initialMedication = { name: '', dosage: '', frequency: '', duration: '' }

const PrescriptionCreate = () => {
  const [formData, setFormData] = useState({
    patientId: patients[0].id,
    consultationType: 'In-person',
    visitDate: '',
    followUpDate: '',
    diagnosis: '',
    symptoms: '',
    instructions: '',
    medications: [{ ...initialMedication }]
  })

  const [doctorUploads, setDoctorUploads] = useState([])
  const patientUploads = [
    { name: 'BloodWork.pdf', type: 'pdf', size: 200000 },
    { name: 'MedicationHistory.docx', type: 'doc', size: 150000 }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMedicationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, medIndex) =>
        medIndex === index ? { ...med, [field]: value } : med
      )
    }))
  }

  const addMedicationRow = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { ...initialMedication }]
    }))
  }

  const removeMedicationRow = (index) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, medIndex) => medIndex !== index)
    }))
  }

  const handleDoctorUpload = (files) => {
    if (!files || files.length === 0) return
    const uploads = Array.from(files).map(file => ({
      name: file.name,
      type: file.type.includes('pdf')
        ? 'pdf'
        : file.type.includes('image')
        ? 'image'
        : 'doc',
      size: file.size
    }))
    setDoctorUploads(prev => [...prev, ...uploads])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Prescription saved', formData, doctorUploads)
  }

  return (
    <form className='m-5 space-y-6' onSubmit={handleSubmit}>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Create Prescription</h1>
          <p className='text-gray-500 mt-1'>Fill all required fields and share with patient instantly</p>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <button
            type='button'
            className='inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50'
          >
            <ClipboardText size={18} />
            Preview
          </button>
          <button
            type='submit'
            className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5F6FFF] text-white font-semibold shadow-lg shadow-[#5F6FFF]/30 hover:shadow-[#5F6FFF]/40'
          >
            <FloppyDisk size={18} weight='bold' />
            Save & Share
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <div className='xl:col-span-2 space-y-6'>
          <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4'>
            <div className='flex items-center gap-2'>
              <FirstAid size={20} className='text-[#5F6FFF]' />
              <h2 className='text-lg font-semibold text-gray-900'>Patient & Visit</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <label className='text-sm font-semibold text-gray-700'>Patient</label>
                <select
                  value={formData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent'
                >
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} • {patient.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-semibold text-gray-700'>Consultation Type</label>
                <div className='grid grid-cols-2 gap-3'>
                  {['In-person', 'Video'].map((type) => (
                    <button
                      type='button'
                      key={type}
                      onClick={() => handleInputChange('consultationType', type)}
                      className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        formData.consultationType === type
                          ? 'border-[#5F6FFF] text-[#5F6FFF] bg-[#F4F5FF]'
                          : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                  <CalendarBlank size={16} />
                  Visit Date
                </label>
                <input
                  type='date'
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange('visitDate', e.target.value)}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent'
                />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                  <CalendarBlank size={16} />
                  Follow-up Date
                </label>
                <input
                  type='date'
                  value={formData.followUpDate}
                  onChange={(e) => handleInputChange('followUpDate', e.target.value)}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent'
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4'>
            <div className='flex items-center gap-2'>
              <ClipboardText size={20} className='text-[#5F6FFF]' />
              <h2 className='text-lg font-semibold text-gray-900'>Diagnosis & Notes</h2>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-semibold text-gray-700'>Diagnosis Summary</label>
              <textarea
                rows='3'
                value={formData.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                placeholder='Describe diagnosis, severity and findings...'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-semibold text-gray-700'>Symptoms & Observations</label>
              <textarea
                rows='3'
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                placeholder='Highlight key symptoms, vitals and physical observations...'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-semibold text-gray-700'>Advice & Instructions</label>
              <textarea
                rows='3'
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                placeholder='Diet, lifestyle changes, special instructions...'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent'
              />
            </div>
          </div>

          <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Pill size={20} className='text-[#5F6FFF]' />
                <h2 className='text-lg font-semibold text-gray-900'>Medications</h2>
              </div>
              <button
                type='button'
                onClick={addMedicationRow}
                className='inline-flex items-center gap-2 text-sm font-semibold text-[#5F6FFF]'
              >
                <ListPlus size={18} />
                Add Medicine
              </button>
            </div>

            <div className='space-y-4'>
              {formData.medications.map((med, index) => (
                <div key={index} className='border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='space-y-1.5'>
                      <label className='text-xs font-semibold text-gray-500'>Medicine Name</label>
                      <input
                        type='text'
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                        placeholder='e.g. Azithromycin 500mg'
                        className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-[#5F6FFF]'
                        required
                      />
                    </div>
                    <div className='space-y-1.5'>
                      <label className='text-xs font-semibold text-gray-500'>Dosage</label>
                      <input
                        type='text'
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                        placeholder='1 tablet'
                        className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-[#5F6FFF]'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='space-y-1.5'>
                      <label className='text-xs font-semibold text-gray-500'>Frequency</label>
                      <input
                        type='text'
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                        placeholder='Once daily'
                        className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-[#5F6FFF]'
                      />
                    </div>
                    <div className='space-y-1.5'>
                      <label className='text-xs font-semibold text-gray-500'>Duration</label>
                      <input
                        type='text'
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                        placeholder='5 days'
                        className='w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-[#5F6FFF]'
                      />
                    </div>
                  </div>
                  {formData.medications.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeMedicationRow(index)}
                      className='text-xs font-semibold text-red-500'
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4'>
            <h2 className='text-lg font-semibold text-gray-900'>Uploads & Reports</h2>
            <AttachmentPreview title='Patient uploads' subtitle='Files shared before consultation' files={patientUploads} />
            <AttachmentPreview title='Your uploads' subtitle='Attach prescription scans or templates' files={doctorUploads} />
            <label className='mt-2 flex flex-col items-center justify-center gap-3 border border-dashed border-gray-300 rounded-2xl py-8 cursor-pointer hover:bg-gray-50'>
              <UploadSimple size={32} className='text-gray-400' />
              <div className='text-center'>
                <p className='text-sm font-semibold text-gray-700'>Drag & drop or browse files</p>
                <p className='text-xs text-gray-400'>PDF, JPG, PNG up to 10MB</p>
              </div>
              <input type='file' className='hidden' multiple onChange={(e) => handleDoctorUpload(e.target.files)} />
            </label>
          </div>

          <div className='bg-gradient-to-br from-[#5F6FFF] to-[#7A8CFF] text-white rounded-2xl p-6 space-y-3 shadow-lg'>
            <p className='text-sm uppercase tracking-wide text-white/70'>Smart tip</p>
            <h3 className='text-xl font-semibold'>Automatic patient notification</h3>
            <p className='text-sm text-white/80'>
              Once you save and share, the patient receives an SMS & email with secure download link.
            </p>
            <ul className='text-sm text-white/80 list-disc list-inside space-y-1'>
              <li>Editable even after sharing</li>
              <li>Watermark + digital signature support</li>
              <li>Track patient downloads</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PrescriptionCreate


