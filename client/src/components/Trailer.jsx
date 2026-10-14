import React, { useState } from 'react'
import youtube from '../assets/youtube.png'
import BlurCircle from './BlurCircle'

const trailers = [
  { id: 'KPCMsJgJ3UI', title: 'Trailer one' },
  { id: 'NHk7scrb_9I', title: 'Trailer two' },
  { id: 'ejMMn0t58Lc', title: 'Trailer three' },
  { id: 'yy1Fdp_h4mM', title: 'Trailer four' },
]

const Trailer = () => {
  const [currentVideoId, setCurrentVideoId] = useState('XNQbH1SDPRk')

  return (
    <section className='relative mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 md:px-12 md:py-16 lg:px-20 xl:px-24'>
      <BlurCircle left='50px' top='1800px' />
      <div className='mb-7'>
        <p className='mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary'>Watch before you book</p>
        <h2 className='text-2xl font-semibold text-white sm:text-3xl'>Featured trailers</h2>
        <p className='mt-2 text-sm text-gray-400'>Get a glimpse of what is playing.</p>
      </div>

      <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#111012] p-2 shadow-2xl shadow-black/20 sm:p-3'>
        <div className='aspect-video overflow-hidden rounded-xl bg-black'>
          <iframe
            className='h-full w-full'
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}
            title='Featured movie trailer'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        </div>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'>
        {trailers.map(({ id, title }, index) => (
          <button
            key={id}
            type='button'
            onClick={() => setCurrentVideoId(id)}
            aria-pressed={currentVideoId === id}
            className={`group relative overflow-hidden rounded-xl border bg-[#111012] text-left transition hover:-translate-y-0.5 ${
              currentVideoId === id ? 'border-primary shadow-lg shadow-primary/10' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={`${title} thumbnail`}
              className='aspect-video w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110'
            />
            <span className='absolute inset-0 grid place-items-center bg-black/10'>
              <img src={youtube} alt='' className='h-9 w-9 drop-shadow-lg sm:h-11 sm:w-11' />
            </span>
            <span className='block px-3 py-2 text-xs font-medium text-gray-200 sm:text-sm'>
              Trailer {index + 1}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default Trailer
