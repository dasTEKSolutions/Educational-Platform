import React from 'react'
import Cards from '../utils/Cards'
import { PiMathOperationsBold } from "react-icons/pi";


export default function Subjects() {
    return (
        <div className='mx-10 mt-24 '>
            <h3 className='text-4xl font-bold text-gradient'>
                <center className='flex justify-center align-middle'>Effortless learning starts here. Ask, explore, master! <br /> Image & text questions answered - all subjects.</center>
            </h3>
            <center className='text-gray-500 text-md flex justify-center align-middle mt-4 font-semibold '>Master any topic with engaging AI companions! Dive into interactive quizzes, simulations,<br/> and personalized guidance to master your studies and boost your motivation</center>
            <section className='flex flex-wrap justify-center align-middle mt-8'>
            <Cards heading={'Maths'} component={<PiMathOperationsBold size={70} />
            } description={'Get more precise responses to all questions  '} />
            <Cards heading={'Maths'} component={<PiMathOperationsBold size={70} />
            } description={'Get more precise responses to all questions  '} />
            <Cards heading={'Maths'} component={<PiMathOperationsBold size={70} />
            } description={'Get more precise responses to all questions '} />
            </section>
            <section className='flex flex-wrap justify-center align-middle '>
            <Cards heading={'Maths'} component={<PiMathOperationsBold size={70} />
            } description={'Get more precise responses to all questions  '} />
            <Cards heading={'Maths'} component={<PiMathOperationsBold size={70} />
            } description={'Get more precise responses to all questions  '} />
            <Cards heading={'Maths'} component={<PiMathOperationsBold size={70} />
            } description={'Get more precise responses to all questions '} />
            </section>

        </div>
    )
}
