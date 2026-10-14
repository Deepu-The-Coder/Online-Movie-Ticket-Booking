import React from 'react'
import { useNavigate  } from 'react-router-dom'
import Card from './Card.jsx'
import BlurCircle from './BlurCircle.jsx'
import { useAppContext } from '../context/AppContext.jsx'
const FeaturedSection = () => {

  const navigate = useNavigate()

  const {shows} = useAppContext()

  return (
    <section className='relative mx-auto mt-8 flex w-full max-w-[1440px] flex-col gap-8 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.08] via-[#120d10] to-[#0c0b0d] px-5 py-12 shadow-[0_24px_80px_rgba(248,69,101,0.06)] sm:px-8 sm:py-16 md:mt-12 md:gap-10 md:px-12 lg:px-20 xl:px-24'>
      <BlurCircle top="720px" left="110px" />
        <div className='flex items-end justify-between gap-4'>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary'>Handpicked for you</p>
          <h2 className='text-2xl font-semibold text-rose-50 sm:text-3xl'>Now Trending</h2>
          <p className='mt-2 text-sm text-rose-100/60'>The stories everyone is talking about.</p>
        </div>
        <button
        onClick={() => {navigate('/movies');
          scrollTo(0,0)}
        }
        className='hidden rounded-full border border-primary/25 bg-primary/10 px-5 py-2.5 text-sm font-medium text-rose-50 transition hover:border-primary/50 hover:bg-primary/20 sm:block'>View all</button>
        </div>
        <div className='grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8'>
            {shows.slice(0,6).map((show) => (
              <Card key={show._id} movie={show}/>
            ))
          }
        </div>
        <div className='flex justify-center sm:hidden'>
          <button 
          onClick={() => {navigate('/movies'); 
            scrollTo(0, 0)}}
          className='rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dull'>View all movies</button>
        </div>
    </section>
  )
}

export default FeaturedSection