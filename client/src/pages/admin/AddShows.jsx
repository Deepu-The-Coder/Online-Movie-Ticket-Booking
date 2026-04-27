import React from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import BlurCircle from '../../components/BlurCircle.jsx'
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext.jsx'
import { kConverter } from '../../lib/kConverter.js'
import toast from 'react-hot-toast'

const AddShows = () => {

  const { axios, getToken, user, image_base_url } = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState([])
  const [selectedMovie, setSelectedMovie] = React.useState(null)
  const [dateTimeSelection, setDateTimeSelection] = React.useState({})
  const [dateTimeInput, setDateTimeInput] = React.useState('')
  const [showPrice, setShowPrice] = React.useState('')
  const [addingShow, setAddingShow] = React.useState(false)

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get('/api/show/now_playing', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      }
      )
      if (data.success) {
        setNowPlayingMovies(data.movies)
      }
    } catch (error) {
      console.log('Error fetching movies: ', error);

    }
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setAddingShow(true)

      if (!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice) {
        setAddingShow(false)
        return toast.error('Missing required Fields!')
      }

      const showsInput = Object.entries(dateTimeSelection).map(([date, time]) =>
        ({ date, time })
      );

      const payload = {
        movie_id: selectedMovie,
        showsInput,
        showPrice: Number(showPrice)
      }
      const { data } = await axios.post('/api/show/add', payload,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setSelectedMovie(null)
        setDateTimeSelection({})
        setShowPrice("")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log("Submission Error: ", error);
      toast.error('An Errror occurred. Please try again.')
    }
    setAddingShow(false)
  }

  React.useEffect(() => {
    if (user) {
      fetchNowPlayingMovies()
    }
  }, [user])


  return nowPlayingMovies.length > 0 ? (
    <div className='pb-10'>
      <Title text1="Add" text2="Shows" />
      
      <div className='hidden md:block'>
        <BlurCircle top="70px" left="250px" />
      </div>

      <p className='mt-8 md:mt-10 text-base md:text-lg font-medium'>Now Playing Movies</p>

      {/* horizontal scroll for movies on mobile */}
      <div className='overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0'>
        <div className='flex flex-nowrap md:flex-wrap gap-4 mt-4 w-max md:w-full'>
          {nowPlayingMovies.map((movie) => (
            <div key={movie.id}
              onClick={() => setSelectedMovie(movie.id)}
              className={`relative w-36 md:max-w-40 cursor-pointer hover:-translate-y-1 transition duration-300 ${selectedMovie && selectedMovie !== movie.id ? 'opacity-50' : 'opacity-100'}`}>
              <div className='relative rounded-lg overflow-hidden aspect-[2/3]'>
                <img src={image_base_url + movie.poster_path} alt='' className='w-full h-full object-cover brightness-90' />
                <div className='text-[10px] md:text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                  <p className='flex items-center gap-1 text-gray-400'>
                    <StarIcon className='w-3 h-3 md:w-4 md:h-4 text-primary fill-primary' />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className='text-gray-300'>
                    {kConverter(movie.vote_count)}
                  </p>
                </div>
              </div>
              {selectedMovie === movie.id && (
                <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded z-10'>
                  <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5} />
                </div>
              )}
              <p className='font-medium truncate text-sm mt-2'>{movie.title}</p>
              <p className='text-gray-400 text-xs truncate'>{movie.release_date.split('-')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-6 md:gap-12'>
        {/* Show Price Input */}
        <div className='mt-8 w-full md:w-auto'>
          <label className='block text-sm font-medium mb-2'>Show Price</label>
          <div className='flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md w-full md:w-64'>
            <p className='text-gray-400 text-sm'>{currency}</p>
            <input min={0} type='number' value={showPrice} onChange={(e) => setShowPrice(e.target.value)}
              placeholder='Enter show price'
              className='outline-none bg-transparent w-full text-sm' />
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className='mt-0 md:mt-8 w-full md:w-auto'>
          <label className='block text-sm font-medium mb-2'>
            Select Date and Time
          </label>
          <div className='flex items-center gap-2 border border-gray-600 p-1 pl-3 rounded-lg w-full md:w-auto'>
            <input type='datetime-local' value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)}
              className='outline-none bg-transparent rounded-md text-sm flex-1' />
            <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-4 py-2 text-xs md:text-sm rounded-lg hover:bg-primary cursor-pointer transition-colors whitespace-nowrap'>
              Add Time
            </button>
          </div>
        </div>
      </div>

      {/* Display Selected Times  */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className='mt-8 p-4 bg-white/5 rounded-xl border border-white/10'>
          <h2 className='mb-4 font-semibold text-sm md:text-base border-b border-white/10 pb-2'>
            Selected Date-Time Slots
          </h2>
          <ul className='space-y-4'>
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date} className='bg-black/20 p-3 rounded-lg'>
                <div className='font-medium text-primary text-sm mb-2'>{date}</div>
                <div className='flex flex-wrap gap-2 text-xs'>
                  {times.map((time) => (
                    <div key={time} className='bg-gray-800 border border-gray-600 px-3 py-1.5 flex items-center rounded-full'>
                      <span>{time}</span>
                      <DeleteIcon onClick={() => handleRemoveTime(date, time)} width={14}
                        className='ml-2 text-red-500 hover:text-red-400 cursor-pointer' />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit} disabled={addingShow}
        className='w-full md:w-auto bg-primary text-white px-10 py-3 mt-10 rounded-lg md:rounded-full hover:bg-primary/90 transition-all cursor-pointer font-semibold disabled:opacity-50'>
        {addingShow ? 'Adding...' : 'Add Show'}
      </button>
    </div>
  ) : <Loading />
}

export default AddShows
// import React from 'react'
// import Loading from '../../components/Loading'
// import Title from '../../components/Title'
// import BlurCircle from '../../components/BlurCircle.jsx'
// import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react'
// import { useAppContext } from '../../context/AppContext.jsx'
// import { kConverter } from '../../lib/kConverter.js'
// import toast from 'react-hot-toast'
// import axios from 'axios'

// const AddShows = () => {

//   const {axios, getToken, user, image_base_url} = useAppContext()
//   const currency = import.meta.env.VITE_CURRENCY
//   const [nowPlayingMovies, setNowPlayingMovies] = React.useState([])
//   const [selectedMovie, setSelectedMovie] = React.useState(null)
//   const [dateTimeSelection, setDateTimeSelection] = React.useState({})
//   const [dateTimeInput, setDateTimeInput] = React.useState('')
//   const [showPrice, setShowPrice] = React.useState('')
//   const [addingShow, setAddingShow] =React.useState(false)

//   const fetchNowPlayingMovies = async () => {
//     try {
//       const {data} = await axios.get('/api/show/now_playing', {
//         headers: {
//           Authorization: `Bearer ${await getToken()}`
//         }}
//       )
//       if(data.success){
//         setNowPlayingMovies(data.movies )
//       }
//     } catch (error) {
//       console.log('Error fetching movies: ', error);
      
//     }
//   };

//   const handleDateTimeAdd = () => {
//     if(!dateTimeInput) return;
//     const [date, time] = dateTimeInput.split("T");
//     if(!date || !time) return;

//     setDateTimeSelection((prev) => {
//       const times = prev[date] || [];
//       if(!times.includes(time)) {
//          return { ...prev, [date]: [...times, time]};
//       }
//       return prev;
//     });
//   };

//   const handleRemoveTime = (date, time) => {
//     setDateTimeSelection((prev) => {
//       const filteredTimes = prev[date].filter((t) => t !== time);
//       if(filteredTimes.length === 0){
//         const { [date]: _, ...rest } = prev;
//         return rest;
//       }
//       return {
//         ...prev,
//         [date]: filteredTimes,
//       };
//     });
//   };

//   const handleSubmit = async () =>{
//     try {
//       setAddingShow(true)

//       if(!selectedMovie || Object.keys(dateTimeSelection).length ===0 || !showPrice){
//         return toast.error('Missing required Fields!')
//       }

//       const showsInput = Object.entries(dateTimeSelection).map(([date,time])=>
//       ({date,time})
//       );

//       const payload = {
//         movie_id : selectedMovie,    //here use movie_id instead of movieId as in backend movie_id is used everywhere
//         showsInput,
//         showPrice: Number(showPrice)
//       }
//       const {data} = await axios.post('/api/show/add', payload ,
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}` 
//           }
//         }
//       )

//       if(data.success){
//         toast.success(data.message)
//         setSelectedMovie(null)
//         setDateTimeSelection({})
//         setShowPrice("")
//       }else{
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log("Submission Error: " , error);
//       toast.error('An Errror occurred. Please try again.')
//     }
//     setAddingShow(false)
//   }

//   React.useEffect(() => {
//     if(user){
//       fetchNowPlayingMovies()
//     }
//   }, [user])


//   return nowPlayingMovies.length > 0 ? (
//     <>
//       <Title text1="Add" text2="Shows"/>
//       <BlurCircle top="70px" left="250px"/>
//       <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>

//       <div className='overflow-x-auto pb-4'>
//         <div className='group flex flex-wrap gap-4 mt-4 w-max'>
//             {nowPlayingMovies.map((movie) => (
//               <div key={movie.id}
//               onClick={()=> setSelectedMovie(movie.id)}
//               className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300`}>
//                 <div className='relative rounded-lg overflow-hidden'>
//                   <img src={image_base_url + movie.poster_path} alt='' className='w-full object-cover brightness-90'/>
//                   <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
//                     <p className='flex items-center gap-1 text-gray-400'>
//                       <StarIcon className='w-4 h-4 text-primary fill-primary'/>
//                       {movie.vote_average.toFixed(1)}
//                     </p>
//                     <p className='text-gray-300'>
//                       {kConverter(movie.vote_count)} Votes
//                     </p>
//                   </div>
//                 </div>
//               {selectedMovie === movie.id && (
//                 <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
//                   <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>
//                 </div>
//               )}
//               <p className='font-medium truncate'>{movie.title}</p>
//               <p className='font-medium truncate'>{movie.release_date}</p>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Show Price Input */}
//       <div className='mt-8'>
//           <label className='block text-sm font-medium mb-2'>Show Price</label>  
//           <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
//             <p className='text-gray-400 text-sm'>{currency}</p>
//             <input min={0} type='number' value={showPrice} onChange={(e) => setShowPrice(e.target.value)}
//             placeholder='Enter show price'
//             className='outline-none' />
//           </div>
//       </div>

//       {/* Date and Time Selection */}
//       <div className='mt-6'>
//         <label className='block text-sm font-medium mb-2'>
//           Select Date and Time
//         </label>
//         <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
//           <input type='datetime-local' value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)}
//           className='outline-none rounded-md' />
//           <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer transition-colors'>
//             Add Time
//           </button>
//         </div>
//       </div>

//       {/* Display Selected Times  */}
//       {Object.keys(dateTimeSelection).length> 0 && (
//         <div className='mt-6' >
//           <h2 className='mb-2'>
//             Selected Date-Time
//           </h2>       
//           <ul className='space-y-3'>
//             {Object.entries(dateTimeSelection).map(([date,times])=>(
//               <li key={date}>
//                 <div className='font-medium'>{date}</div>
//                 <div className='flex flex-wrap gap-2 mt-1 text-sm'>
//                   {times.map((time)=>(
//                     <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
//                       <span>{time}</span>
//                       <DeleteIcon onClick={() => handleRemoveTime(date,time)} width={15} 
//                       className='ml-2 text-red-500 hover:text-red-700 cursor-pointer' />
//                     </div>
//                   ))}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <button 
//       onClick={handleSubmit} disabled={addingShow}
//       className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'> 
//         Add Show
//       </button>
//       </>
//   ) : <Loading/>
// }

// export default AddShows