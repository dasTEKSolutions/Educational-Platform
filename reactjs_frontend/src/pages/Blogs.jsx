import React from 'react'
import Navbar from '../components/Navbar'
import BlogCard from '../components/utils/BlogCard'

export default function blogs() {
  return (
    <>
      <Navbar />
      <div className='h-[100px]'></div>
      <section className='grid md:flex justify-around align-middle'>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </section>
      <section className='grid md:flex justify-around align-middle'>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </section>
      <section className='grid md:flex justify-around align-middle'>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </section>
    </>
  )
}
