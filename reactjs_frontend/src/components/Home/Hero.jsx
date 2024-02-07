import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import img from '../../assets/hero.jpg'
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <>
      <div className='mx-6'>
      <div className='sm:flex sm:justify-around sm:mt-11 sm:flex-1 md:flex md:justify-around md:mt-11 md:flex-1 lg:flex lg:justify-around lg:mt-11 lg:flex-1'>
          <div className=''>
            <div id='text' className='text-7xl h-96 sm:text-8xl font-bold overflow-y-scroll no-scrollbar'>
              CUSTOM GPT <br/> FOR YOUR <br/>STUDIES 
            </div>
            <span className='text-gray-700 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam iste nulla<br />  vitae repellendus beatae deleniti suscipit rerum velit, sequi corporis laborum,<br />  .</span>
            <Link to={'/login'}>
            <button type="button" className="text-white mt-7 mx-auto    ml-7 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:    ring-gray-700 dark:border-gray-700 capitalize">
            
             <div className='flex p-1 align-middle gap-2'>TRY NOW <FaArrowRight className='m-auto align-middle justify-center' /></div>
            </button>
             </Link>
          </div>
          <div>
            <img id='img' src={img} className='rounded-lgf h-[400px]' />
          </div>
        </div>

      </div>
    </>
  )
}