import React from 'react'
import Hero from '../components/Home/Hero'
import VideoSection from '../components/Home/VideoSection'
import Subjects from '../components/Home/Subjects'
import Reviews from '../components/Home/Reviews'
import Feautures from '../components/Home/Feautures'
import Fotter from '../components/Fotter'
import Navbar from '../components/Navbar'
export default function Home() {
  return (
   <>
   <Navbar/>
    <div  className=''>
      <div className='h-[100px]'></div>
      <Hero/>
      <VideoSection/>
      <Subjects/>
      <Reviews/>
      <Feautures/>
      <Fotter/>
    </div>
   </>
  )
}
