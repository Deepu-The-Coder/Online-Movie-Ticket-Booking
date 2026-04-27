import React from 'react'
import Loading from '../components/Loading.jsx'
import BlurCircle from '../components/BlurCircle.jsx'
import { timeFormat } from '../lib/utils.js'
import { useAppContext } from '../context/AppContext.jsx'
import dateFormat from '../lib/dateFormat.js'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

   const { axios, getToken, user, image_base_url} = useAppContext()

  const [bookings, setBookings] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  
  const getMyBookings = async () => {
    try {
      const {data} = await axios.get('/api/user/bookings' ,{
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
        setBookings(data.bookings)
      }
    } catch (error) {
      console.log(error.message);
      
    }
    setIsLoading(false)
  }
  
  React.useEffect(() => {
    if(user){
      getMyBookings()
    }
  }, [user])

  return !isLoading ? (
    <div className='relative px-4 md:px-16 lg:px-40 pt-24 md:pt-40 min-h-[80vh] w-full overflow-x-hidden'>
      
      <div className='hidden md:block'>
        <BlurCircle top="10px" left="100px" />
        <BlurCircle bottom='0px' left='600px'/>
      </div>

      <h1 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6'>My Bookings</h1>

      {bookings.map((item,index)=>(
        <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/10 md:bg-primary/8 border border-primary/20 rounded-lg p-3 md:p-2 max-w-3xl mt-4'>
           <div className='flex flex-col md:flex-row w-full'>
            <img src={image_base_url + item.show.movie.backdrop_path} alt={item.show.movie.title} className='w-full md:w-45 md:max-w-45 aspect-video h-auto rounded object-cover object-bottom' />
            <div className='flex flex-col p-3 md:p-4 w-full md:w-80'>
              <p className='text-base md:text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-xs md:text-sm mt-1'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-xs md:text-sm mt-3 md:mt-auto'>{dateFormat(item.show.showDateTime)}</p>
           </div>
        </div> 

        <div className='flex flex-col items-start md:items-end md:text-right justify-between p-3 md:p-4 pt-0 md:pt-4 w-full md:w-auto'>
          <div className='flex items-center justify-between md:justify-end w-full md:w-auto gap-4 mb-3 md:mb-0'>
            <p className='text-xl md:text-2xl font-semibold md:mb-3'>{currency}{item.amount}</p>
            {!item.isPaid && (
              <Link to={item.paymentLink}
                className='bg-primary px-6 py-2 md:px-4 md:py-1.5 md:mb-3 text-sm rounded-full font-medium cursor-pointer block text-center hover:bg-primary/80 transition-colors'
              >
                Pay Now
              </Link>
            )}
          </div>
          <div className='text-xs md:text-sm w-full bg-black/20 md:bg-transparent p-3 md:p-0 rounded-md md:rounded-none'>
            <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
            <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(', ')}</p>
          </div>
          </div>
        </div> 
      ))}

    </div>
  ) : <Loading/>
}

export default MyBookings
// import React from 'react'
// import Loading from '../components/Loading.jsx'
// import BlurCircle from '../components/BlurCircle.jsx'
// import { timeFormat } from '../lib/utils.js'
// import { useAppContext } from '../context/AppContext.jsx'
// import dateFormat from '../lib/dateFormat.js'
// import { Link } from 'react-router-dom'

// const MyBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY

//    const { axios, getToken, user, image_base_url} = useAppContext()

//   const [bookings, setBookings] = React.useState([])
//   const [isLoading, setIsLoading] = React.useState(true)

  
//   const getMyBookings = async () => {
//     try {
//       const {data} = await axios.get('/api/user/bookings' ,{
//         headers: {Authorization: `Bearer ${await getToken()}`}
//       })

//       if(data.success){
//         setBookings(data.bookings)
//       }
//     } catch (error) {
//       console.log(error.message);
      
//     }
//     setIsLoading(false)
//   }
  
//   React.useEffect(() => {
//     if(user){
//       getMyBookings()
//     }
//   }, [user])

//   return !isLoading ? (
//     <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
//       <BlurCircle top="10px" left="100px" />
//       <div>
//         <BlurCircle bottom='0px' left='600px'/>
//       </div>
//       <h1 className='text-2xl font-semibold mb-4'>My Bookings</h1>

//       {bookings.map((item,index)=>(
//         <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg p-2 max-w-3xl mt-4'>
//            <div className='flex flex-col md:flex-row'>
//             <img src={image_base_url + item.show.movie.backdrop_path} alt={item.show.movie.title} className='md:max-w-45 aspect-video h-auto rounded object-cover object-bottom' />
//             <div className='flex flex-col p-4 w-80'>
//               <p className='text-lg font-semibold'>{item.show.movie.title}</p>
//               <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
//               <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
//            </div>
//         </div> 

//         <div className='flex flex-col md:iems-end md:text-right justify-between items-end p-4'>
//           <div className='flex items-center gap-4'>
//             <p className='text-2xl font-semibold mb-3 '>{currency}{item.amount}</p>
//             {!item.isPaid && (
//               <Link to={item.paymentLink}
//                 className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer block text-center hover:bg-primary/80 transition-colors'
//               >
//                 Pay Now
//               </Link>
//             )}
//           </div>
//           <div className='text-sm'>
//             <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
//             <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(', ')}</p>
//           </div>
//           </div>
//         </div> 
//       ))}


//     </div>
//   ) : <Loading/>
// }

// export default MyBookings