import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Armchair, ArrowRight, CalendarDays, CheckCircle2, Clock3, Film, Ticket } from 'lucide-react'
import { useClerk, useUser } from '@clerk/react'
import Loading from '../components/Loading.jsx'
import BlurCircle from '../components/BlurCircle.jsx'
import { timeFormat } from '../lib/utils.js'
import { useAppContext } from '../context/AppContext.jsx'
import dateFormat from '../lib/dateFormat.js'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, getToken, user, image_base_url } = useAppContext()
  const { isLoaded } = useUser()
  const { openSignIn } = useClerk()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return undefined
    }

    const getMyBookings = async () => {
      setIsLoading(true)
      setLoadError('')

      try {
        const token = await getToken()
        const { data } = await axios.get('/api/user/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!data.success) {
          throw new Error(data.message || 'Unable to load your bookings.')
        }

        setBookings(data.bookings)
      } catch (error) {
        console.log(error.message)
        setLoadError(error.message || 'Unable to load your bookings. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    getMyBookings()
  }, [axios, getToken, reloadKey, user])

  if (!isLoaded || (user && isLoading)) return <Loading />

  const validBookings = bookings.filter((item) => item.show && item.show.movie)

  return (
    <main className='relative min-h-[80vh] overflow-hidden px-4 pb-20 pt-32 sm:px-6 md:pt-36 lg:px-10'>
      <BlurCircle top='90px' left='-140px' />
      <BlurCircle bottom='0px' right='-120px' />

      <section className='relative mx-auto max-w-5xl'>
        <header className='mb-9 border-b border-white/10 pb-7 sm:mb-10 sm:flex sm:items-end sm:justify-between sm:gap-6'>
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary'>
              QuickWatch <span className='mx-2 text-white/30'>/</span> Your tickets
            </p>
            <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>My bookings</h1>
            <p className='mt-2 text-sm leading-6 text-gray-400'>
              Your movie plans, all in one place.
            </p>
          </div>
          {validBookings.length > 0 && (
            <span className='mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 sm:mt-0'>
              <Ticket className='h-4 w-4 text-primary' aria-hidden='true' />
              {validBookings.length} {validBookings.length === 1 ? 'booking' : 'bookings'}
            </span>
          )}
        </header>

        {!user ? (
          <div className='flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:py-20'>
            <span className='mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary'>
              <Ticket className='h-7 w-7' aria-hidden='true' />
            </span>
            <h2 className='text-2xl font-semibold text-white'>Your tickets are just a sign-in away</h2>
            <p className='mt-2 max-w-md text-sm leading-6 text-gray-400'>
              Sign in to view your bookings, manage payment, and keep your movie plans together.
            </p>
            <button
              type='button'
              onClick={() => openSignIn()}
              className='mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dull'
            >
              Sign in
              <ArrowRight className='h-4 w-4' aria-hidden='true' />
            </button>
          </div>
        ) : loadError ? (
          <div role='alert' className='flex flex-col items-center rounded-3xl border border-red-400/20 bg-red-400/[0.06] px-6 py-12 text-center'>
            <h2 className='text-xl font-semibold text-white'>We couldn’t load your bookings</h2>
            <p className='mt-2 max-w-md text-sm leading-6 text-gray-400'>{loadError}</p>
            <button
              type='button'
              onClick={() => setReloadKey((key) => key + 1)}
              className='mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dull'
            >
              Try again
            </button>
          </div>
        ) : validBookings.length > 0 ? (
          <div className='space-y-5'>
            {validBookings.map((item, index) => {
              const movie = item.show.movie
              const bookedSeats = item.bookedSeats ?? []

              return (
                <article
                  key={item._id ?? index}
                  className='group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#19171a] to-[#101012] shadow-lg shadow-black/10 transition hover:border-white/20'
                >
                  <div className='flex flex-col sm:flex-row'>
                    <div className='relative aspect-[16/8] w-full shrink-0 overflow-hidden bg-white/[0.04] sm:aspect-auto sm:w-56 lg:w-64'>
                      <img
                        src={movie.backdrop_path ? image_base_url + movie.backdrop_path : '/placeholder.jpg'}
                        alt={`${movie.title || 'Movie'} backdrop`}
                        className='h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent sm:bg-gradient-to-r' aria-hidden='true' />
                      <span className='absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm'>
                        <Film className='h-3.5 w-3.5 text-primary' aria-hidden='true' />
                        Movie ticket
                      </span>
                    </div>

                    <div className='flex min-w-0 flex-1 flex-col p-5 sm:p-6'>
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <h2 className='truncate text-xl font-semibold text-white sm:text-2xl'>
                            {movie.title || 'Movie not available'}
                          </h2>
                          <p className='mt-1 text-sm text-gray-400'>
                            {movie.runtime ? timeFormat(movie.runtime) : 'Runtime unavailable'}
                          </p>
                        </div>
                        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          item.isPaid
                            ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                            : 'border-amber-300/20 bg-amber-300/10 text-amber-200'
                        }`}>
                          {item.isPaid
                            ? <CheckCircle2 className='h-3.5 w-3.5' aria-hidden='true' />
                            : <Clock3 className='h-3.5 w-3.5' aria-hidden='true' />}
                          {item.isPaid ? 'Confirmed' : 'Payment pending'}
                        </span>
                      </div>

                      <div className='mt-5 grid gap-4 border-y border-white/[0.08] py-4 sm:grid-cols-2'>
                        <div className='flex items-start gap-3'>
                          <CalendarDays className='mt-0.5 h-4 w-4 shrink-0 text-primary' aria-hidden='true' />
                          <div>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500'>Showtime</p>
                            <p className='mt-1 text-sm font-medium text-gray-200'>
                              {item.show.showDateTime ? dateFormat(item.show.showDateTime) : 'Date unavailable'}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-start gap-3'>
                          <Armchair className='mt-0.5 h-4 w-4 shrink-0 text-primary' aria-hidden='true' />
                          <div className='min-w-0'>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500'>Seats · {bookedSeats.length}</p>
                            <div className='mt-1 flex flex-wrap gap-1.5'>
                              {bookedSeats.length > 0 ? bookedSeats.map((seat) => (
                                <span key={seat} className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-gray-300'>
                                  {seat}
                                </span>
                              )) : <span className='text-sm text-gray-400'>Not available</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex flex-wrap items-center justify-between gap-4 pt-4'>
                        <div>
                          <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500'>Total paid</p>
                          <p className='mt-0.5 text-xl font-bold text-white'>
                            {currency}{item.amount}
                          </p>
                        </div>
                        {!item.isPaid && (
                          <a
                            href={item.paymentLink}
                            className='inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/15 transition hover:bg-primary-dull'
                          >
                            Pay now
                            <ArrowRight className='h-4 w-4' aria-hidden='true' />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className='flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center sm:py-20'>
            <span className='mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary'>
              <Ticket className='h-7 w-7' aria-hidden='true' />
            </span>
            <h2 className='text-2xl font-semibold text-white'>No bookings yet</h2>
            <p className='mt-2 max-w-md text-sm leading-6 text-gray-400'>
              Your next movie night is just a few clicks away. Explore what’s showing and reserve your seats.
            </p>
            <Link
              to='/movies'
              className='mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dull'
            >
              Explore movies
              <ArrowRight className='h-4 w-4' aria-hidden='true' />
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}

export default MyBookings
