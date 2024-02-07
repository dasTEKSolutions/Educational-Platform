import React from 'react'
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <div className='h-64 justify-center items-center flex'>
            <div className=''>
            <h3 className='flex justify-center items-center font-bold text-3xl h-20 '>Join the future of AI chatbots today</h3>
            <div className='justify-center items-center flex'><div className='flex justify-center items-center bg-black text-white w-32 self-center rounded-lg p-2'><div className="flex justify-center items-center gap-2  ">TRY NOW <FaArrowRight /></div> </div></div>
            </div>
    </div>
  )
}
