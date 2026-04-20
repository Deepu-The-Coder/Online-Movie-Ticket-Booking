import React from 'react'
import CastList from '../components/CastList.jsx'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dummyShowData from "../assets/dummyShowData.js"
import dummyDateTimeData from "../assets/dummyDateTimeData.js"
import Card from '../components/Card.jsx'
import BlurCircle from '../components/BlurCircle.jsx'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import { timeFormat } from '../lib/utils.js'
import DateSelect from '../components/DateSelect.jsx'
import Loading from '../components/Loading.jsx'
// 👇 1. Import toast for user feedback
import { toast } from 'react-hot-toast' 

const MovieDetails = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [show, setShow] = useState(null)
  
  // 👇 2. State to track if this specific movie is a favorite
  const [isFavorite, setIsFavorite] = useState(false)

  const getShow = async () => {
    const foundShow = dummyShowData.find((show) => String(show.id) === id)
    if(foundShow){
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      })
    }
  }

  // 👇 3. Check if movie is already in favorites when the page loads
  useEffect(() => {
    getShow();
    
    // Read from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if this movie's ID exists in the saved favorites array
    const isSaved = savedFavorites.some(fav => String(fav.id) === id);
    setIsFavorite(isSaved);
  }, [id])

  // 👇 4. Function to handle clicking the heart
  const toggleFavorite = () => {
    let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      // If it's already a favorite, filter it OUT of the array
      savedFavorites = savedFavorites.filter(fav => String(fav.id) !== id);
      toast.success("Removed from Favorites");
    } else {
      // If it's NOT a favorite, push the WHOLE movie object into the array
      // (Saving the whole object makes building the Favourites page much easier later!)
      savedFavorites.push(show.movie);
      toast.success("Added to Favorites!");
    }
    
    // Save back to localStorage and update our state
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  }

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.image} alt={show.movie.title} className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top="-100px" left="-100px" />
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {show.movie.rating} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>

          <p>
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(' | ')} • {show.movie.releaseYear?.split("-")[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className='w-5 h-5'/>
              Watch Trailer
              </button>
            <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
            
            {/* 👇 5. Add onClick and dynamic styling to the Heart button */}
            <button 
              onClick={toggleFavorite}
              className='p-2.5 text-sm bg-gray-700 hover:bg-gray-900 transition rounded-full cursor-pointer active:scale-95'
            >
              <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-primary text-primary' : 'text-white'}`} />
            </button>
            
          </div>
        </div>
      </div>

      <CastList casts={show.movie.casts} folderName={show.movie.folderName} />
      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='grid grid-cols-3 gap-10'>
            
            {dummyShowData.slice(4,8).map((item) => {
              return(
              <Card 
              key={item.id} // Added missing key prop here!
              title={item.title} 
              image={item.image} 
              about={item.about}
              rating={item.rating}
              id={item.id}
               />
            )
          })}
        </div>
        <div className='flex justify-center mt-5'>
          <button 
          onClick={() => {navigate('/movies'); 
            window.scrollTo(0, 0)}}
          className=' w-32 px-6 py-2 bg-primary hover:bg-primary-dull transition rounded-lg font-medium cursor-pointer duration-300'>Show More</button>
        </div>
    
    </div>
  ) : <Loading />
}

export default MovieDetails