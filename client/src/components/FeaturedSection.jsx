import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Card from './Card.jsx'
import dummyShowData from "../assets/dummyShowData.js"
import BlurCircle from './BlurCircle.jsx'
import { useAppContext } from '../context/AppContext.jsx'
const FeaturedSection = () => {

  const navigate = useNavigate()

  const {shows} = useAppContext()

  return (
    <div className='mt-20 mx-45 flex flex-col gap-10'>
      <BlurCircle top="720px" left="110px" />
        <div className='flex justify-between'>
        <div className='text-lg '>Now Trending</div>
        <button
        onClick={() => {navigate('/movies');
          scrollTo(0,0)}
        }
        className='px-5 py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer  duration-300'>View More</button>
        </div>
        <div className='grid grid-cols-3 gap-10'>
            
            {dummyShowData.slice(0,6).map((item) => {
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
        <div className='flex justify-center mt-5'>
          <button 
          onClick={() => {navigate('/movies'); 
            scrollTo(0, 0)}}
          className=' w-32 px-6 py-2 bg-primary hover:bg-primary-dull transition rounded-lg font-medium cursor-pointer  duration-300'>Show More</button>
        </div>
    </div>
  )
}

export default FeaturedSection