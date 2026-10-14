import { Heart, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlurCircle from '../components/BlurCircle'
import Card from '../components/Card'
import { useAppContext } from '../context/AppContext.jsx'

const Favourites = () => {
  const { favoriteMovies } = useAppContext()

  return (
    <main className='relative min-h-[70vh] overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-10'>
      <BlurCircle top='80px' left='-140px' />
      <BlurCircle top='520px' right='-150px' />

      <section className='relative mx-auto max-w-7xl'>
        <header className='mb-10 border-b border-white/10 pb-8 sm:mb-12 sm:pb-10'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary'>
            QuickWatch <span className='mx-2 text-white/30'>/</span> Your collection
          </p>
          <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
            <div>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
                Your <span className='text-primary'>favorites.</span>
              </h1>
              <p className='mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base'>
                Keep the movies you love close, and find your next great night at the cinema.
              </p>
            </div>
            {favoriteMovies.length > 0 && (
              <span className='w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300'>
                {favoriteMovies.length} {favoriteMovies.length === 1 ? 'saved movie' : 'saved movies'}
              </span>
            )}
          </div>
        </header>

        {favoriteMovies.length > 0 ? (
          <div className='grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
            {favoriteMovies.map((movie) => (
              <Card movie={movie} key={movie._id} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:py-20'>
            <span className='mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary'>
              <Heart className='h-7 w-7' aria-hidden='true' />
            </span>
            <h2 className='text-2xl font-semibold text-white'>Your list is waiting</h2>
            <p className='mt-2 max-w-md text-sm leading-6 text-gray-400'>
              Save movies you’re excited to watch, and they’ll be right here whenever you need inspiration.
            </p>
            <Link
              to='/movies'
              className='mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dull'
            >
              Browse movies
              <MoveRight className='h-4 w-4' aria-hidden='true' />
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}

export default Favourites
