import {React,useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const theaterRows = [
  ...'ABCDEFGHIJKLMNO'.split('').map(row => ({
    row,
    left: [1, 2, 3, 4, 5],
    center: 14,
    right: [1, 2, 3, 4, 5],
  })),
]

const SeatLayout = () => {
  
  const {id,date}=useParams()
  
  const[selectedSeats,setSelectedSeats] = useState([])
  const[selectedTime,setSelectedTime] = useState(null)
  const[show,setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])
  
  const navigate =useNavigate()
  
  const{axios, getToken, user} = useAppContext();
  
  const getShow = async()=>{
    try {
      const { data} = await axios.get(`/api/show/${id}`)
      
      if(data.success){
        setShow(data)
      }
    } catch (error) {
      console.log(error.message); 
    }
  }
  
    const handleSeatSelection =(seatId)=>{
      if(!selectedTime){
        return toast("Please select a time slot first")
      }
      if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
        return toast.error("You can select maximum 5 seats")
      }

      if(occupiedSeats.includes(seatId)){
        return toast("This seat is already Booked.")
      }
      setSelectedSeats(prev=> prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev,seatId])
    }

  const renderSeat = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`
    const isSelected = selectedSeats.includes(seatId)
    const isOccupied = occupiedSeats.includes(seatId)
    const isAccessible = seatId === 'O22'
    const seatStatus = isOccupied ? 'Booked' : isSelected ? 'Selected' : 'Available'

    return (
      <div key={seatId} className='group relative'>
        <button
          type='button'
          aria-label={`${seatId}, ${seatStatus}${isAccessible ? ', wheelchair accessible' : ''}`}
          aria-pressed={isSelected}
          onClick={() => handleSeatSelection(seatId)}
          className={`relative grid h-5 w-5 shrink-0 place-items-center rounded-t-[4px] border text-[9px] font-medium transition-colors focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            isOccupied
              ? 'border-gray-500 bg-gray-600 text-gray-300'
              : isSelected
                ? 'border-primary bg-primary text-white'
                : isAccessible
                  ? 'border-blue-400 bg-blue-600 text-white hover:bg-blue-500'
                  : 'border-gray-500 bg-gray-200 text-gray-900 hover:border-primary hover:bg-primary/20 hover:text-white'
          }`}
        >
          <span aria-hidden='true' className='pointer-events-none absolute inset-x-1 top-0.5 h-px bg-black/20' />
          {isAccessible ? '♿' : seatNumber}
          {isOccupied && <span aria-hidden='true' className='pointer-events-none absolute inset-0 grid place-items-center text-lg font-bold leading-none text-rose-500'>×</span>}
        </button>
        <span role='tooltip' className='pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-900 px-2.5 py-1.5 text-[10px] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100'>
          Seat {seatId} · {seatStatus}{isAccessible ? ' · Accessible' : ''}
        </span>
      </div>
    )
  }

  const renderRowSeats = (row, section, positions, offset = 0, sectionWidth = 5) => (
    <div className='grid grid-cols-5 gap-1'>
      {Array.from({ length: sectionWidth }, (_, index) => {
        const position = index + 1
        return positions.includes(position)
          ? renderSeat(row, position + offset)
          : <span key={`${row}-${section}-empty-${position}`} className='h-5 w-5' />
      })}
    </div>
  )
    const getOccupiedSeats = async()=>{
      try {
        const {data} = await axios.get(`/api/booking/seats/${id}`)
        if(data.success){
          setOccupiedSeats(data.occupiedSeats)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
      }
    }
  
  const bookTickets= async() =>{
    try {
      if(!user) return toast.error('Please login to proceed')

      if(!selectedTime || !selectedSeats.length) return toast.error('Please select time and seats.')
      
      const {data} = await axios.post('/api/booking/create' , {showId: 
        selectedTime.showId, selectedSeats},{headers:{Authorization: `Bearer ${await getToken()}`
    }})
      
    if(data.success){
      window.location.href = data.url;
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getShow()
  },[id])

  useEffect(()=>{
    if(selectedTime){
      getOccupiedSeats()
    }
  },[selectedTime])


  return show ? (
    <main className='mx-auto w-full max-w-[1600px] px-4 pb-24 pt-32 sm:px-6 md:pt-36 lg:px-10 xl:px-14'>
      <header className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <p className='mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary'>Movie booking</p>
          <h1 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl'>Choose your seats</h1>
          <p className='mt-2 text-sm text-gray-400'>Select a showtime, then pick up to five seats.</p>
        </div>
        <div className='flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-gray-300'>
          <span className={`h-2 w-2 rounded-full ${selectedTime ? 'bg-primary' : 'bg-gray-500'}`} />
          {selectedTime ? `Showtime · ${isoTimeFormat(selectedTime.time)}` : 'Select a showtime to continue'}
        </div>
      </header>

      <div className='grid grid-cols-1 items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)]'>
        <aside className='z-10 w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b1115] to-[#100e10] p-5 shadow-xl shadow-black/20 xl:sticky xl:top-28 xl:p-6'>
          <div className='flex items-center gap-3'>
            <span className='grid h-10 w-10 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary'>
              <ClockIcon className='h-5 w-5' />
            </span>
            <div>
              <h2 className='text-base font-semibold text-white'>Available timings</h2>
              <p className='mt-0.5 text-xs text-gray-400'>Choose a showtime</p>
            </div>
          </div>
          <div className='mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-1'>
            {show.dateTime[date].map(item => {
              const isSelected = selectedTime?.time === item.time

              return (
                <button
                  key={item.time}
                  type='button'
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTime(item)}
                  className={`flex min-h-12 items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border-white/10 bg-white/[0.03] text-gray-200 hover:border-primary/50 hover:bg-primary/10'
                  }`}
                >
                  <span className='text-sm font-medium'>{isoTimeFormat(item.time)}</span>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-600'}`} />
                </button>
              )
            })}
          </div>
        </aside>

        <section className='relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121114] to-[#0d0c0e] p-4 shadow-2xl shadow-black/20 sm:p-6 lg:p-8'>
          <BlurCircle bottom='0' right='0'/>
          <BlurCircle top='-100px' left='-100px'/>
          <div className='relative z-10 flex flex-col items-center'>
            <div className='mb-8 flex w-full flex-col items-center justify-between gap-3 sm:flex-row'>
              <div className='text-center sm:text-left'>
                <h2 className='text-xl font-semibold text-white sm:text-2xl'>Select your seat</h2>
                <p className='mt-1 text-xs text-gray-400'>Click a seat to select or deselect it.</p>
              </div>
              <span className='rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300'>
                {selectedSeats.length} / 5 selected
              </span>
            </div>

            <p className='text-xs font-medium tracking-[0.3em] text-gray-400'>SCREEN</p>
            <div aria-hidden='true' className='mt-2 h-3 w-[min(75vw,700px)] rounded-[50%] border-t-4 border-primary bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 shadow-[0_-8px_28px_rgba(248,69,101,0.3)]' />

            <div className='mt-8 w-full overflow-x-auto rounded-2xl border border-white/5 bg-black/20 pb-3'>
              <div className='mx-auto flex w-max flex-col items-center px-4 py-10'>
                <div className='mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-gray-500'>
                  <span className='w-4' />
                  <span className='w-[116px] text-center'>Side</span>
                  <span className='w-8 text-center'>Aisle</span>
                  <span className='w-[332px] text-center'>Center</span>
                  <span className='w-8 text-center'>Aisle</span>
                  <span className='w-[116px] text-center'>Side</span>
                  <span className='w-4' />
                </div>
                <div className='flex items-stretch gap-2'>
                  <div aria-hidden='true' className='flex w-3 items-center justify-center rounded-full bg-gray-400/80' />
                  <div className='flex flex-col gap-1.5'>
                    {theaterRows.map(({ row, left, center, right }, index) => {
                      const centerPadding = Math.floor((14 - center) / 2)
                      const centerStart = 6 + centerPadding

                      return (
                        <div key={row} className='flex h-5 items-center gap-2'>
                          <span className='w-4 text-center text-[10px] font-semibold text-gray-300'>{row}</span>
                          {renderRowSeats(row, 'left', left)}
                          <span aria-hidden='true' className='flex h-full w-8 items-center justify-center'>
                            {index === 7 && <span className='h-14 [writing-mode:vertical-rl] rotate-180 text-[8px] tracking-[0.2em] text-gray-400'>AISLE</span>}
                          </span>
                          <div className='grid grid-cols-[repeat(14,20px)] gap-1'>
                            {Array.from({ length: 14 }, (_, index) => (
                              index >= centerPadding && index < centerPadding + center
                                ? renderSeat(row, centerStart + index - centerPadding)
                                : <span key={`${row}-center-empty-${index}`} className='h-5 w-5' />
                            ))}
                          </div>
                          <span aria-hidden='true' className='flex h-full w-8 items-center justify-center'>
                            {index === 7 && <span className='h-14 [writing-mode:vertical-rl] rotate-180 text-[8px] tracking-[0.2em] text-gray-400'>AISLE</span>}
                          </span>
                          {renderRowSeats(row, 'right', right, 19)}
                          <span className='w-4 text-center text-[10px] font-semibold text-gray-300'>{row}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div aria-hidden='true' className='flex w-3 items-center justify-center rounded-full bg-gray-400/80' />
                </div>
                <div className='mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-gray-400'>
                  <span className='flex items-center gap-2'><span className='h-3 w-3 rounded-t border border-gray-500 bg-gray-200' />Available</span>
                  <span className='flex items-center gap-2'><span className='h-3 w-3 rounded-t border border-primary bg-primary' />Selected</span>
                  <span className='flex items-center gap-2'><span className='h-3 w-3 rounded-t border border-gray-700 bg-gray-700' />Booked</span>
                  <span className='flex items-center gap-2'><span className='grid h-4 w-4 place-items-center rounded bg-blue-600 text-[10px] text-white'>♿</span>Accessible</span>
                </div>
              </div>
            </div>

            <div className='mt-6 flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
              <div className='min-w-0'>
                <p className='text-xs font-medium uppercase tracking-wide text-gray-400'>Your selection</p>
                <p className='mt-1 truncate text-sm text-white'>
                  {selectedSeats.length ? selectedSeats.join(', ') : 'No seats selected'}
                </p>
              </div>
              <button onClick={bookTickets}
                className='flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition hover:bg-primary-dull active:scale-95'>
                Proceed to Checkout
                <ArrowRightIcon strokeWidth={3} className='h-4 w-4' />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  ) :(
     <Loading/>
  )
}


export default SeatLayout