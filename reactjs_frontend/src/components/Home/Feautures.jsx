import React from 'react'
import { HiArrowSmRight } from 'react-icons/hi';
import { MdFileDownloadDone } from "react-icons/md";
import roboto from '../../assests/roboto.png'
import phonerobo from '../../assests/phone-robo.png'

export default function Feautures() {
    return (
        <>
            <main className='m-8 mb-20 feautures rounded-xl p-10  shadow-2xl   mt-20 '>
                <h3 className='text-4xl font-bold text-gradient flex justify-center text align-middle'>Feautures that will make your study more productive </h3>
                <p className='flex justify-center align-middle font-semibold text-gray-700   m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iste voluptatibus nobis.Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <section className='flex justify-around align-middle px-10 py-5 m-8 border-2 border-black rounded-3xl'>
                
                    <ul className='p-3'>
                        <li className='m-5 font-semibold font-slate-600 text-xl   '><div className='flex align-middle justify-center'><MdFileDownloadDone className='text-green-600 m-1 mr-2' size={30} /> these are feautures so that we can stand out in our life</div></li>
                        <li className='m-5 font-semibold font-slate-600 text-xl   '><div className='flex align-middle justify-center'><MdFileDownloadDone className='text-green-600 m-1 mr-2' size={30} /> these are feautures so that we can stand out in our life</div></li>
                        <li className='m-5 font-semibold font-slate-600 text-xl   '><div className='flex align-middle justify-center'><MdFileDownloadDone className='text-green-600 m-1 mr-2' size={30} /> these are feautures so that we can stand out in our life</div></li>
                        <li className='m-5 font-semibold font-slate-600 text-xl   '><div className='flex align-middle justify-center'><MdFileDownloadDone className='text-green-600 m-1 mr-2' size={30} /> these are feautures so that we can stand out in our life</div></li>
                        <li className='m-5 font-semibold font-slate-600 text-xl   '><div className='flex align-middle justify-center'><MdFileDownloadDone className='text-green-600 m-1 mr-2' size={30} /> these are feautures so that we can stand out in our life</div></li>
                        <li className='m-5 font-semibold font-slate-600 text-xl   '><div className='flex align-middle justify-center'><MdFileDownloadDone className='text-green-600 m-1 mr-2' size={30} /> these are feautures so that we can stand out in our life</div></li>
                        <center>
                            <button type="button" className="relative text-white bg-blackhover:bg-gradient-to-bl mt-4 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ring-animation">
                                <div className='flex items-center justify-center text-2xl gap-x-3'>
                                    Start for free  <HiArrowSmRight size={30} />
                                </div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg" style={{ animation: 'ring-animation 2s infinite' }}></div>
                            </button>
                        </center>
                    </ul>

                    <div className='grid'>
                    {/* <img src={roboto} className=' absolute z-200  h-[400px] top- '/> */}
                        <img src={phonerobo} className=' rounded-xl m-3  h-[400px] '/>
                        
                    </div>
                </section>
            </main>
        </>
    )
}
