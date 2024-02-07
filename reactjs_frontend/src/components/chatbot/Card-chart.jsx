import { Link } from 'react-router-dom'
import img from '../../assets/img.jpg'

export default function Cardchart({ url, title, desc ,to}) {

  return (
    <>
      <section className='m-6 shadow-xl bg-gray-100 p-3'>
        <img src={url || img} className='rounded-lg' />
        <div className=''>
          <h3 className='text-xl font-bold mt-3'>{title || "Maths"} problem</h3>
          <p className='text-base font-semibold text-gray-700 pl-2'>slove your problem{desc || ""}</p>
         <Link to={to || "/chatbot"}> <button className='bg-gray-700 rounded-lg text-lg text-black font-bold p-1 m-3'>Solve now</button></Link>
        </div>
      </section>
    </>
  )
}
