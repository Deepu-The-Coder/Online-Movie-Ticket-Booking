import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StarIcon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import timeFormat from '../lib/timeFormat'

const Card = ({movie}) => {
    const navigate = useNavigate()
    const {image_base_url} = useAppContext()

  return (
    <>
    {/* w-full on phones, original w-66 on laptops */}
    <div className='flex flex-col justify-between p-2 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-full sm:w-66'>
      <div className='overflow-hidden rounded-2xl'>
      <img onClick={()=> {
        navigate(`/movies/${movie._id}`);
        window.scrollTo(0,0)
      }}
       src={image_base_url + movie.backdrop_path} alt='' 
      //  {/* w-full & aspect-video on phones, original w-62.5 & h-53.75 on laptops */}
       className='w-full aspect-video sm:aspect-auto sm:w-62.5 sm:h-53.75 rounded-2xl object-cover hover:scale-110 transition-transform duration-700 cursor-pointer'/>
      </div>

       {/* Slightly smaller text/margin on phones, original text-lg & mt-4 on laptops */}
       <p className='font-semibold mt-3 sm:mt-4 truncate text-base sm:text-lg'>{movie.title}</p>

       <p className='text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2'>
        {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre=>genre.name).join(" | ") } • {timeFormat(movie.runtime)}
       </p>

       <div className='flex items-center justify-between mt-3 sm:mt-4 pb-2 sm:pb-3'>
        <button onClick={()=>{
          navigate(`/movies/${movie._id}`);
          window.scrollTo(0,0)
        }}
        className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
          Buy Tickets
        </button>

        <p className='flex items-center gap-1 text-xs sm:text-sm text-gray-400 mt-1 pr-1'>
          <StarIcon className='w-4 h-4 text-primary fill-primary'/>
          {movie.vote_average.toFixed(1)}
        </p>
       </div>
      
    </div>
    </>
  )
}

export default Card


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { StarIcon } from 'lucide-react'
// import { useAppContext } from '../context/AppContext'
// import timeFormat from '../lib/timeFormat'
// const Card = ({movie}) => {
//     const navigate = useNavigate()

//     const{image_base_url} = useAppContext()
//   return (
//     <div className='flex flex-col justify-between p-2  bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-66'>
//       <div className='overflow-hidden rounded-2xl'>
//       <img onClick={()=> {
//         navigate(`/movies/${movie._id}`);
//         scrollTo(0,0)
//       }}
//        src={image_base_url + movie.backdrop_path} alt='' className='w-62.5 h-53.75 rounded-2xl object-cover hover:scale-110 transition-transform duration-700 cursor-pointer'/>
//       </div>

//        <p className='font-semibold mt-4 truncate text-lg'>{movie.title}</p>

//        <p className='text-sm text-gray-400 mt-2'>
//         {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0,2).map(genre=>genre.name).join(" | ") } • {timeFormat(movie.runtime)}
//        </p>

//        <div className='flex items-center justify-between mt-4 pb-3'>
//         <button onClick={()=>{navigate(`/movies/${movie._id}`);
//         scrollTo(0,0)
//         }}
//         className='px-4 py-2 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer '>
//           Buy Tickets
//         </button>

//         <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
//           <StarIcon className='w-4 h-4 text-primary fill-primary'/>
//           {movie.vote_average.toFixed(1)}
//         </p>
//        </div>
      
//     </div>
//   )
// }

// export default Card

