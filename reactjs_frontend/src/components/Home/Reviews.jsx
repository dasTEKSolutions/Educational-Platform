import React, { useRef, useState } from 'react';
import Cards from './Cards';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';


export default function Reviews() {
  return (
    <>
      <h3 className='text-4xl font-bold text-gradient flex justify-center  mt-16'>What Students Say our Product </h3>
      <p className='text-gray-700 font-semibold flex justify-center align-middle m-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem fugit explicabo facere!</p>

      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true} // Enable looping
        autoplay={{
          delay: 0, // Delay between transitions (in ms). Adjust as needed.
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        speed={5000} // Adjust transition speed for smoother animations (in ms)
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0   ,
          },
        }}
        modules={[Autoplay]} // Only include Autoplay module here
        className="mySwiper "
       
        
      >
        <SwiperSlide ><Cards content={"NextGenStudy AI has revolutionized the way I approach my studies. It's like having a tutor available anytime I need it!"} /></SwiperSlide>
        <SwiperSlide ><Cards content={"Thanks to NextGenStudy AI, I've seen a significant improvement in my grades and understanding of complex topics."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"This tool is a game-changer for exam preparation. It's incredibly user-friendly and effective!" } /></SwiperSlide>
        <SwiperSlide ><Cards content={"I'm truly amazed by how quickly and accurately NextGenStudy AI answers my questions – it's my go-to study aid."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"Finally, a study tool that keeps up with my pace and challenges me to learn more deeply."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"NextGenStudy AI's detailed explanations make tough subjects much more approachable and less intimidating."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"I've recommended NextGenStudy AI to all my friends. It's an indispensable resource for any student."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"The clarity of explanations and depth of knowledge provided by NextGenStudy AI is unmatched."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"NextGenStudy AI has been a critical part of my academic toolkit – accessible, reliable, and comprehensive." } /></SwiperSlide>
        <SwiperSlide ><Cards content={"As a visual learner, the interactive elements of NextGenStudy AI have made a huge difference in my studies."} /></SwiperSlide>
      </Swiper>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true} // Enable looping
        autoplay={{
          delay: 0, // Delay between transitions (in ms). Adjust as needed.
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        speed={5000} // Adjust transition speed for smoother animations (in ms)
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0   ,
          },
        }}
        modules={[Autoplay]} // Only include Autoplay module here
        className="mySwiper "
       
        
      >
        <SwiperSlide ><Cards content={"Balancing work and school was overwhelming, but NextGenStudy AI helps me optimize my study time effectively!"} /></SwiperSlide>
        <SwiperSlide ><Cards content={"NextGenStudy AI has been invaluable for my thesis research, offering clear explanations and quick answers to complex questions."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"The depth of NextGenStudy AI's problem-solving is phenomenal. It has helped me grasp concepts I struggled with for months." } /></SwiperSlide>
        <SwiperSlide ><Cards content={"NextGenStudy AI isn't just a study tool; it's like a personal academic coach that's there whenever I need support." } /></SwiperSlide>
        <SwiperSlide ><Cards content={"I was skeptical at first, but NextGenStudy AI proved to be an extraordinary aid for my advanced mathematics course."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"NextGenStudy AI's intuitive approach to learning complex scientific theories has made it my favorite study companion."} /></SwiperSlide>
        <SwiperSlide ><Cards content={"Each session with NextGenStudy AI leaves me more knowledgeable and confident in my ability to tackle exams." } /></SwiperSlide>
        <SwiperSlide ><Cards content={"My grades have improved drastically since I started using NextGenStudy AI. It's like having a tutor in my pocket!"} /></SwiperSlide>
        <SwiperSlide ><Cards content={"NextGenStudy AI has made a significant difference in understanding the nuances of my communication courses."} /></SwiperSlide>
      </Swiper>
    </>
  )
}
