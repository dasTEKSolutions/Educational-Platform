import React from 'react'
import { RiRegisteredLine } from "react-icons/ri";
import video from '../../assests/demo.mp4'
import { GiClawHammer } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { HiArrowSmRight } from 'react-icons/hi';



export default function DasTEk() {
    return (
        <>
            <main className='mx-6 border-4 p-4 shadow-2xl rounded-xl my-4'>
                <h3 className='flex align-middle justify-start font-bold text-3xl '> <RiRegisteredLine className='m-1' />
                    dasTEK Solutions LLC - </h3>
                <div className='flex align-middle flex- justify-center'>
                    <div className='w-auto md:w-[50%] p-6'>
                        <p className='font-bold text-gray-700 text-lg'>This product was made by the parent company dastek solutuons where er are giving ai solutons to theworld we can use anything i our mind so s </p>
                        <h6 className='text-2xl font-bold flex  text-slate-900 my-6'> <GiClawHammer className='m-1' size={30} />
                            what we do - </h6>
                        <p  className='font-semibold px-5  text-gray-700 text-lg'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi assumenda consectetur labore nemo doloribus saepe soluta voluptatibus, corrupti dolore quia. Rerum, temporibus repellendus.
                        </p>
                        <h6 className='text-2xl font-bold flex  text-slate-900 my-6'> <GiClawHammer className='m-1' size={30} />
                            How we can help -</h6>
                        <p  className='font-semibold px-5  text-gray-700 text-lg'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi assumenda consectetur labore nemo doloribus saepe soluta voluptatibus, corrupti dolore quia. Rerum, temporibus repellendus.
                        </p>
                        <Link className='flex align-middle justify-center my-6' to="/signin">
                                <button type="button" className="bg-blackhover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white flex align-middle justify-center">
                                    <div className='flex items-center justify-center gap-x-3'>
                                       Check out Now <HiArrowSmRight size={20} />
                                    </div>
                                </button>
                            </Link>
                    </div>
                    <center className='my-6'>
                        <video className='rounded-lg ' autoPlay loop muted>
                            <source src={video} type="video/mp4" />
                        </video>
                    </center>
                </div>
            </main>
        </>
    )
}
