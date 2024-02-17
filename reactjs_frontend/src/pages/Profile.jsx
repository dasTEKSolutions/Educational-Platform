import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { RiPencilLine } from "react-icons/ri";
import '../components/profile/profile.css'
import Main from '../components/profile/Main';

export default class Profile extends Component {
    render() {
        return (
            <>
            <Navbar/>
            <div className='h-20'></div>
                <center>
                    <Main/>
                </center>
            
                </>
            )
    }
}
