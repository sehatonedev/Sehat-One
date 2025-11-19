import React, { useState } from 'react'
import {
  Gear,
  Bell,
  Lock,
  Shield,
  Eye,
  EyeSlash,
  CheckCircle,
  ToggleLeft,
  ToggleRight
} from 'phosphor-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // General Settings
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    prescriptionAlerts: true,
    labTestResults: true,
    
    // Security Settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (section) => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert(`${section} settings saved successfully!`)
    }, 1000)
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Gear },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ]

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#F2F3FF] border-r-4 border-[#5F6FFF] text-[#5F6FFF]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={20} weight={activeTab === tab.id ? 'bold' : 'regular'} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">General Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="IST">Indian Standard Time (IST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => handleSave('General')}
                disabled={isSaving}
                className="px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                    className="text-2xl"
                  >
                    {settings.emailNotifications ? (
                      <ToggleRight size={32} className="text-green-600" weight="fill" />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, smsNotifications: !prev.smsNotifications }))}
                    className="text-2xl"
                  >
                    {settings.smsNotifications ? (
                      <ToggleRight size={32} className="text-green-600" weight="fill" />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Appointment Reminders</h3>
                    <p className="text-sm text-gray-500">Get reminded about upcoming appointments</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, appointmentReminders: !prev.appointmentReminders }))}
                    className="text-2xl"
                  >
                    {settings.appointmentReminders ? (
                      <ToggleRight size={32} className="text-green-600" weight="fill" />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Prescription Alerts</h3>
                    <p className="text-sm text-gray-500">Notifications for prescription requests</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, prescriptionAlerts: !prev.prescriptionAlerts }))}
                    className="text-2xl"
                  >
                    {settings.prescriptionAlerts ? (
                      <ToggleRight size={32} className="text-green-600" weight="fill" />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Lab Test Results</h3>
                    <p className="text-sm text-gray-500">Notifications when lab test results are ready</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, labTestResults: !prev.labTestResults }))}
                    className="text-2xl"
                  >
                    {settings.labTestResults ? (
                      <ToggleRight size={32} className="text-green-600" weight="fill" />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleSave('Notification')}
                disabled={isSaving}
                className="px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <Shield size={24} className="text-[#5F6FFF]" weight="duotone" />
                Security Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={settings.currentPassword}
                      onChange={(e) => setSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={settings.newPassword}
                      onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={settings.confirmPassword}
                      onChange={(e) => setSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F6FFF] focus:border-transparent outline-none"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                    className="text-2xl"
                  >
                    {settings.twoFactorAuth ? (
                      <ToggleRight size={32} className="text-green-600" weight="fill" />
                    ) : (
                      <ToggleLeft size={32} className="text-gray-400" weight="fill" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleSave('Security')}
                disabled={isSaving || !settings.currentPassword || !settings.newPassword || settings.newPassword !== settings.confirmPassword}
                className="px-6 py-3 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4F5FEF] transition-colors font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Update Password'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings

