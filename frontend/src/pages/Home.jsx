import React from 'react'
import Services from '../components/Services'
import TopDoctors from '../components/TopDoctors'
import Categories from '../components/Categories'
import Banner from '../components/Banner'
import Topbar from '../components/Topbar'
import HowItWorks from '../components/HowItWorks'
import MyProfile from './MyProfile'

const Home = () => {
  return (
    <div>
      <Topbar/>
      <Services />
      <Categories />
      <TopDoctors />
      <HowItWorks/>
      <Banner />
    </div>
  )
}
export default Home