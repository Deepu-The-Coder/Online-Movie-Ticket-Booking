import React from 'react'
import Card from '../components/Card'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext.jsx'

const Movies = () => {
  
  const {shows} = useAppContext()
  return shows.length > 0 ? (
    <div className='mt-24 md:mt-40 mx-4 md:mx-45 flex flex-col gap-6 md:gap-10'>
      
      <div className='hidden md:block'>
        <BlurCircle top="20px" left="100px" />
        <BlurCircle top="700px" left="300px" />
        <BlurCircle top="500px" right="50px" />
      </div>

        <div className='flex flex-col justify-between gap-4 md:gap-7'>
        <span className='text-lg md:text-xl font-semibold md:font-normal'>Now Showing..</span>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10'>
            
            {shows.map((movie)=>(
              <Card movie={movie} key={movie._id}/>
            ))
            }
        </div>
        </div>
        </div>
  ) : (
    <div className='mt-24 md:mt-40 mx-4 md:mx-45 flex flex-col items-center md:items-start gap-6 md:gap-10 text-lg md:text-base'>
      Loading...
    </div>
  )
}

export default Movies
// import React from 'react'
// import Card from '../components/Card'
// import BlurCircle from '../components/BlurCircle'
// import { useAppContext } from '../context/AppContext.jsx'


// const Movies = () => {
  
//   const {shows} = useAppContext()
//   return shows.length > 0 ? (
//     <div className='mt-40 mx-45 flex flex-col gap-10'>
//       <BlurCircle top="20px" left="100px" />
//       <BlurCircle top="700px" left="300px" />
//       <BlurCircle top="500px" right="50px" />
//         <div className='flex flex-col justify-between gap-7'>
//         <span className='text-xl'>Now Showing..</span>
        
//         <div className='grid grid-cols-3 gap-10'>
            
//             {shows.map((movie)=>(
//               <Card movie={movie} key={movie._id}/>
//             ))
//             }
//         </div>
//         </div>
//         </div>
//   ) : <div className='mt-40 mx-45 flex flex-col gap-10'>Loading...</div>
// }

// export default Movies