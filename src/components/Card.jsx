import React from 'react'
import Rating from './Rating'
import { useNavigate } from 'react-router-dom'
import { StarIcon } from 'lucide-react'
const Card = (props) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-between gap-4  rounded-xl  p-2 hover:-translate-y-1 transition duration-300 w-66 pb-4 bg-slate-800 text-white '>
        <div onClick={()=>{navigate(`/movies/${props.id}`)}}
        className='overflow-hidden rounded-2xl'><img src={props.image} className='w-62.5 h-53.75 rounded-2xl object-cover hover:scale-110 transition-transform duration-700'></img></div>
        <div className='text-xl pl-2'>{props.title}</div>
        <div className='text-sm  text-gray-300 pl-2'>{props.about}</div>
        <div className='flex justify-between items-center pl-2'>
            <button onClick={()=>{
              navigate(`/movies/${props.id}`);
              scrollTo(0,0)
            }}
            className=' text-xs px-5 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer  duration-300'>
              Buy Ticket</button>
            <div className='mr-2 flex items-center gap-1'>
              <StarIcon className=' w-4 h4 text-primary fill-primary truncate' />
              <span className='text-sm  text-gray-300 pr-2'>{props.rating}</span>
            </div>    
        </div>


    </div>
  )
}

export default Card