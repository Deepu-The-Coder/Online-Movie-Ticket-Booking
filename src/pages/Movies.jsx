import React from 'react'
import dummyShowData from "../assets/dummyShowData.js"
import Card from '../components/Card'
import BlurCircle from '../components/BlurCircle'


const Movies = () => {
  

  return dummyShowData.length > 0 ? (
    <div className='mt-40 mx-45 flex flex-col gap-10'>
      <BlurCircle top="20px" left="100px" />
      <BlurCircle top="700px" left="300px" />
      <BlurCircle top="500px" right="50px" />
        <div className='flex flex-col justify-between gap-7'>
        <span className='text-xl'>Now Showing..</span>
        
        <div className='grid grid-cols-3 gap-10'>
            
            {dummyShowData.map((item) => {
              return(
              <Card 
              title= {item.title} 
              image={item.image} 
              about={item.about}
              rating={item.rating}
              id={item.id}
               />
            )
          })}
        </div>
        </div>
        </div>
  ) : <div className='mt-40 mx-45 flex flex-col gap-10'>Loading...</div>
}

export default Movies