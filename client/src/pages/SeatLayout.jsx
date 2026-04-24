import {React,useState,useEffect} from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import dummyShowData from '../assets/dummyShowData'
import dummyDateTimeData from '../assets/dummyDateTimeData'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import download from '../assets/download.svg'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {

  const groupRows=[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]]
  const {id,date}=useParams()

  const[selectedSeats,setSelectedSeats] = useState([])
  const[selectedTime,setSelectedTime] = useState(null)
  const[show,setShow] = useState(null)

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
        return toast("You can select maximum 5 seats")
      }
      setSelectedSeats(prev=> prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev,seatId])
    }

    const handleCheckout = () => {
    // 1. Validation: Did they pick a time? (Safety check)
    if (!selectedTime) {
      return toast.error("Please select a time slot first.");
    }
    
    // 2. Validation: Did they pick any seats?
    if (selectedSeats.length === 0) {
      return toast.error("Please select at least one seat.");
    }

    // 3. Success! (In a real app, you would send this data to your backend here)
    // console.log("Booking Data:", { id, date, selectedTime, selectedSeats });
    
    toast.success("Seats locked! Redirecting to your bookings...");
    
    // 4. Send them to the My Bookings page to pay
    navigate('/my-bookings');
    window.scrollTo(0, 0);
  }

    const renderSeats =(row,count=9)=>(
      <div key={row} className='flex gap-2 mt-2'>
        <div className='flex flex-wrap items-center  justify-center gap-2'>
          {Array.from({length:count}, (_, i) => {
            const seatId = `${row}${i+1}`;
            return (
              <button key={seatId} onClick={() => handleSeatSelection(seatId)} className={`w-8 h-8 rounded  border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
                {seatId}
              </button>
            )
            
          })}
        </div>
      </div>

    )

  useEffect(()=>{
    getShow()
  },[id])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-3xl py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
      <div className='mt-5 space-y-1'>
       {show.dateTime[date].map((timeString)=>(
         <div key={timeString}
         onClick={()=> setSelectedTime(timeString)} 
         className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime === timeString ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
          <ClockIcon className='w-4 h-4 text-primary' />
          <p className='text-sm'>{ timeString}</p>
        </div>
       ))}
       </div>
    </div>

    {/* Seat Layout */}
    <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
       <BlurCircle bottom='0' right='0'/>
       <BlurCircle top='-100px' left='-100px'/>
       <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
       <img src={download} alt='Download Seat Layout' />
       <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

       <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
        <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
         {groupRows[0].map(row=>renderSeats(row))}
        </div>


        <div className='grid grid-cols-2 gap-11'>
        {groupRows.slice(1).map((group,idx) =>(
          <div key={idx} >
            {group.map(row=>renderSeats(row,8))}
          </div>
        ))}
       </div>
       </div>


      <button onClick={handleCheckout}
      className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
        Proceed to Checkout
        <ArrowRightIcon  strokeWidth={3} className='w-4 h-4' />
      </button>
    </div>
    </div>
  ) :(
     <Loading/>
  )
}


export default SeatLayout