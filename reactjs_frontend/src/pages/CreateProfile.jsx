import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/utils/Slider'
import { Link } from 'react-router-dom'

export default function CreateProfile() {
    const [standard, setstandard] = useState("10th")
    const [gender, setgender] = useState("male")

    return (
        <>

            <Navbar />
            <div className='h-20'></div> {/* Use standard spacing units */}
            <div className="flex justify-center">
                <div className='flex min-h-[60vh] border-[2.5px] shadow-2xl w-full max-w-4xl mx-auto border-black rounded-xl'>
                    <section className='w-1/2 border-r-[2.5px] border-black'>
                        <Slider />
                    </section>
                    <section className='w-1/2 p-8'>

                        <div>
                            <h2 className='text-3xl font-semibold text-center mb-8'>
                                <span role="img" aria-label="party popper">🎉</span>
                                <span className='border-b-2 border-gray-  00'>You are One step to go </span>
                            </h2>
                            <label className='font-bold ' > What is your current academic standard :</label>
                            <div className='flex justify-around my-2  '>
                                <div className={`${standard === '10th' ? 'bg-gray-300' : ''}  rounded-full  border-2  p-3`}>
                                    Under 10 th
                                </div>
                                <div className={`${standard === 'undergraate' ? 'bg-gray-300' : ''} rounded-full  border-2  p-3`}>
                                    Under 10 th
                                </div>
                                <div className={`${standard === '' ? 'bg-gray-300' : ''} rounded-full  border-2  p-3`}>
                                    Under 10 th
                                </div>
                            </div>
                            <label className='font-bold ' > What is your current academic standard :</label>
                            <div className='flex justify-around my-2  '>
                                <div className={`${gender === '10th' ? 'bg-gray-300' : ''}  rounded-full border-2  p-3`}>
                                    male
                                </div>
                                <div className={`${gender === 'undergraate' ? 'bg-gray-300' : ''} rounded-full  border-2  p-3`}>
                                    female
                                </div>
                                <div className={`${gender === '' ? 'bg-gray-300' : ''} rounded-full border-2 p-3`}>
                                    others
                                </div>
                            </div>
                            <label className='font-bold mt-2 ' > Where are you curretly studying on :</label>
                            <input
                                type='text'
                                id='username'
                                placeholder='Enter institue name'
                                className='border w-full p-2 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500' />
                            <label className='font-bold mt-2 ' > Where are you curretly studying on :</label>
                            <input
                                type='text'
                                id='username'
                                placeholder='Enter institue name'
                                className='border w-full p-2 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500' />
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center mb-6'>
                                    <input
                                        type='checkbox'
                                        id='termsAndConditions'
                                        className='mx-2'
                                        name='checkbox' />
                                    <label htmlFor='termsAndConditions'>Agree to our terms and conditions</label>
                                </div>
                                <button type='submit' className="bg-black font-medium rounded-full text-sm px-5 py-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                    Submit
                                </button>
                            </div>
                            <form>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}