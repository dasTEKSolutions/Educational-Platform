import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import video from '../../assests/demo.mp4'
export default function Whatis() {
  return (
    <>
    <section className='mx-6 border-2 p-4 shadow-2xl rounded-xl'>
    <h2 className='flex gap-4  text-3xl text-slate-800 font-bold  '> <FaLongArrowAltRight color='black' size={35} />What is NexGen Study</h2>
    <p className='m-3 font-semibold mx-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nostrum ipsa, sapiente molestias laborum minus, commodi aperiam ratione ad quas quos omnis nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio accusantium ea, ullam voluptate tenetur quos modi optio aut corporis? Aut velit ea esse?</p>
   <center className='my-6'>
   <video className='rounded-lg ' autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                    </video>
   </center>
    </section>
    </>
  )
}
