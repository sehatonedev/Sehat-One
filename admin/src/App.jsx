import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'

// Admin Pages
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import Appointments from './pages/Doctor/Appointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import Profile from './pages/Doctor/Profile'
import Calendar from './pages/Doctor/Calendar'
import PrescriptionAll from './pages/Doctor/PrescriptionAll'
import PrescriptionCreate from './pages/Doctor/PrescriptionCreate'
import LabTestAll from './pages/Doctor/LabTestAll'
import LabTestRequest from './pages/Doctor/LabTestRequest'
import Patients from './pages/Doctor/Patients'
import Requests from './pages/Doctor/Requests'
import Review from './pages/Doctor/Review'
import Settings from './pages/Doctor/Settings'

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const isAuthenticated = Boolean(dToken || aToken)

  return isAuthenticated ? (
    <div className='bg-[#F8F9FD] min-h-screen'>
      <ToastContainer />
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1'>
          <Routes>
            {/* Admin Routes */}
            {aToken && (
              <>
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorsList />} />
                <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
              </>
            )}
            
            {/* Doctor Routes */}
            {dToken && (
              <>
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-appointments" element={<Appointments />} />
                <Route path="/doctor-appointments/upcoming" element={<Appointments />} />
                <Route path="/doctor-appointments/past" element={<Appointments />} />
                <Route path="/doctor-profile" element={<Profile />} />
                <Route path="/prescription/all" element={<PrescriptionAll />} />
                <Route path="/prescription/create" element={<PrescriptionCreate />} />
                <Route path="/lab-test/all" element={<LabTestAll />} />
                <Route path="/lab-test/request" element={<LabTestRequest />} />
                <Route path="/patients/all" element={<Patients />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/review" element={<Review />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/" element={<Navigate to="/doctor-dashboard" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App