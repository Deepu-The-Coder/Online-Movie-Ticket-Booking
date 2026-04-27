import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon, CalendarIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import Title from '../../components/Title';
import Loading from '../../components/Loading';
import BlurCircle from '../../components/BlurCircle';
import dateFormat from '../../lib/dateFormat.js';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const {axios, getToken, user, image_base_url} = useAppContext()
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY
    
    const [dashboardData, setDashboardData] = React.useState({
        totalBookings:0,
        totalRevenue:0,
        activeShows:[],
        totalUser: 0
    });
    
    const [loading,setLoading] = React.useState(true);

    const dashboardCards = [
        {title: "Total Bookings", value: dashboardData.totalBookings || "0" , icon:ChartLineIcon},
        {title: "Total Revenue", value: `${currency} ${dashboardData.totalRevenue || "0"}`, icon:CircleDollarSignIcon},
        {title: "Active Shows", value: dashboardData.activeShows.length || "0", icon:PlayCircleIcon},
        {title: "Total Users", value: dashboardData.totalUser || "0", icon:UsersIcon},
    ]

    const fetchDashboardData = async()=>{
        try {
            const {data} = await axios.get("/api/admin/dashboard", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if(data.success){
                setDashboardData(data.dashboardData)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(user) fetchDashboardData();
    },[user])

  return !loading ? (
    <div className='pb-10 w-full overflow-x-hidden'>
       <Title text1="Admin" text2="Dashboard" />

       {/* Stats Grid */}
       <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-8'>
            {dashboardCards.map((card, index)=>(
                <div key={index} className='bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex items-center justify-between'>
                    <div>
                        <p className='text-[10px] uppercase tracking-widest text-gray-500 font-bold'>{card.title}</p>
                        <p className='text-lg md:text-2xl font-bold mt-1'>{card.value}</p>
                    </div>
                    <div className='bg-primary/20 p-2 rounded-lg'>
                        <card.icon className="w-5 h-5 text-primary" />
                    </div>
                </div>
            ))}
       </div>

       <p className='mt-12 text-lg font-semibold flex items-center gap-2'>
            <PlayCircleIcon className='w-5 h-5 text-primary'/> Active Shows
       </p>

       {/* IMPROVED: Cards styled like "My Bookings" */}
       <div className='flex flex-col gap-4 mt-6'>
        {dashboardData.activeShows.map((show)=>(
            <div key={show._id} 
                 className='flex flex-col md:flex-row bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 group'>
                
                {/* Movie Backdrop/Banner */}
                <div className='relative w-full md:w-64 h-40 md:h-auto'>
                    <img src={image_base_url + show.movie.backdrop_path} 
                         className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                         alt={show.movie.title} />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden'></div>
                    <div className='absolute bottom-3 left-3 md:hidden'>
                        <span className='bg-primary px-2 py-1 rounded text-[10px] font-bold text-white'>ACTIVE</span>
                    </div>
                </div>

                {/* Info Section */}
                <div className='flex-1 p-5 flex flex-col justify-between'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <h2 className='text-xl font-bold text-white'>{show.movie.title}</h2>
                            <div className='flex items-center gap-4 mt-2'>
                                <div className='flex items-center gap-1 text-xs text-gray-400'>
                                    <CalendarIcon className='w-3 h-3 text-primary'/>
                                    {dateFormat(show.showDateTime)}
                                </div>
                                <div className='flex items-center gap-1 text-xs text-gray-400'>
                                    <StarIcon className='w-3 h-3 text-yellow-500 fill-yellow-500'/>
                                    {show.movie.vote_average.toFixed(1)}
                                </div>
                            </div>
                        </div>
                        <p className='text-2xl font-black text-primary'>{currency}{show.showPrice}</p>
                    </div>

                    <div className='flex items-center justify-between mt-6 pt-4 border-t border-white/5'>
                        <div className='flex gap-2'>
                             <span className='text-[10px] bg-white/5 px-3 py-1 rounded-full text-gray-300 border border-white/10'>
                                Bookings: {Object.keys(show.occupiedSeats || {}).length}
                             </span>
                        </div>
                        <button onClick={() => navigate(`/movies/${show.movie._id}`)}
                        className='text-xs font-bold text-primary hover:underline'>View Details →</button>
                    </div>
                </div>
            </div>
        ))}
       </div>
    </div>
  ) : <Loading/>
}

export default Dashboard
// import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
// import React, { useEffect } from 'react'
// import Title from '../../components/Title';
// import Loading from '../../components/Loading';
// import BlurCircle from '../../components/BlurCircle';
// import dateFormat from '../../lib/dateFormat.js';
// import { useAppContext } from '../../context/AppContext.jsx';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {

//     const {axios, getToken, user, image_base_url} = useAppContext()
//     const navigate = useNavigate()
//     const currency = import.meta.env.VITE_CURRENCY
    
//     const [dashboardData, setDashboardData] = React.useState({
//         totalBookings:0,
//         totalRevenue:0,
//         activeShows:[],
//         totalUser: 0
//     });
    
//     const [loading,setLoading] = React.useState(true);

//     const dashboardCards = [
//         {title: "Total Bookings", value: dashboardData.totalBookings || "0" , icon:ChartLineIcon},
//         {title: "Total Revenue", value: `${currency} ${dashboardData.totalRevenue || "0"}`, icon:CircleDollarSignIcon},
//         {title: "Active Shows", value: dashboardData.activeShows.length || "0", icon:PlayCircleIcon},
//         {title: "Total Users", value: dashboardData.totalUser || "0", icon:UsersIcon},
//     ]

//     const fetchDashboardData = async()=>{
//         try {
//             const {data} = await axios.get("/api/admin/dashboard",
//                 {headers:{
//                     Authorization: `Bearer ${await getToken()}`
//                 }}
//             )

//             if(data.success){
//                 setDashboardData(data.dashboardData)
//                 setLoading(false)
//             }else{
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             if (error.response?.status === 403) {
//                 toast.error("You are not authorized as an Admin!! ");
//                 navigate("/");   
//                 } else if (error.response?.status === 401) {
//                 toast.error("Please login first");
//                 navigate("/");
//                 } else {
//                 toast.error("Error Fetching dashboard data");
//                 }
//                     }
//     };

//     useEffect(()=>{
//         if(user){
//         fetchDashboardData();
//         }
//     },[user])

//   return !loading ? (
//     <>
//        <Title text1="Admin" text2="Dashboard" />

//        <div className='relative flex flex-wrap gap-4 mt-6'>
//          <BlurCircle top="-100" left="0"/>
//          <div className='flex flex-wrap gap-4 w-full'>
//             {dashboardCards.map((card, index)=>(
//                 <div key={index} className='flex items-center justify-between px-4 py-3  bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
//                    <div>
//                    <h1 className='text-sm'>{card.title}</h1>
//                    <p className="text-xl font-medium mt-1">
//                     {card.value}
//                     </p>
//                 </div>
//          <card.icon className="w-6 h-6" />
//          </div>
//             ))}
//        </div>
//        </div>

//        <p className='mt-10 text-lg font-medium'>Active Shows</p>
//        <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl'>
//         <BlurCircle top="100px" left="10%" />
//         {dashboardData.activeShows.map((show)=>(
//             <div key={show._id} 
//             className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300 cursor-pointer'>
//                 <img src={image_base_url + show.movie.poster_path} alt="" className='w-full h-60 object-cover'/>
//                 <p className='font-medium p-2 truncate'>
//                     {show.movie.title}
//                 </p>
//                 <div className='flex items-center justify-between px-2'>
//                     <p className='text-lg font-medium'>
//                         {currency} {show.showPrice}
//                     </p>
//                     <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
//                         <StarIcon className='w-4 h-4 text-primary fill-primary'/>
//                         {show.movie.vote_average.toFixed(1)}
//                     </p>
//                 </div>

//                 <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
//             </div>
//         ))}
//        </div>
//     </>
//   ) : <Loading/>
// }

// export default Dashboard