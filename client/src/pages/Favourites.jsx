

import React from 'react'
import Card from '../components/Card'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext.jsx'
import Loading from '../components/Loading.jsx'


const Movies = () => {
  
  const {favoriteMovies} = useAppContext()
  return favoriteMovies.length > 0 ? (
    <div className='mt-40 mx-45 flex flex-col gap-10'>
      <BlurCircle top="20px" left="100px" />
      <BlurCircle top="700px" left="300px" />
      <BlurCircle top="500px" right="50px" />
        <div className='flex flex-col justify-between gap-7'>
        <span className='text-xl'>Now Showing..</span>
        
        <div className='grid grid-cols-3 gap-10'>
            
            {favoriteMovies.map((movie)=>(
              <Card movie={movie} key={movie._id}/>
            ))
            }
        </div>
        </div>
        </div>
  ) : 
  <div className='flex flex-col items-center justify-center h-screen'>
    <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
  </div>

}

export default Movies










