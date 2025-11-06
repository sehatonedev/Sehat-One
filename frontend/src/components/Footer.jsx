import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-base'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-7 text-base sm:text-lg'>Comprehensive healthcare services at your fingertips. Book appointments, consult with expert doctors, and manage your health seamlessly.</p>
        </div>

        <div>
          <p className='text-xl sm:text-2xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-base sm:text-lg'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl sm:text-2xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600 text-base sm:text-lg'>
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-base sm:text-lg text-center'>Copyright 2025 @ SehatOne.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
