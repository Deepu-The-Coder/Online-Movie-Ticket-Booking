import React from 'react'
import dummyShowsData from '../../assets/dummyShowsData.js'
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import BlurCircle from '../../components/BlurCircle.jsx'
import { CheckIcon, StarIcon } from 'lucide-react'

const AddShows = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState([])
  const [selectedMovie, setSelectedMovie] = React.useState(null)
  const [dateTimeSelection, setDateTimeSelection] = React.useState({})
  const [dateTimeInput, setDateTimeInput] = React.useState('')
  const [showPrice, setShowPrice] = React.useState('')

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData)
  };

  const handleDateTimeAdd = () => {
    if(!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if(!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if(!times.includes(time)) {
         // FIXED: Changed 'data' to 'date'
         return { ...prev, [date]: [...times, time]};
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      // FIXED: Changed 'data' to 'date'
      const filteredTimes = prev[date].filter((t) => t !== time);
      if(filteredTimes.length === 0){
        // FIXED: Changed 'data' to 'date'
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        // FIXED: Changed 'data' to 'date'
        [date]: filteredTimes,
      };
    });
  };

  React.useEffect(() => {
    fetchNowPlayingMovies()
  }, [])


  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="Shows"/>
      <BlurCircle top="70px" left="250px"/>
      <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
      
      {/* Increased gap slightly for a cleaner grid */}
      <div className='group flex flex-wrap gap-6 mt-4 w-full'>
        {nowPlayingMovies.map((movie) => (
          <div 
            key={movie.id} 
            onClick={() => setSelectedMovie(movie.id)}
            // FIXED: Tailwind hover class typo is fixed so fading works perfectly
            className='relative w-36 md:w-40 cursor-pointer hover:!opacity-100 group-hover:opacity-40 hover:-translate-y-1 transition-all duration-300'
          >
            
            {/* NEW: Locked aspect ratio container for the image + rating bar */}
            <div className='relative rounded-lg overflow-hidden aspect-[2/3]'>
              <img src={movie.poster_path} alt={movie.title} className='w-full h-full object-cover brightness-90' />
              
              <div className='text-xs flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                <p className='flex items-center gap-1 text-gray-300'>
                  <StarIcon className='w-3.5 h-3.5 text-primary fill-primary'/>
                  {movie.vote_average?.toFixed(1)}
                </p>
                <p className='text-gray-400'>{movie.vote_count} Votes</p>
              </div>
            </div>

            {/* Selection Checkmark */}
            {selectedMovie === movie.id && (
              <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded-full shadow-lg z-10'>
                  <CheckIcon className='w-4 h-4 text-white' strokeWidth={3}/>
              </div>  
            )}
            
            {/* NEW: Text is now safely outside the image container */}
            <div className='mt-2'>
              <p className='font-medium truncate text-sm md:text-base'>{movie.title}</p>
              <p className='text-gray-400 text-xs mt-0.5'>{movie.release_date}</p>  
            </div>

          </div>
        ))}
      </div>

      {/* Show Price Input */}
      <div className='mt-8'>
          <label className='block text-sm font-medium mb-2'>Show Price</label>  
          <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
            <p className='text-gray-400 text-sm'>{currency}</p>
            <input min={0} type='number' value={showPrice} onChange={(e) => setShowPrice(e.target.value)}
            placeholder='Enter show price'
            className='outline-none' />
          </div>
      </div>

      {/* Date and Time Selection */}
      <div className='mt-6'>
        <label className='block text-sm font-medium mb-2'>
          Select Date and Time
        </label>
        <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
          <input type='datetime-local' value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)}
          className='outline-none rounded-md' />
          <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer transition-colors'>
            Add Time
          </button>
        </div>
      </div>
    </>
  ) : <Loading/>
}

export default AddShows