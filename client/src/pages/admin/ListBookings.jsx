import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import dateFormat from '../../lib/dateFormat'
import BlurCircle from '../../components/BlurCircle'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY

    const { axios, getToken, user } = useAppContext()

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllBookings = async () => {
        try {
            // FIXED: Added parentheses to getToken()
            const { data } = await axios.get("/api/admin/all-bookings", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setBookings(data.bookings)
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    };

    useEffect(() => {
        if (user) {
            getAllBookings();
        }
    }, [user]);

    return !isLoading ? (
        <div className='pb-10'>
            <Title text1="List" text2="Bookings" />
            
            <div className='hidden md:block'>
                <BlurCircle top="70px" left="250px" />
            </div>

            {/* SCROLL WRAPPER: 
               -mx-4 and px-4 allows the table shadow/border to touch the screen edges 
               while maintaining internal alignment. 
            */}
            <div className='mt-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0'>
                <div className='inline-block min-w-full align-middle'>
                    <div className='overflow-hidden border border-primary/20 rounded-lg'>
                        <table className='min-w-full divide-y divide-primary/20 text-nowrap'>
                            <thead>
                                <tr className='bg-primary/20 text-left text-white'>
                                    <th className='p-4 text-xs md:text-sm font-semibold pl-5'>User Name</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold'>Movie Name</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold'>Show Time</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold'>Seats</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold pr-5'>Amount</th>
                                </tr>
                            </thead>
                            <tbody className='text-xs md:text-sm font-light divide-y divide-primary/10'>
                                {bookings.map((item, index) => (
                                    <tr key={index} className='bg-primary/5 hover:bg-primary/10 transition-colors'>
                                        <td className='p-4 pl-5 font-medium text-white'>{item.user.name}</td>
                                        <td className='p-4 text-gray-300'>{item.show.movie.title}</td>
                                        <td className='p-4 text-gray-400'>{dateFormat(item.show.showDateTime)}</td>
                                        <td className='p-4'>
                                            <span className='bg-black/30 px-2 py-1 rounded border border-white/5'>
                                                {item.bookedSeats?.join(", ")}
                                            </span>
                                        </td>
                                        <td className='p-4 font-semibold text-primary pr-5'>
                                            {currency} {item.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* Mobile Helper Text */}
            <p className='md:hidden text-center text-gray-500 text-[10px] mt-4 italic'>
                Swipe left/right to view more booking details
            </p>
        </div>
    ) : <Loading />
}

export default ListBookings
// import React, { useEffect, useState } from 'react'
// import Loading from '../../components/Loading'
// import Title from '../../components/Title'
// import dateFormat from '../../lib/dateFormat'
// import BlurCircle from '../../components/BlurCircle'
// import { useAppContext } from '../../context/AppContext'

// const ListBookings = () => {
//     const currency= import.meta.env.VITE_CURRENCY

//     const {axios, getToken, user} = useAppContext()

//     const [bookings,setBookings] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     const getAllBookings = async()=>{
//         try {
//             const {data} = await axios.get("/api/admin/all-bookings",{
//                 headers: {Authorization: `Bearer ${await getToken}`}
//             })
//             setBookings(data.bookings)
//         } catch (error) {
//             console.log(error);
            
//         }
//         setIsLoading(false)
//     };

//     useEffect(()=> {
//         if(user){
//             getAllBookings();
//         }
//     }, [user]);

//   return !isLoading ? (
//     <>
//     <Title text1="List" text2="Bookings"/>
//     <BlurCircle top="70px" left="250px"/>
//     <div className='max-w-4xl mt-6 overflow-x-auto'>
//         <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
//             <thead>
//                 <tr className='bg-primary/20 text-left text-white'>
//                   <th className='p-2 font-medium pl-5'>User Name</th>
//                   <th className='p-2 font-medium'>Movie Name</th>
//                   <th className='p-2 font-medium'>Show Time</th>
//                   <th className='p-2 font-medium'>Seats</th>
//                   <th className='p-2 font-medium'>Amount</th>
//                 </tr>
//             </thead>
//             <tbody className='text-sm font-light'>
//                 {bookings.map((item,index) => (
//                     <tr key={index} className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
//                         <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
//                         <td className='p-2'>{item.show.movie.title}</td>
//                         <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
//                         <td className='p-2'>{item.bookedSeats?.join(", ")}</td>
//                         {/* <td className='p-2'>{Object.keys(item.bookedSeats).map(seat=> item.bookedSeats[seat]).join(", ")}</td> */}
//                         <td className='p-2'>{currency} {item.amount}</td>
//                     </tr>
//                 ))}

//             </tbody>

//         </table>
//     </div>
//     </>
//   ) : <Loading/>
// }

// export default ListBookings