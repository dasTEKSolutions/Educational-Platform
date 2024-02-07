import img from '../../assets/university.png'
export default function Institutes() {
    return (
        <section className='bg-black text-white'>
            <h3 className='text-4xl font-semibold h-24  flex items-center justify-center italic underline'><div className='h-16'>Our Users are from</div></h3>        
            <div className='grid sm:flex mx-8 justify-around'>
                <img  src={img} className='h-48'/>
                <img  src={img} className='h-48'/>
                <img  src={img} className='h-48'/>
                <img  src={img} className='h-48'/>
            </div>
        </section>

    )
}
