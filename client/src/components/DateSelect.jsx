import { CalendarDays, Clock3, Ticket } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const dates = Object.keys(dateTime || {})

  const onBookHandler = () => {
    if (!selected) {
      toast('Please select a date')
      return
    }

    navigate(`/movies/${id}/${selected}`)
    window.scrollTo(0, 0)
  }

  return (
    <section id='dateSelect' aria-labelledby='date-select-title' className='scroll-mt-28 pt-20 sm:pt-24'>
      <div className='relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#191316] via-[#121012] to-[#101012] p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-10'>
        <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(248,69,101,0.12),transparent_55%)]' aria-hidden='true' />
        <BlurCircle top='-120px' left='-120px' />

        <div className='relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-12'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-3'>
              <span className='grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary'>
                <CalendarDays className='h-5 w-5' aria-hidden='true' />
              </span>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>Plan your visit</p>
                <h2 id='date-select-title' className='mt-1 text-xl font-semibold text-white sm:text-2xl'>Choose a show date</h2>
              </div>
            </div>

            {dates.length > 0 ? (
              <>
                <p className='mt-6 text-sm text-gray-400'>Select an available date to see showtimes.</p>
                <div className='no-scrollbar -mx-1 mt-4 overflow-x-auto px-1 pb-2'>
                  <div className='flex w-max gap-3'>
                    {dates.map((date) => {
                      const dateValue = new Date(`${date.slice(0, 10)}T00:00:00`)
                      const isSelected = selected === date

                      return (
                        <button
                          key={date}
                          type='button'
                          onClick={() => setSelected(date)}
                          aria-pressed={isSelected}
                          aria-label={dateValue.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })}
                          className={`flex h-[98px] w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                            isSelected
                              ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                              : 'border-white/10 bg-white/[0.035] text-gray-300 hover:border-primary/50 hover:bg-primary/10 hover:text-white'
                          }`}
                        >
                          <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${isSelected ? 'text-white/75' : 'text-gray-500'}`}>
                            {dateValue.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className='mt-1 text-2xl font-bold leading-none'>
                            {dateValue.getDate()}
                          </span>
                          <span className={`mt-1 text-xs font-medium ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                            {dateValue.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <p className='mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-400'>
                No show dates are available right now. Please check back soon.
              </p>
            )}
          </div>

          <div className='flex w-full flex-col gap-3 border-t border-white/10 pt-5 lg:w-auto lg:min-w-[220px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0'>
            <div className='flex items-center gap-2 text-xs text-gray-400'>
              {selected ? (
                <>
                  <Clock3 className='h-4 w-4 text-primary' aria-hidden='true' />
                  <span>
                    Selected:{' '}
                    <span className='font-medium text-gray-200'>
                      {new Date(`${selected.slice(0, 10)}T00:00:00`).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                </>
              ) : (
                <span>Select a date to continue</span>
              )}
            </div>
            <button
              type='button'
              onClick={onBookHandler}
              disabled={dates.length === 0}
              className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dull active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500 disabled:shadow-none'
            >
              <Ticket className='h-4 w-4' aria-hidden='true' />
              Continue to seats
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DateSelect
