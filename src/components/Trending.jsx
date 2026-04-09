import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Card from './Card'
import dark from "../assets/dark.jpg"
import dragons from "../assets/dragons.jpg"
import pshyco from "../assets/pshyco.jpg"
import spidy from "../assets/spidy.jpg"
import stranger from "../assets/stranger.jpg"
import avengers from "../assets/avengers.jpg"
import BlurCircle from './BlurCircle'
const Trending = () => {

  const navigate = useNavigate()

  const arr = [
    {
      image:dark,
      title:"Dark",
      about:"2025 • Fiction | Thriller • Web Series "
    },
    {
      image:dragons,
      title:"How to Train your Dragon",
      about:"2025 • Animation | Family • 1h 37m "
    },
    {
      image:pshyco,
      title:"American Pshyco",
      about:"2025 • Horror | Phsychology • 1h 42m "
    },
    {
      image:avengers,
      title:"Avengers",
      about:"2025 • Action | Fantasy • 2h 23m "
    },
    {
      image:spidy,
      title:"Spider-Man",
      about:"2025 • Superhero | Adventure • 2h 1m "
    }
  ]

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
            {/* <Card title="itachi" />
            <div>Panchayat</div>
            <div>Bhay</div>
            <div>Conjuring</div>
            <div>Asur</div> */}

            
            {arr.map((item) => {
              return(
              <Card 
              title= {item.title} 
              image={item.image} 
              about={item.about} />
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

export default Trending