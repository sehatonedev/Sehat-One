import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
  UserCircle,
  Pencil,
  Check,
  X,
  Envelope,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  CurrencyCircleDollar,
  ToggleLeft,
  ToggleRight
} from 'phosphor-react'

const Profile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    setIsLoading(true)
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!profileData) {
    return (
      <div className="m-5 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5F6FFF] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-1">Manage your profile information</p>
        </div>
        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md"
          >
            <Pencil size={20} weight="bold" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profileData.image || 'https://via.placeholder.com/150'}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg mx-auto"
                />
                {isEdit && (
                  <button className="absolute bottom-0 right-0 p-2 bg-[#5F6FFF] text-white rounded-full hover:bg-[#4F5FEF] transition-colors shadow-md">
                    <Pencil size={16} weight="bold" />
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">{profileData.name}</h2>
              <p className="text-gray-600 mt-1">{profileData.degree}</p>
              <p className="text-sm text-gray-500 mt-1">{profileData.speciality}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Availability</span>
                  {isEdit ? (
                    <button
                      onClick={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
                      className="text-2xl"
                    >
                      {profileData.available ? (
                        <ToggleRight size={32} className="text-green-600" weight="fill" />
                      ) : (
                        <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                      )}
                    </button>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      profileData.available
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {profileData.available ? 'Available' : 'Unavailable'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Envelope size={16} className="inline mr-2 text-[#5F6FFF]" />
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CurrencyCircleDollar size={16} className="inline mr-2 text-[#5F6FFF]" />
                  Consultation Fee
                </label>
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    {currency} {profileData.fees || '0'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap size={16} className="inline mr-2 text-[#5F6FFF]" />
                  Degree
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                  {profileData.degree || 'Not specified'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={16} className="inline mr-2 text-[#5F6FFF]" />
                  Experience
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                  {profileData.experience || 'Not specified'}
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin size={24} className="text-[#5F6FFF]" weight="duotone" />
              Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address?.line1 || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    {profileData.address?.line1 || 'Not specified'}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address?.line2 || ''}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    {profileData.address?.line2 || 'Not specified'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">About</h3>
            {isEdit ? (
              <textarea
                value={profileData.about || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">
                {profileData.about || 'No description available'}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          {isEdit && (
            <div className="flex items-center gap-4">
              <button
                onClick={updateProfile}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={20} weight="bold" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEdit(false)
                  getProfileData() // Reset to original data
                }}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <X size={20} weight="bold" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

