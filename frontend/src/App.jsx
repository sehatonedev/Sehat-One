import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Vc from './pages/Vc'
import Pods from './pages/Pods'
import Medicine from './pages/Medicine'
import LabTests from './pages/LabTests'
import UpcomingAppointmentDetails from "./pages/UpcomingAppointmentDetails";
import Bookings from './pages/Bookings'
import Records from './pages/Records'
// Commented out for future use in responsiveness
// import Topbar from './components/Topbar'

const App = () => {
  return (
   <div className="px-2 sm:px-4 md:px-6 pt-20 pb-10 w-full overflow-x-hidden">
      <ToastContainer />
      <Navbar />
      {/* Commented out for future use in responsiveness */}
      {/* <Topbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vc' element={<Vc />} />
        <Route path='/Pods' element={<Pods />} />
        <Route path='/Medicine' element={<Medicine />} />
        <Route path='/LabTests' element={<LabTests />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path="/appointment-details" element={<UpcomingAppointmentDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/records" element={<Records />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
