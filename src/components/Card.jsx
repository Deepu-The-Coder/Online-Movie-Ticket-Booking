import React from 'react'
import Rating from './Rating'
import { useNavigate } from 'react-router-dom'
const Card = (props) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-between gap-4  rounded-xl  p-2 hover:-translate-y-1 transition duration-300 w-66 pb-3 bg-slate-800 text-white '>
        <div onClick={()=>{navigate(`/movies/${props.id}`)}}
        className='overflow-hidden rounded-2xl'><img src={props.image} className='w-62.5 h-53.75 rounded-2xl object-cover hover:scale-110 transition-transform duration-700'></img></div>
        <div className='text-xl pl-2'>{props.title}</div>
        <div className='text-sm pl-2'>{props.about}</div>
        <div className='flex justify-between items-center pl-2'>
            <button onClick={()=>{navigate(`/movies/${props.id}`)}}
            className=' text-xs px-5 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer  duration-300'>
              Buy Ticket</button>
            <div className='mr-2'>
              <i className="fa-solid fa-star text-[red]"></i>
              <span>3.3</span>
            </div>    
        </div>


    </div>
  )
}

export default Card