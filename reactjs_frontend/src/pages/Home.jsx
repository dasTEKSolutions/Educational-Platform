import React from 'react'
import Hero from '../components/Home/Hero'
import Feautures from '../components/Home/Feautures'
import UseCases from '../components/Home/UseCases'
import Institutes from '../components/Home/Institutes'
import CTA from '../components/Home/CTA'
import Navbar from '../components/Navbar'

export default function () {
  return (
    <>
     <Navbar/>
     <Hero/>
     <Feautures/>
     <UseCases/>
     <Institutes/>
     <CTA/>
    </>
  )
}
