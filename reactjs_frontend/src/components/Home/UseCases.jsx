import React from 'react'
import Usecards from './Usecards'

export default function () {
  return (
    <>
        <section className='mx-6 mt-8'>
            <h3 id='text' className='text-4xl font-bold underline mx-5 h-12'>UseCases</h3>
            <p className=' mx-5 mt-2 font-semibold text-xl'>Here are some of the ways you can use dasTekEdu</p>
            <div className='grid sm:flex justify-evenly  mt-5'>
                <Usecards/>
                <Usecards/>
            </div>
            <div className='grid sm:flex justify-evenly '>
                <Usecards/>
                <Usecards/>
            </div>
        </section>
    </>
  )

}
