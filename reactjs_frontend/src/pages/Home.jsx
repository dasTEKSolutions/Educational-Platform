import React from 'react'
import Hero from '../components/home/Hero'
import VideoSection from '../components/home/VideoSection'
import Subjects from '../components/home/Subjects'
import Reviews from '../components/home/Reviews'
import Feautures from '../components/home/Feautures'
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
