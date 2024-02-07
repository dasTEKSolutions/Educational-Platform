import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import Cardchart from '../components/chatbot/Card-chart';
import { Link as ScrollLink } from 'react-scroll';
import Navbar from '../components/Navbar';



export default function HOMEWORKHELP() {
    return (
        <>
         <Navbar/>
            <main className='mx-6'>
                <center>
                    <h1 id='img' className='flex underline align-middle justify-center m-4 text-2xl sm:text-4xl h-16 font-bold mt-6'>HOMEWORK-HELP </h1>
                    <ul className='flex align-middle justify-center text-white m-4 sm:text- h-16 font-bold mt-6 gap-6'>
                        < ScrollLink to="High-school" smooth={true} duration={500}>
                            <li className='bg-black py-3 px-2 pb-0 sm:h-12   rounded-lg'>High school </li>
                        </ScrollLink>
                        < ScrollLink to="undergraduation-school" smooth={true} duration={500}>
                            <li className='bg-black py-3 px-2 pb-0 h-12  rounded-lg'>
                                Undergraduation
                            </li>
                        </ScrollLink>
                        <a href='/gen-chatbot'><li className='bg-black py-3 px-3 h-12 rounded-lg'>General </li></a>
                    </ul>
                </center>
                <div className='mx-8 shadow-2xl   '>
                    <h1 id='High-school' className='text-4xl h-14 font-bold underline m-6'>High School</h1>
                    <div className='grid sm:flex justify-center items-center '>
                        <Cardchart title="Maths" />
                        <Cardchart title="Science" />
                        <Cardchart title="Socail" />

                    </div>
                    <div className='grid sm:flex justify-center items-center '>
                        <Cardchart title="History " />
                        <Cardchart title="Literature" />
                    </div>
                </div>
                <div className='mx-8 mt-28 shadow-2xl'>
                    <h1 id='undergraduation-school' className='text-4xl h-14 font-bold underline'>Undergraduation School</h1>
                    <div className='grid sm:flex justify-center items-center '>
                        <Cardchart title="Coumputer science " />
                        <Cardchart title="Business" />
                        <Cardchart title="Agriculture" />
                    </div>
                    <div className='grid sm:flex justify-center items-center '>
                        <Cardchart title="MBBS" />
                        <Cardchart title="" />
                    </div>
                </div>
            </main>
        </>
    )
}
