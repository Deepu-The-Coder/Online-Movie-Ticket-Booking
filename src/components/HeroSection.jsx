import React from 'react'
import carsLogo from '../assets/carsLogo.png'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-36 bg-[url("/background.png")] bg-cover bg-center h-screen'>
        <div className="absolute inset-0 bg-black/60"></div>
        <img src={carsLogo} alt="" className=' absolute left-25 top-18 z-50 w-80  h-55 mt-20' />


        <div className='flex flex-col gap-7 z-50 mt-80 w-120 absolute left-35 '>
            <div className='flex items-center font-semibold '>
            <span>2017 · U · 1h 42m · 4 Languages</span>
        </div>
        <div className='flex items-center '>
            Blindsided by a new generation of racers,Lightning McQueen is pushed out of the sport he loves. To get back in the game, he'll need some help and inspiration.
        </div>

        <div className=' font-semibold '>
            <span>Animation | Kids | Adventure | Fantasy</span>
        </div>

        <button onClick={()=> navigate('/movies')}  className="w-42 flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
            Explore Movies
            <ArrowRight className='w-5 h-5'/>
            </button>
        </div>
    </div>
  )
}

export default HeroSection