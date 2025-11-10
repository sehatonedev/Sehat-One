import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
<<<<<<< HEAD
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-base'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-7 text-base sm:text-lg'>Comprehensive healthcare services at your fingertips. Book appointments, consult with expert doctors, and manage your health seamlessly.</p>
        </div>

        <div>
          <p className='text-xl sm:text-2xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-base sm:text-lg'>
=======
    <div className="w-full px-4 sm:px-10 bg-white">

      <div className="flex flex-col sm:grid grid-cols-3 gap-5 py-5">

        <div>
          <img className="mb-4 w-32 sm:w-40" src={assets.logo} alt="" />
          <p className="text-gray-600 leading-6 text-sm sm:text-base max-w-md">
            Comprehensive healthcare services at your fingertips. Book appointments, consult with expert doctors, and manage your health seamlessly.
          </p>
        </div>

        <div>
          <p className="text-lg sm:text-xl font-semibold mb-3">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 text-sm sm:text-base">
>>>>>>> 7d9f544 (third commit)
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
<<<<<<< HEAD
          <p className='text-xl sm:text-2xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-base sm:text-lg'>
=======
          <p className="text-lg sm:text-xl font-semibold mb-3">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 text-sm sm:text-base">
>>>>>>> 7d9f544 (third commit)
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

<<<<<<< HEAD
      <div>
        <hr />
        <p className='py-5 text-base sm:text-lg text-center'>Copyright 2025 @ SehatOne.com - All Right Reserved.</p>
      </div>
=======
      <hr />
      <p className="py-4 text-center text-sm sm:text-base text-gray-700">
        Copyright 2025 @ SehatOne.com - All Rights Reserved.
      </p>
>>>>>>> 7d9f544 (third commit)

    </div>
  )
}

export default Footer
