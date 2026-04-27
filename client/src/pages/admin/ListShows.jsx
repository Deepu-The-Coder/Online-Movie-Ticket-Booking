import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import dateFormat from '../../lib/dateFormat';
import BlurCircle from '../../components/BlurCircle';
import { useAppContext } from '../../context/AppContext';

const ListShows = () => {

    const currency = import.meta.env.VITE_CURRENCY
    const { axios, getToken, user, image_base_url } = useAppContext()

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllShows = async () => {
        try {
            // FIXED: Added parentheses to getToken()
            const { data } = await axios.get("/api/admin/all-shows", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                setShows(data.shows)
            }
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            getAllShows();
        }
    }, [user]);

    return !loading ? (
        <div className='pb-10'>
            <Title text1="List" text2="Shows" />
            
            <div className='hidden md:block'>
                <BlurCircle top="70px" left="250px" />
            </div>

            <div className='mt-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0'>
                <div className='inline-block min-w-full align-middle'>
                    <div className='overflow-hidden border border-primary/20 rounded-lg'>
                        <table className='min-w-full divide-y divide-primary/20 text-nowrap'>
                            <thead>
                                <tr className='bg-primary/20 text-left text-white'>
                                    <th className='p-4 text-xs md:text-sm font-semibold pl-5'>Movie</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold'>Show Time</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold text-center'>Bookings</th>
                                    <th className='p-4 text-xs md:text-sm font-semibold pr-5 text-right'>Earnings</th>
                                </tr>
                            </thead>
                            <tbody className='text-xs md:text-sm font-light divide-y divide-primary/10'>
                                {shows.map((show, index) => {
                                    const bookingCount = Object.keys(show.occupiedSeats || {}).length;
                                    return (
                                        <tr key={index} className='bg-primary/5 hover:bg-primary/10 transition-colors'>
                                            <td className='p-3 pl-5'>
                                                <div className='flex items-center gap-3'>
                                                    <img 
                                                        src={image_base_url + show.movie.poster_path} 
                                                        className='w-8 h-12 rounded object-cover border border-white/10 hidden sm:block' 
                                                        alt="" 
                                                    />
                                                    <span className='font-medium text-white'>{show.movie.title}</span>
                                                </div>
                                            </td>
                                            <td className='p-4 text-gray-400'>
                                                {dateFormat(show.showDateTime)}
                                            </td>
                                            <td className='p-4 text-center'>
                                                <span className='bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] md:text-xs font-bold'>
                                                    {bookingCount}
                                                </span>
                                            </td>
                                            <td className='p-4 text-right pr-5 font-semibold text-green-400'>
                                                {currency} {(bookingCount * show.showPrice).toLocaleString()}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <p className='md:hidden text-center text-gray-500 text-[10px] mt-4 italic'>
                Scroll horizontally to view earnings and time details
            </p>
        </div>
    ) : <Loading />
}

export default ListShows
// import React, { useEffect, useState } from 'react'
// import Loading from '../../components/Loading';
// import Title from '../../components/Title';
// import dateFormat from '../../lib/dateFormat';
// import BlurCircle from '../../components/BlurCircle';
// import { useAppContext } from '../../context/AppContext';

// const ListShows = () => {

//     const currency =import.meta.env.VITE_CURRENCY

//     const {axios, getToken, user} = useAppContext()

//     const [shows, setShows] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getAllShows = async () =>{
//         try{
//             const {data} = await axios.get("/api/admin/all-shows",{
//                 headers: {Authorization: `Bearer ${await getToken}`}
//             })
//             setShows(data.shows)
//             setLoading(false);
//         }
//         catch(error){
//             console.log(error);
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             getAllShows();
//         }
//     }, [user]);
//   return !loading ? (
//     <>
//         <Title text1="List" text2="Shows"/>
//         <BlurCircle top="70px" left="250px"/>
//         <div className='max-w-4xl mt-6 overflow-x-auto'>
//             <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
//                 <thead>
//                     <tr className='bg-primary/20 text-left text-white'>
//                         <th className='p-2 font-medium pl-5'>Movie Name</th>
//                         <th className='p-2 font-medium '>Show Time</th>
//                         <th className='p-2 font-medium '>Total Bookings</th>
//                         <th className='p-2 font-medium '>Earnings</th>
//                     </tr>
//                 </thead>
//                 <tbody className='text-sm font-light'>
//                     {shows.map((show, index)=>(
//                         <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
//                             <td className='p-2 min-w-45 pl-5'>
//                                 {show.movie.title}
//                             </td>
//                             <td className='p-2'>
//                                 {dateFormat(show.showDateTime)}
//                             </td>
//                             <td className='p-2'>
//                                 {Object.keys(show.occupiedSeats).length}
//                             </td>
//                             <td className='p-2'>
//                                 {currency} {(Object.keys(show.occupiedSeats).length * show.showPrice)} 
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//         </div>
//     </>
//   ) : <Loading/>
// }

// export default ListShows