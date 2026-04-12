import React from 'react'
import Card from '../components/Card'
import BlurCircle from '../components/BlurCircle'
import cars from "../assets/cars.jpg"
import batman from "../assets/batman.jpg"
import joker from "../assets/joker.jpg"
import pshyco from "../assets/pshyco.jpg"
import spidy from "../assets/spidy.jpg"
import peakyBlinders from "../assets/peakyBlinders.jpg"
import train from "../assets/train.jpg"
import dhurandhar from "../assets/dhurandhar.jpg"

const Favourites = () => {
  const arr = [
      {
        image:cars,
        title:"Cars",
        about:"2025 • Fiction | Thriller • Web Series ",
        rating:"4.5"
      },
      {
        image:train,
        title:"Train to Busan",
        about:"2025 • Fiction | Thriller • Web Series ",
        rating:"4.5"
      },
      {
        image:batman,
        title:"Batman",
        about:"2025 • Animation | Family • 1h 37m ",
        rating:"4.9"
      },
      {
        image:pshyco,
        title:"American Pshyco",
        about:"2025 • Horror | Phsychology • 1h 42m ",
        rating:"4.8"
      },
      {
        image:joker,
        title:"Joker",
        about:"2025 • Action | Fantasy • 2h 23m ",
        rating:"4.7"
      },
      {
        image:spidy,
        title:"Spider-Man",
        about:"2025 • Superhero | Adventure • 2h 1m ",
        rating:"4.6"
      },
      {
        image:peakyBlinders,
        title:"Peaky Blinders",
        about:"2025 • Crime | Drama • 1h 30m ",
        rating:"4.9"
      },
      {
        image:dhurandhar,
        title:"Dhurandhar",
        about:"2025 • Crime | Drama • 1h 30m ",
        rating:"4.9"
      }
    ]

  return (
    <div className='mt-40 mx-45 flex flex-col gap-10'>
      <BlurCircle top="20px" left="100px" />
      <BlurCircle top="700px" left="300px" />
      <BlurCircle top="500px" right="50px" />
        <div className='flex flex-col justify-between gap-7'>
        <span className='text-xl'>Now Showing..</span>
        
        <div className='grid grid-cols-3 gap-10'>
            
            {arr.map((item) => {
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
  )
}

export default Favourites