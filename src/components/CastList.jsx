import React from 'react'

// 👈 Notice we added folderName to the props
const CastList = ({ casts, folderName }) => { 
  if (!casts || casts.length === 0) {
    return <p className='text-gray-400 mt-8'>No cast information available.</p>;
  }

  return (
    <div className='mt-25'>
      <p className='mb-4 font-semibold'>Your Favourite Cast</p>
      
      <div className='flex items-center gap-4 w-235 px-4 overflow-x-auto no-scrollbar pb-4'>
        {casts.slice(0, 12).map((actorName, index) => {
          
          // 👇 THE MAGIC HAPPENS HERE 👇
          // Converts "Owen Wilson" -> "owen_wilson"
          const formattedFileName = actorName.toLowerCase().replace(/ /g, "_"); 
          
          // Constructs the final path: "/casts/cars/owen_wilson.jpg"
          const imagePath = `/casts/${folderName}/${formattedFileName}.png`;

          return (
            <div key={index} className='flex flex-col items-center text-center'>
              <img 
                // Use the dynamically generated path!
                src={imagePath} 
                alt={actorName} 
                className='rounded-full h-20 md:h-20 aspect-square object-cover bg-gray-800'
              />
              <p className='font-medium text-xs mt-3 w-20 truncate'>{actorName}</p> 
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default CastList;