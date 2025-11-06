import React from 'react'
import Services from '../components/Services'
import TopDoctors from '../components/TopDoctors'
import Categories from '../components/Categories'
import Banner from '../components/Banner'
import HowItWorks from '../components/HowItWorks'

const Home = () => {
  return (
    <div>
      <Services />
      <Categories />
      <TopDoctors />
      <HowItWorks/>
      <Banner />
    </div>
  )
}
export default Home