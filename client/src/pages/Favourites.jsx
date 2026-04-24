import React from 'react'
import Card from '../components/Card'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext.jsx'
import Loading from '../components/Loading.jsx'


const Movies = () => {
  
  const {favoriteMovies} = useAppContext()
  return favoriteMovies.length > 0 ? (
    <div className='mt-40 mx-45 flex flex-col gap-10'>
      <BlurCircle top="20px" left="100px" />
      <BlurCircle top="700px" left="300px" />
      <BlurCircle top="500px" right="50px" />
        <div className='flex flex-col justify-between gap-7'>
        <span className='text-xl'>Now Showing..</span>
        
        <div className='grid grid-cols-3 gap-10'>
            
            {favoriteMovies.map((movie)=>(
              <Card movie={movie} key={movie._id}/>
            ))
            }
        </div>
        </div>
        </div>
  ) : 
  <div className='flex flex-col items-center justify-center h-screen'>
    <h1 className='text-3xl font-bold text-center'>No Movies Available</h1>
  </div>

}

export default Movies










// import React, { useState, useEffect } from 'react'
// import Title from '../components/Title'
// import Card from '../components/Card'
// import BlurCircle from '../components/BlurCircle'
// import { Trash2 } from 'lucide-react' // 👇 Added a Trash icon from Lucide
// import { toast } from 'react-hot-toast' // 👇 Added toast for feedback

// const Favourites = () => {
//   const [favorites, setFavorites] = useState([])

//   useEffect(() => {
//     const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
//     setFavorites(savedFavorites)
//   }, [])

//   // 👇 1. New function to handle removing a movie
//   const removeFavorite = (idToRemove) => {
//     // Filter out the movie the user clicked
//     const updatedFavorites = favorites.filter((movie) => String(movie.id) !== String(idToRemove));
    
//     // Update the state so it disappears from the screen instantly
//     setFavorites(updatedFavorites);
    
//     // Save the new (smaller) array back into the localStorage vault
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
//     toast.success("Removed from favorites");
//   }

//   return (
//     <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      
//       <BlurCircle top="-100px" left="100px" />
//       <BlurCircle bottom='0px' right='0px' />
      
//       <Title text1="My" text2="Favourites" />

//       {favorites.length === 0 ? (
//         <div className='mt-20 flex flex-col items-center justify-center text-gray-400'>
//           <p className='text-xl font-medium text-white'>No favorites yet!</p>
//           <p className='mt-2 text-center max-w-md'>
//             You haven't saved any movies. Go explore the catalog and click the heart icon on a movie to see it here.
//           </p>
//         </div>
//       ) : (
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10'>
//           {favorites.map((item) => (
            
//             // 👇 2. Wrapped the Card in a relative div to place the button on top
//             <div key={item.id} className="relative group">
              
//               <Card 
//                 title={item.title} 
//                 image={item.image || item.poster_path} 
//                 about={item.about || item.overview} 
//                 rating={item.rating || item.vote_average}
//                 id={item.id}
//               />
              
//               {/* 👇 3. The Remove Button (appears when hovering over the card) */}
//               <button 
//                 onClick={() => removeFavorite(item.id)}
//                 className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
//                 title="Remove from favorites"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>

//             </div>

//           ))}
//         </div>
//       )}
      
//     </div>
//   )
// }

// export default Favourites