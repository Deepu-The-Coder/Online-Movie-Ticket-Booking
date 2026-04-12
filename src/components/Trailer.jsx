import React, { useState } from 'react';
import youtube from "../assets/youtube.png"
import BlurCircle from './BlurCircle';


const Trailer = () => {
  // 1. Set the initial state to your default video ID (XNQbH1SDPRk)
  const [currentVideoId, setCurrentVideoId] = useState('XNQbH1SDPRk');

  // 2. The function to update the state
  const handleCardClick = (newVideoId) => {
    setCurrentVideoId(newVideoId); 
  };

  return (
    <div className='flex flex-col pl-45 mt-25 '>
      <div className='text-3xl text-slate-200 mb-6'>Trailers</div>
        
      {/* 3. The main iframe is now bound to the currentVideoId state */}
      <iframe 
        width="918" 
        height="540" 
        src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}     // do autopay=0
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      ></iframe>

      <div className="flex w-229.5 gap-4">
  
        {/* Notice the arrow function: () => handleCardClick(...) */}
        <div className="relative cursor-pointer brightness-75 hover:brightness-110 transition-all hover:-translate-y-1  duration-300" onClick={() => handleCardClick("KPCMsJgJ3UI")}>
          <img src="https://img.youtube.com/vi/KPCMsJgJ3UI/hqdefault.jpg" alt="Trailer 1 Thumbnail" className="rounded-md" />   

          <img 
            src={youtube}
            alt="yt"
            className="absolute inset-0 m-auto w-12 h-12 brightness-75 hover:brightness-110 transition-all"
  />     
        </div>

        <div className="cursor-pointer brightness-75 hover:brightness-110 transition-all hover:-translate-y-1  duration-300" onClick={() => handleCardClick("NHk7scrb_9I")}>
          <img src="https://img.youtube.com/vi/NHk7scrb_9I/hqdefault.jpg" alt="Trailer 2 Thumbnail" className="rounded-md" />       
          <img 
            src={youtube}
            alt="yt"
            className="absolute inset-0 m-auto w-12 h-12 brightness-75 hover:brightness-110 transition-all"
  />     
        </div>
        
        <div className="cursor-pointer brightness-75 hover:brightness-110 transition-all hover:-translate-y-1  duration-300" onClick={() => handleCardClick("ejMMn0t58Lc")}>
          <img src="https://img.youtube.com/vi/ejMMn0t58Lc/hqdefault.jpg" alt="Trailer 3 Thumbnail" className="rounded-md" />       
          <img 
            src={youtube}
            alt="yt"
            className="absolute inset-0 m-auto w-12 h-12 brightness-75 hover:brightness-110 transition-all"
  />     
        </div>

        <div className="cursor-pointer brightness-75 hover:brightness-110 transition-all hover:-translate-y-1  duration-300" onClick={() => handleCardClick("yy1Fdp_h4mM")}>
          <img src="https://img.youtube.com/vi/yy1Fdp_h4mM/hqdefault.jpg" alt="Trailer 4 Thumbnail" className="rounded-md" />
          <img 
            src={youtube}
            alt="yt"
            className="absolute inset-0 m-auto w-12 h-12 brightness-75 hover:brightness-110 transition-all"
  />     
        </div>

      </div>
    </div>
  );
}

export default Trailer;




// import React,{useState} from 'react'

// const Trailer = () => {
//   // 1. We declare our state variable and the function to update it
// const [currentVideoId, setCurrentVideoId] = useState('DEFAULT_VIDEO_ID');

// // 2. We use React's onClick to update the state when a card is clicked
// const handleCardClick = (newVideoId) => {
//   setCurrentVideoId(newVideoId); 
// }

// // 3. The iframe's src is permanently bound to whatever the state currently is
// <iframe 
//   src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
//   // ... other attributes
// />

//   return (
//     <div className='flex flex-col pl-45 mt-20 gap-10'>
//         <div className='text-3xl  text-slate-200'>Trailers</div>
//         <iframe 
//           width="918" 
//           height="540" 
//           src="https://www.youtube.com/embed/XNQbH1SDPRk?rel=0" 
//           title="YouTube video player" 
//           frameborder="0" 
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//           allowfullscreen>
//         </iframe>
//         <div class="flex w-229.5 gap-2">
  
//           <div class="suggestion-card" onclick={handleCardClick("KPCMsJgJ3UI")}>
//             <img src="https://img.youtube.com/vi/KPCMsJgJ3UI/hqdefault.jpg" alt="Trailer 1 Thumbnail"/>
//             <p>Movie Trailer 1</p>
//           </div>

//           <div class="suggestion-card" onclick={handleCardClick("NHk7scrb_9I")}>
//             <img src="https://img.youtube.com/vi/NHk7scrb_9I/hqdefault.jpg" alt="Trailer 2 Thumbnail"/>
//             <p>Movie Trailer 2</p>
//           </div>

//           <div class="suggestion-card" onclick={handleCardClick("ejMMn0t58Lc")}>
//             <img src="https://img.youtube.com/vi/ejMMn0t58Lc/hqdefault.jpg" alt="Trailer 3 Thumbnail"/>
//             <p>Movie Trailer 3</p>
//           </div>

//           <div class="suggestion-card" onclick={handleCardClick("yy1Fdp_h4mM")}>
//             <img src="https://img.youtube.com/vi/yy1Fdp_h4mM/hqdefault.jpg" alt="Trailer 4 Thumbnail"/>
//             <p>Movie Trailer 4</p>
//           </div>

//       </div>
        
//     </div>
//   )
// }

// export default Trailer