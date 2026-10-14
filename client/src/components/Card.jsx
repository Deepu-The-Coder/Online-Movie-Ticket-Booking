
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StarIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import timeFormat from '../lib/timeFormat'
const Card = ({movie}) => {
    const navigate = useNavigate()

    const{image_base_url} = useAppContext()
  return (
      <article className='flex w-full max-w-[360px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#19171a] to-[#101012] p-2 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary/10'>
        <div className='overflow-hidden rounded-xl'>
      <img onClick={()=> {
        navigate(`/movies/${movie._id}`);
        scrollTo(0,0)
      }}
         src={image_base_url + movie.backdrop_path} alt={`${movie.title} backdrop`} className='aspect-[16/10] w-full rounded-xl object-cover transition-transform duration-700 hover:scale-105 cursor-pointer'/>
      </div>

         <p className='mt-4 truncate px-2 text-lg font-semibold text-white'>{movie.title}</p>

         <p className='mt-2 px-2 text-sm text-gray-400'>
        {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre=>genre.name).join(" | ") } • {timeFormat(movie.runtime)}
       </p>

         <div className='mt-4 flex items-center justify-between px-2 pb-2'>
        <button onClick={()=>{navigate(`/movies/${movie._id}`);
        scrollTo(0,0)
        }}
          className='rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-dull'>
          Buy Tickets
        </button>

        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary'/>
          {movie.vote_average.toFixed(1)}
        </p>
       </div>
      
      </article>
  )
}

export default Card
