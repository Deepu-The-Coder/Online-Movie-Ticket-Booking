import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Card from '../components/Card.jsx'
import BlurCircle from '../components/BlurCircle.jsx'
import DateSelect from '../components/DateSelect.jsx'
import Loading from '../components/Loading.jsx'
import { timeFormat } from '../lib/utils.js'
import { useAppContext } from '../context/AppContext.jsx'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showResult, setShowResult] = useState({ id: null, data: null })

  const { shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url } = useAppContext()

  const handleFavorite = async () => {
    try {
      if (!user) return toast.error('Please login to proceed')

      const { data } = await axios.post(
        '/api/user/update-favorite',
        { movie_id: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        await fetchFavoriteMovies()
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isCurrentRequest = true

    axios.get(`/api/show/${id}`)
      .then(({ data }) => {
        if (isCurrentRequest && data.success) {
          setShowResult({ id, data })
        }
      })
      .catch((error) => {
        console.log(error.message)
      })

    return () => {
      isCurrentRequest = false
    }
  }, [axios, id])

  const show = showResult.id === id ? showResult.data : null
  if (!show) return <Loading />

  const movie = show.movie
  const isFavorite = favoriteMovies.some((favorite) => favorite._id === id)
  const releaseYear = movie.release_date?.split('-')[0]

  return (
    <main className='overflow-hidden pb-20 pt-24 sm:pt-28'>
      <section className='relative isolate min-h-[600px]'>
        <div
          className='absolute inset-0 -z-20 bg-cover bg-center opacity-70'
          style={{ backgroundImage: `url(${image_base_url + movie.backdrop_path})` }}
          aria-hidden='true'
        />
        <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#09090B] via-[#09090B]/90 to-[#09090B]/55' aria-hidden='true' />
        <div className='absolute inset-0 -z-10 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/30' aria-hidden='true' />
        <BlurCircle top='110px' left='-130px' />

        <div className='mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:min-h-[600px] md:grid-cols-[280px_1fr] md:gap-14 md:px-12 lg:grid-cols-[340px_1fr] lg:gap-16 lg:px-16'>
          <div className='mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-2 shadow-2xl shadow-black/50 sm:max-w-[320px] md:mx-0 lg:max-w-[340px]'>
            <img
              src={image_base_url + movie.poster_path}
              alt={`${movie.title} poster`}
              className='aspect-[2/3] w-full rounded-xl object-cover'
            />
          </div>

          <div className='relative mx-auto flex w-full max-w-3xl flex-col items-center text-center md:mx-0 md:items-start md:text-left'>
            <p className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
              <span className='h-1.5 w-1.5 rounded-full bg-primary' />
              Now showing
            </p>
            <h1 className='text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
              {movie.title}
            </h1>

            <div className='mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start'>
              <span className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm font-medium text-white'>
                <StarIcon className='h-4 w-4 fill-primary text-primary' />
                {movie.vote_average.toFixed(1)}
                <span className='text-gray-400'>rating</span>
              </span>
              {releaseYear && <span className='rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-gray-300'>{releaseYear}</span>}
              <span className='rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-gray-300'>
                {timeFormat(movie.runtime)}
              </span>
            </div>

            <p className='mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base'>
              {movie.overview}
            </p>

            <div className='mt-5 flex flex-wrap justify-center gap-2 md:justify-start'>
              {movie.genres.map((genre) => (
                <span key={genre.id ?? genre.name} className='rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-300'>
                  {genre.name}
                </span>
              ))}
            </div>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start'>
              <a
                href='#dateSelect'
                className='rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dull active:scale-95'
              >
                Book tickets
              </a>
              <button
                type='button'
                className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 active:scale-95'
              >
                <PlayCircleIcon className='h-5 w-5' />
                Watch trailer
              </button>
              <button
                type='button'
                onClick={handleFavorite}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={isFavorite}
                className='grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:border-primary/50 hover:bg-primary/10 active:scale-95'
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className='mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16'>
        <section className='mt-8 border-t border-white/10 pt-10 sm:mt-12 sm:pt-14'>
          <div className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>Meet the cast</p>
            <h2 className='mt-2 text-2xl font-semibold text-white sm:text-3xl'>The faces behind the story</h2>
          </div>
          <div className='no-scrollbar -mx-2 overflow-x-auto pb-4'>
            <div className='flex w-max gap-4 px-2 sm:gap-5'>
              {movie.casts.slice(0, 12).map((cast, index) => (
                <article key={cast.id ?? `${cast.name}-${index}`} className='group w-24 text-center sm:w-28'>
                  <div className='mx-auto aspect-square overflow-hidden rounded-full border border-white/10 bg-white/[0.05] transition group-hover:border-primary/50'>
                    <img
                      src={image_base_url + cast.profile_path}
                      alt={cast.name}
                      className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                    />
                  </div>
                  <p className='mt-3 truncate text-xs font-medium text-gray-300 sm:text-sm'>{cast.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <DateSelect dateTime={show.dateTime} id={id} />

        <section className='mt-16 sm:mt-20'>
          <div className='mb-7 flex items-end justify-between gap-4'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>More to discover</p>
              <h2 className='mt-2 text-2xl font-semibold text-white sm:text-3xl'>You may also like</h2>
            </div>
            <button
              type='button'
              onClick={() => {
                navigate('/movies')
                window.scrollTo(0, 0)
              }}
              className='shrink-0 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-primary/50 hover:text-white'
            >
              All movies
            </button>
          </div>
          <div className='grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
            {shows.slice(0, 4).map((relatedMovie) => (
              <Card key={relatedMovie._id} movie={relatedMovie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default MovieDetails
