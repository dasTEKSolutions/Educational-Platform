import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { TbMathSymbols } from "react-icons/tb";
import { HiArrowSmRight } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import 'tailwindcss/tailwind.css';

const DropdownItem = ({ children }) => {
    return (
        <div className="hover:text-green-500 hover:bg-blue-100 rounded-2xl  mx-2 transition ease-in duration-300 p-2">
            {children}
        </div>
    );
};

const DashboardNav = ({ LOGO }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileOpen, setIsprofileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed font-semibold text-black w-full mx-8 z-10 ${isScrolled ? 'bg-white ' : 'bg-transparent '} transition-all`}>
            <nav className="flex items-center  justify-evenly p-4">
                {LOGO && <div style={{ borderRight: '1px solid #ccc' }} className="logo ">
                    <Link to="/">
                        <h1 className='text-2xl font-bold mr-10'>NexGen Study</h1>
                    </Link>
                </div>}

                {/* Menu items */}
                <div className="hidden md:flex  ">
                    {/* Add dropdown logic and items */}
                    {/* Dropdown */}
                    <div
                        className="dropdown flex justify-center items-center gap-x-6 cursor-pointer"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                       <Link to={'/dashboard'}> <span className=" hover:text-green-700 transition text-xl font-bold ease-in duration-300">Subjects</span></Link>
                        {isDropdownOpen ? <RiArrowDropUpLine className='m-[5px] transition-transform duration-300' /> : <RiArrowDropDownLine className='m-[5px] transition-transform duration-300' />}

                        {isDropdownOpen && (
                            <div className="absolute  mt-[235px] py-2 bg-white shadow-lg rounded-lg fade-in">
                                <DropdownItem>
                                    <div className='flex  '>
                                        <TbMathSymbols color='black' size={'25px'} />
                                        <div >Maths<p className='text-blue-400'>this is for maths</p></div>

                                    </div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div className='flex gap-2'>
                                        <TbMathSymbols color='black' size={'25px'} />
                                        <div >Maths<p className='text-blue-400'>this is for maths</p></div>
                                    </div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div className='flex gap-2'>
                                        <TbMathSymbols color='black' size={'25px'} />
                                        <div >Maths<p className='text-blue-400'>this is for maths</p></div>
                                    </div>
                                </DropdownItem>
                            </div>
                        )}
                    </div>

                    <Link to='/aichat'>
                        <div className="dropdown flex justify-center  mx-2  text-xl font-bold align-middle"><span>Ai chat</span></div>
                    </Link>
                    {/* <div className="dropdown">Pricing</div> */}

                    <Link to={'/discussions'}>
                        <div className="dropdown flex justify-center gap-1  mx-2 font-bold text-xl  align-middle"><span>Discussions</span></div>
                    </Link>
                    <Link to={'/chathistory'}>
                        <div className="dropdown flex justify-center gap-1  mx-2 font-bold text-xl  align-middle"><span>Chat-History</span></div>
                    </Link>
                </div>

                {/* Conditionally render buttons based on login state */}
                <Link to={'/profile'}
                    className="dropdown flex justify-center items-center mr-44 gap- 4 p-2 rounded-lg cursor-pointer bg-black "
                >
                    <span className="  transition ease-in duration-300 text-white font-bold  "><span className='flex align-middle justify-center pr-2' > <CgProfile className='m-1 text-white' size={20} />
                        profile</span></span>
                    
                </Link>

            </nav>
        </header>
    );
};

export default DashboardNav;
