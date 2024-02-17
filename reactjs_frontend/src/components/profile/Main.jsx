import React from 'react'
import { MdEmail } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi2";
import { Link } from 'react-router-dom';


export default function Main() {
    return (
        <>
            <div id="algn">
                <div id="card" className='shadow-2xl ' >
                    <div id="upper-bg">
                        <img src="https://nasemul1.github.io/my-portfolio/profile-pic.png" alt="profile-pic" class="profile-pic " />
                    </div>
                    <div id="lower-bg">
                        <div class="text mt-12">
                            <p class="text-2xl font-bold">Person name</p>
                            <p class="title">@username</p>
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
                            <Link to={'/profileEdit'}>
                                <button type='button' className='mt-6 text-xl bg-black flex gap-x-3 rounded-full text-white px-10 py-3'>
                                Edit    <HiOutlinePencil size={20} className='m-1' />
                            </button>
                            </Link>
                        </section>
                    </div>

                </div>
            </div>


        </>
    )
}
