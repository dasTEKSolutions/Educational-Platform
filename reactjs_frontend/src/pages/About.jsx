import React from 'react'
import Navbar from '../components/Navbar'
import Whatis from '../components/About/Whatis'
import Problems from '../components/About/Problems'
import DasTEk from '../components/About/DasTEk'
import OurVision from '../components/About/OurVision'

export default function About() {
  return (
    <div className='bg'>
    <Navbar/>
    <div className='h-[100px]'></div>
    <Whatis/>
    <Problems/>
    <OurVision/>
    <DasTEk/>
    </div>
  )
}
