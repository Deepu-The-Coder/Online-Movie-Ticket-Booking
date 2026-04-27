import React from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DateSelect = ({ dateTime, id }) => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)

    const onBookHandler = () => {
        if (!selected) {
            return toast('Please select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        window.scrollTo(0, 0)
    }

  return (
    <div id='dateSelect' className='pt-12 md:pt-30'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative p-4 md:p-8 bg-primary/10 border border-primary/20 rounded-lg'>
            <BlurCircle top='-100px' left='-100px' />
            <BlurCircle top='100px' right='0px' />
            
            <div className='w-full md:w-auto'>
                <p className='text-base md:text-lg font-semibold text-center md:text-left'>Choose Date</p>
                <div className='flex items-center justify-center md:justify-start gap-2 md:gap-6 text-sm mt-4 md:mt-5'>
                    <ChevronLeftIcon className='w-6 h-6 md:w-7 md:h-7 cursor-pointer' />
                    <span className='grid grid-cols-4 md:flex flex-wrap md:max-w-lg gap-2 md:gap-4'>
                        {Object.keys(dateTime || {}).map((date) => (
                            <button key={date} 
                            className={`flex flex-col items-center justify-center h-12 w-12 md:h-14 md:w-14 aspect-square rounded cursor-pointer text-xs md:text-sm ${selected === date ? 'bg-primary text-white' : 'border border-primary/70 hover:bg-primary/20'}`}
                            onClick={() => setSelected(date)}
                            >
                                <span className='font-medium'>{new Date(date).getDate()}</span>
                                <span>{new Date(date).toLocaleString('en-US', { month: 'short' })}</span>
                            </button>
                        ))}
                    </span>
                    <ChevronRightIcon className='w-6 h-6 md:w-7 md:h-7 cursor-pointer' />
                </div>
            </div>

            <button onClick={onBookHandler}
            className='w-full md:w-auto bg-primary text-white px-8 py-3 md:py-2 mt-2 md:mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer font-medium'>
                Book Now
            </button>
        </div>
    </div>
  )
}

export default DateSelect

// import React from 'react'
// import BlurCircle from './BlurCircle'
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

// const DateSelect = ({ dateTime,id }) => {
    
//     const navigate = useNavigate()
//     const[selected,setSelected]=useState(null)

//     const onBookHandler=()=>{

//         if(!selected){
//             return toast('Please select a date')
//         }
//         navigate(`/movies/${id}/${selected}`)
//         scrollTo(0,0);
//     }

//   return (
//     <div id='dateSelect' className='pt-30'>
//         <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
//             <BlurCircle top='-100px' left='-100px' />
//             <BlurCircle top='100px' right='0px' />
//             <div>
//                 <p className='text-lg font-semibold'>Choose Date</p>
//                 <div className='flex items-center gap-6 text-sm mt-5'>
//                     <ChevronLeftIcon width={28}/>
//                     <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
//                         {Object.keys(dateTime || {}).map((date) => (
//                             <button key={date} 
//                             className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? 'bg-primary text-white' : 'border border-primary/70 hover:bg-primary/20'}`}
//                             onClick={() => setSelected(date)}
//                             >
//                                 <span>{new Date(date).getDate()}</span>
//                                 <span>{new Date(date).toLocaleString('en-US', { month: 'short' })}</span>
//                             </button>
//                         ))}
//                     </span>
//                     <ChevronRightIcon width={28} />
//                 </div>
//             </div>
//             <button onClick={onBookHandler}
//             className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>Book Now</button>
//         </div>
//     </div>
//   )
// }

// export default DateSelect