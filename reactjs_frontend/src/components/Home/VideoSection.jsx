import React, { useState, useEffect } from 'react';
import video from '../../assests/demo.mp4'
import { HiArrowSmRight } from 'react-icons/hi';

const categories = [
    { key: 'ld', name: 'Maths  ', heading: 'Maths - From perplexing problems to clear-cut solution', description: "Struggling with a tricky algebra problem or a challenging calculus equation? Our interactive Mathematics chatbot is at your service. This intelligent tool is designed to help you break down complex mathematical concepts into understandable steps. Whether you're grappling with geometry or deciphering data in statistics, get instant, step-by-step solutions and explanations to enhance your understanding and boost your confidence in tackling all levels of math problems.    " },
    { key: 'se', name: 'Science', heading: 'Science – Unraveling Mysteries with Every Inquiry', description: " Confronted with a puzzling scientific concept or a complex lab result? Our responsive Science chatbot is ready to assist you. This smart companion is crafted to help you decode intricate scientific principles into comprehensible insights. Whether you're delving into the depths of biology, exploring the principles of physics, or making sense of chemical reactions, receive immediate, detailed explanations to broaden your scientific understanding and elevate your confidence in mastering diverse scientific disciplines." },
    { key: 'cs', name: 'Engineering', heading: 'Engineering – Bridging Ideas to Innovations', description: "Facing a daunting engineering problem or deciphering technical design principles? Our Engineering chatbot stands by to offer support. This adept digital mentor is engineered to simplify complex theories and real-world applications into digestible information. Whether you're calculating structural loads, analyzing electronic circuits, or navigating through fluid mechanics, access immediate, precise guidance to expand your engineering acumen and empower your skills in this practical field of endless invention and discovery." },
    { key: 'is', name: 'Communication', heading: 'Communication – Crafting Clarity from Concepts', description:"Encountering communication barriers or struggling with media theories? Our Communication chatbot is here to lend you a voice. Tailored to clarify the nuances of human interaction and media studies, this virtual guide helps translate abstract communication theories into practical skills. Whether you’re dissecting rhetorical strategies, designing a campaign, or just looking to improve your public speaking, receive instant feedback and constructive tips to refine your communication abilities and enhance your expressive prowess." },
    { key: 'mkt', name: 'Sociology', heading: 'Sociology – Understanding Society, One Question at a Time', description: "Bewildered by social phenomena or grappling with sociological theories? Our Sociology chatbot is your companion in social exploration. This insightful tool is programmed to dissect complex societal constructs and cultural dynamics into easily understandable concepts. Whether you're examining social stratification, researching cultural trends, or analyzing demographic data, gain swift, comprehensive insights to deepen your understanding of the social world and its intricate workings." },
];

const ContentDisplay = ({ category }) => {
    // You can fetch and return the relevant content based on the category selected
    return (
        <>
            <section className='m-8 px-3 grid sm:flex'>
                <div className='text-wrap flex-1 p-4 '>
                    <div className='text-4xl text-gradient h font-bold my-2'>{category.heading}</div>
                    {/* <div className='text-xl font-semibold my-2'>{category.heading}</div> */}
                    <div className='text-xl  text-slate-600 font-semibold my-2 '> {category.description}"</div>
                   
                    <button type="button" className="relative text-white bg-blackhover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg mt-8 px-5 py-2.5 text-center ring-animation">
                        <div className='flex items-center justify-center gap-x-3'>
                            Start for free  <HiArrowSmRight size={20} />
                        </div>
                        <div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg" style={{ animation: 'ring-animation 2s infinite' }}></div>
                    </button>
                </div>
                <div className='flex-1 p-4'>
                    <video className='rounded-lg' autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </section>
        </>
    )

};

const VideoSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    });

    return (
        <div className='mx-10 mt-24'>
            {isMobile ? (
                <select
                    value={selectedCategory.key}
                    onChange={(e) => setSelectedCategory(categories.find(cat => cat.key === e.target.value))}
                >
                    {categories.map((category) => (
                        <option key={category.key} value={category.key}>
                            {category.name}
                        </option>
                    ))}
                </select>
            ) : (
                <center>
                    <div className='flex justify-center align-middle mx-8  border-gray-300border- border-4 p-1 py-3 rounded-full '>
                        {categories.map((category) => (
                            <button className="inline-flex items-center bg-black text-white justify-center  n   rounded-full  p-3 py-4 mx-4 text-xl" onClick={() => setSelectedCategory(category)}>
                                <span className="relative mx-2 transition-all ease-in duration-75 bg-black  rounded-md group-hover:bg-opacity-0">
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </center>
            )}
            <ContentDisplay category={selectedCategory} />
        </div>
    );
};

export default VideoSection;
