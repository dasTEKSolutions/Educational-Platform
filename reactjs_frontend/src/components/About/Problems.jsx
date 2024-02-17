import React from 'react'
import { VscCommentUnresolved } from "react-icons/vsc";
import { MdOutlineReportProblem } from "react-icons/md";
import { HiArrowSmRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';


export default function Problems() {
    return (
        <>
            <main className='mx-6 border-4 p-4 shadow-2xl rounded-xl my-4'>
                <h2 className='flex justify-start align-middle text-3xl text-slate-900  font-bold gap-2'><VscCommentUnresolved className='m-1'/>
                    Problems we are trying to solve -</h2>
                <section className='m-8 flex justify-around align-middle '>
                    <div className='m-3 border-[3px] p-4 shadow-2xl border-black  rounded-xl w-[400px]'>
                        <span className=' flex mx-4  text-slate-900  text-2xl font-semibold   align-middle'><MdOutlineReportProblem className='mx-3' size={35}/>  Taking time to solve  </span>
                        <p className='mx-6 my-3'>So we are helping them to do the thuj gs better than every one els  in this induatry so   </p>                 
                    </div>
                    <div className='m-3 border-[3px] p-4 shadow-2xl border-black  rounded-xl w-[400px]'>
                        <span className=' flex mx-4  text-slate-900  text-2xl font-semibold   align-middle'><MdOutlineReportProblem className='mx-3' size={35}/>  Taking time to solve  </span>
                        <p className='mx-6 my-3'>So we are helping them to do the thuj gs better than every one els  in this induatry so   </p>                 
                    </div>
                    <div className='m-3 border-[3px] p-4 shadow-2xl border-black  rounded-xl w-[400px]'>
                        <span className=' flex mx-4  text-slate-900  text-2xl font-semibold   align-middle'><MdOutlineReportProblem className='mx-3' size={35}/>  Taking time to solve  </span>
                        <p className='mx-6 my-3'>So we are helping them to do the thuj gs better than every one els  in this induatry so   </p>                 
                    </div>
                </section>
                <section className='m-8 flex justify-around align-middle '>
                    <div className='m-3 border-[3px] p-4 shadow-2xl border-black  rounded-xl w-[400px]'>
                        <span className=' flex mx-4  text-slate-900  text-2xl font-semibold   align-middle'><MdOutlineReportProblem className='mx-3' size={35}/>  Taking time to solve  </span>
                        <p className='mx-6 my-3'>So we are helping them to do the thuj gs better than every one els  in this induatry so   </p>                 
                    </div>
                    <div className='m-3 border-[3px] p-4 shadow-2xl border-black  rounded-xl w-[400px]'>
                        <span className=' flex mx-4  text-slate-900  text-2xl font-semibold   align-middle'><MdOutlineReportProblem className='mx-3' size={35}/>  Taking time to solve  </span>
                        <p className='mx-6 my-3'>So we are helping them to do the thuj gs better than every one els  in this induatry so   </p>                 
                    </div>
                    <div className='m-3 border-[3px] p-4 shadow-2xl border-black  rounded-xl w-[400px]'>
                        <span className=' flex mx-4  text-slate-900  text-2xl font-semibold   align-middle'><MdOutlineReportProblem className='mx-3' size={35}/>  Taking time to solve  </span>
                        <p className='mx-6 my-3'>So we are helping them to do the thuj gs better than every one els  in this induatry so   </p>                 
                    </div>
                </section>
                <Link className='flex align-middle justify-center' to="/signin">
                                <button type="button" className="bg-blackhover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white flex align-middle justify-center">
                                    <div className='flex items-center justify-center gap-x-3'>
                                       Check How <HiArrowSmRight size={20} />
                                    </div>
                                </button>
                            </Link>
            </main>

        </>
    )
}
