import React from 'react'

export default function BlogCard() {
  return (
    <>
    <section className='border-2 shadow-2xl m-8 border-black rounded-xl w-[400px]'>
        <img src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=812,h=440,fit=crop/AVLP1NZoN9fKrDnp/dalla-e-2023-12-10-21.11.13---create-a-16_9-ratio-image-representing-ethical-considerations-in-the-field-of-generative-ai.-the-image-should-visually-depict-the-balance-between-inno-m5K2G0ZMwMTVwxnz.png'/>
        <div>
            <h5 className='text-2xl font-bold  hover:text-green-600 hover:underline m-3'>Easy Semantic Search with Upstash Vector</h5>
            <div className='flex justify-between mx-6'>
                <div className=''>
                    <div className='text-xl font-bold'>Datekedu person</div>
                    <div className='text-lg text-gray-700 font-bold'>11th feb</div>
                </div>
                
                    <img className='rounded-full mb-6 ' src='https://upstash.com/_next/image?url=%2Fauthors%2Fbcelik.jpeg&w=64&q=75' alt='lisdk'/>
                
            </div>
        </div>
    </section>
    </>
  )
}
