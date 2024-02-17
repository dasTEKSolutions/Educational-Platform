import React from 'react'
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { HiOutlinePencil } from "react-icons/hi2";
import { MdEmail } from 'react-icons/md';
export default function Mainedit() {
  return (
   <>
  <main className='m-10 p-10'>
  <center >
    <div className='bg-yellow-400 rounded-xl w-[90%] h-[200px] text-2xl p-8 font-bold flex '> change your background color <HiOutlinePencil size={30} className='m-' /></div>
    </center>   
    <section className=' ml-20 flex justify-around m-10'>
    <div>
         <img src="https://nasemul1.github.io/my-portfolio/profile-pic.png" className='h-36 ' alt="profile-pic"  /> 
    </div>
    <section className='m-11'>
                            <div className='w-[50vw] text-xl mb-14 flex justify-between space-x-10'>
                                <div className='flex gap-x-5'>
                                    <span><MdEmail size={30} className='' /></span>
                                    <span className='border-b-4 border-gray-300'>your @mail.com</span>
                                </div>
                                <div className='flex gap-x-5'>
                                    <span><BsFillCalendarDateFill size={30} className='' /></span>
                                    <span className='border-b-4 border-gray-300'>Date of birth</span>
                                </div>
                                <div className='flex gap-x-5'>
                                    <span><BsFillCalendarDateFill size={30} className='' /></span>
                                    <span className='border-b-4 border-gray-300'>Date of birth</span>
                                </div>

                            </div>

                            <div className='w-[50vw] text-xl  flex justify-between space-x-10'>
                                <div className='flex gap-x-5'>
                                    <span><MdEmail size={30} className='' /></span>
                                    <span className='border-b-4 border-gray-300'>Academic Standard</span>
                                </div>
                                <div className='flex gap-x-5'>
                                    <span><BsFillCalendarDateFill size={30} className='' /></span>
                                    <span className='border-b-4 border-gray-300'>Male</span>
                                </div>
                                <div className='flex gap-x-5'>
                                    <span><BsFillCalendarDateFill size={30} className='' /></span>
                                    <span className='border-b-4 border-gray-300'>Institution</span>
                                </div>
                            </div>
                            <center className='mt-14'>
                            <button type='button' className='mt-6 text-xl bg-black flex gap-x-3 rounded-full text-white px-10 py-3 '>
                                Update your profile   <HiOutlinePencil size={20} className='m-1' />
                            </button>
                            </center>
                        </section>  
    </section>
  </main>
   </>
  )
}
