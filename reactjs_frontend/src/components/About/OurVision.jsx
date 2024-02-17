import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";

const options = [
    { id: 'best', title: 'Best Model', accuracy: '92%', icon: < FaRegEye className='m-1'/> },
    { id: 'fast', title: 'Fast Model', accuracy: '70%', icon: <FaRegEye className='m-1' /> },
    { id: 'EASY', title: 'EASY Model', accuracy: '70%', icon: <FaRegEye className='m-1' /> },

    // Add more options here if necessary
];
export default function OurVision() {
    const [active, setActive] = useState(options[0].id);

    const handleClick = (optionId) => {
        setActive(optionId);
    };

    return (
        <>
            <main className='mx-6 border-4 p-4 shadow-2xl rounded-xl my-4'>
                <h2 className='flex justify-start align-middle text-3xl text-slate-900  font-bold gap-2'><FaRegEye className='m-1' />
                    Our Vision -</h2>
                <section className='px-6 m-6'>
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex space-x-4">
                                {/* Option buttons */}
                                {options.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`px-4 py-2 rounded-lg ${active === option.id ? 'bg-blackhover:bg-gradient-to-bl text-white' : 'bg-gray-200 text-gray-700'}`}
                                        onClick={() => handleClick(option.id)}
                                    >
                                        <div className='flex'>{option.icon}
                                        <span>{option.title}</span></div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 p-4 rounded shadow-md">
                                {/* Content based on the active option */}
                                {active === 'best' && (
                                    <div>
                                        <h3 className="text-lg font-semibold">Quickly Generate AI Solutions for All Assignments</h3>
                                        <p>Tackle assignment questions with StudyX AI: Our Best Model powered by GPT-4 is 92% accurate.</p>
                                    </div>
                                )}
                                {active === 'fast' && (
                                    <div>
                                        <h3 className="text-lg font-semibold">Fast AI Solutions for Assignments</h3>
                                        <p>Get quicker results with Fast Model powered by ChatGPT which is 70% accurate.</p>
                                    </div>
                                )}
                                {/* Add more conditionals for additional options */}
                                {active === 'EASY' && (
                                    <div>
                                        <h3 className="text-lg font-semibold">Fast AI Solutions for Assignments</h3>
                                        <p>Get quicker results withsdfsdf Fast Model powered by ChatGPT which is 70% accurate.</p>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
