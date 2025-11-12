import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
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
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-lg sm:text-xl font-semibold mb-3">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 text-sm sm:text-base">
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className="py-4 text-center text-sm sm:text-base text-gray-700">
        Copyright 2025 @ SehatOne.com - All Rights Reserved.
      </p>

    </div>
  )
}

export default Footer
