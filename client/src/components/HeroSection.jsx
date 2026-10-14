import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const movies = [
  {
    title: 'Stranger Things',
    image: '/background2.jpg',
    logo: '/logo2.png',
    info: '2016-2025 · U/A · Series',
    desc: 'In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.',
    genre: 'Dark Fantasy | Sci-Fi | Coming-of-Age'
  },
  {
    title: 'KFP',
    image: '/background3.jpg',
    logo: '/logo3.png',
    info: '2016 · U/A · 1h 35m',
    desc: 'Continuing his "legendary adventures of awesomeness", Po must face two hugely epic, but different threats: one supernatural and the other a little closer to home.',
    genre: 'Action | Comedy | Family'
  },
  {
    title: 'Cars 3',
    image: '/background1.png',
    logo: '/logo1.png',
    info: '2017 · U · 1h 42m · 4 Languages',
    desc: "Blindsided by a new generation of racers, Lightning McQueen is pushed out of the sport he loves. To get back in the game, he'll need some help and inspiration.",
    genre: 'Animation | Kids | Adventure | Fantasy'
  },
  {
    title: 'Peaky Blinders',
    image: '/background4.jpg',
    logo: '/logo4.jpg',
    info: '2013-2022 · U/A · Series',
    desc: 'A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.',
    genre: 'Gangster | Crime | Drama'
  }
]

const HeroSection = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const transitionTimeout = useRef(null)

  const changeSlide = useCallback((index) => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
    setFade(false)
    transitionTimeout.current = setTimeout(() => {
      setCurrent((index + movies.length) % movies.length)
      setFade(true)
      transitionTimeout.current = null
    }, 250)
  }, [])

  const handlePrev = useCallback(() => {
    changeSlide(current - 1)
  }, [changeSlide, current])

  const handleNext = useCallback(() => {
    changeSlide(current + 1)
  }, [changeSlide, current])

  const handleTouchStart = (event) => {
    touchStartX.current = event.targetTouches[0].clientX
  }

  const handleTouchMove = (event) => {
    touchEndX.current = event.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    if (swipeDistance > 50) handleNext()
    if (swipeDistance < -50) handlePrev()
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') handleNext()
      if (event.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  useEffect(() => {
    if (isPaused) return undefined
    const interval = setInterval(handleNext, 6000)
    return () => clearInterval(interval)
  }, [handleNext, isPaused])

  useEffect(() => () => {
    if (transitionTimeout.current) clearTimeout(transitionTimeout.current)
  }, [])

  const movie = movies[current]

  return (
    <section
      aria-label='Featured movies'
      aria-roledescription='carousel'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
      className='relative isolate flex min-h-[700px] h-[92svh] max-h-[1000px] items-center overflow-hidden bg-[#09090B] px-5 pb-28 pt-28 sm:px-8 md:px-16 lg:px-24 xl:px-32'
    >
      <div
        className={`absolute inset-0 -z-20 bg-cover bg-[center_top] transition-opacity duration-700 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${movie.image})` }}
        aria-hidden='true'
      />
      <div aria-hidden='true' className='absolute inset-0 -z-10 bg-gradient-to-r from-[#09090B] via-[#09090B]/85 to-[#09090B]/20' />
      <div aria-hidden='true' className='absolute inset-0 -z-10 bg-gradient-to-t from-[#09090B] via-[#09090B]/10 to-black/35' />
      <div aria-hidden='true' className='absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-transparent' />
      <div aria-hidden='true' className='absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-[120px]' />

      <div className={`relative z-10 mx-auto w-full max-w-7xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <div className='max-w-2xl'>
          <span className='mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-200 shadow-lg backdrop-blur-md sm:text-xs'>
            <span className='h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(248,69,101,0.9)]' />
            Featured premiere
          </span>

          <div className='mt-7 flex h-24 items-center sm:h-32'>
            <img
              src={movie.logo}
              alt={`${movie.title} logo`}
              className='max-h-24 w-64 object-contain object-left drop-shadow-2xl sm:max-h-32 sm:w-80 md:w-96'
            />
          </div>

          <div className='mt-5 flex flex-wrap items-center gap-2.5 text-xs font-medium text-gray-200 sm:text-sm'>
            <span className='rounded-md border border-white/15 bg-black/25 px-2.5 py-1.5 backdrop-blur-sm'>{movie.info}</span>
            <span className='h-1 w-1 rounded-full bg-primary' aria-hidden='true' />
            <span className='text-gray-300'>Now showing</span>
          </div>

          <p className='mt-5 max-w-xl text-sm leading-7 text-gray-200 sm:text-base sm:leading-8'>
            {movie.desc}
          </p>
          <p className='mt-4 text-xs font-semibold tracking-wide text-gray-300 sm:text-sm'>
            {movie.genre.split(' | ').join('  ·  ')}
          </p>

          <button
            type='button'
            onClick={() => navigate('/movies')}
            className='mt-7 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dull active:translate-y-0'
          >
            Explore movies
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>
      </div>

      <div className='absolute bottom-2 left-5 right-5 z-10 flex items-center justify-between sm:bottom-4 sm:left-8 sm:right-8 md:left-16 md:right-16 lg:left-24 lg:right-24 xl:left-32 xl:right-32'>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={handlePrev}
            aria-label='Previous featured movie'
            className='grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            <ArrowLeft className='h-4 w-4' aria-hidden='true'/>
          </button>
          <button
            type='button'
            onClick={handleNext}
            aria-label='Next featured movie'
            className='grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>

        <div className='flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2.5 backdrop-blur-md' aria-label={`Movie ${current + 1} of ${movies.length}`}>
          {movies.map((item, index) => (
            <button
              key={item.title}
              type='button'
              onClick={() => changeSlide(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === current ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                index === current ? 'w-7 bg-primary' : 'w-1.5 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>

        <p className='hidden min-w-16 text-right text-xs font-medium tabular-nums text-gray-300 sm:block'>
          <span className='text-white'>0{current + 1}</span>
          <span className='mx-1.5 text-gray-600'>/</span>
          0{movies.length}
        </p>
      </div>
    </section>
  )
}

export default HeroSection
