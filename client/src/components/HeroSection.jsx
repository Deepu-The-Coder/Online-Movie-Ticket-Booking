import React, { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const movies = [
    {
        title: "Stranger Things",
        image: "/background2.jpg",
        logo: "/logo2.png",
        info: "2016-2025 · U/A · Series",
        desc: "In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.",
        genre: "Dark Fantasy | Sci-Fi | Coming-of-Age"
    },
    {
        title: "KFP",
        image: "/background3.jpg",
        logo: "/logo3.png",
        info: "2016 · U/A · 1h 35m",
        desc: 'Continuing his "legendary adventures of awesomeness", Po must face two hugely epic, but different threats: one supernatural and the other a little closer to home.',
        genre: "Action | Comedy | Family"
    },
    {
      title: "Cars 3",
      image: "/background1.png",
      logo: "/logo1.png",
      info: "2017 · U · 1h 42m · 4 Languages",
      desc: "Blindsided by a new generation of racers,Lightning McQueen is pushed out of the sport he loves. To get back in the game, he'll need some help and inspiration.",
      genre: "Animation | Kids | Adventure | Fantasy"
    },
  {
    title: "peaky Blinders",
    image: "/background4.jpg",
    logo: "/logo4.jpg",
    info: "2013-2022 · U/A · Series",
    desc: 'A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.',
    genre: "Gangster | Crime | Drama"
  }
]

const HeroSection = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // 🔁 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [current])

  //moving left
  const handlePrev = () => {
  setFade(false)
  setTimeout(() => {
    setCurrent(prev => (prev - 1 + movies.length) % movies.length)
    setFade(true)
  }, 300)
}

  //arrow keys
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      handleNext()
    }
    if (e.key === "ArrowLeft") {
      handlePrev()
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [])

  // 👉 Next slide
  const handleNext = () => {
    setFade(false)
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % movies.length)
      setFade(true)
    }, 300)
  }

  // 👉 Dot click
  const handleDotClick = (index) => {
    setFade(false)
    setTimeout(() => {
      setCurrent(index)
      setFade(true)
    }, 300)
  }

  // 👉 Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext()
    }
    if (touchStartX.current - touchEndX.current < -50) {
      setFade(false)
      setTimeout(() => {
        setCurrent(prev => (prev - 1 + movies.length) % movies.length)
        setFade(true)
      }, 300)
    }
  }

  const movie = movies[current]

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-screen flex items-center px-4 md:px-16 lg:px-36 overflow-hidden"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${movie.image})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 md:from-black via-black/70 md:via-black/60 to-transparent"></div>
      
      <div
        className={`z-50 flex flex-col gap-4 md:gap-6 max-w-xl mt-10 transition-opacity duration-700 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >

        <img src={movie.logo} className="w-56 md:w-72 lg:w-90" />
       
       <div className='flex flex-col gap-3 md:gap-6 ml-0 md:ml-5'>

        <div className="flex items-center font-semibold text-xs md:text-base">
          {movie.info}
        </div>


        <p className="text-gray-200 text-sm md:text-base">
          {movie.desc}
        </p>


        <p className="font-semibold text-xs md:text-base">
          {movie.genre}
        </p>

        <button
          onClick={() => {
            navigate('/movies');
            window.scrollTo(0,0);
          }}
          className="w-full md:w-fit justify-center md:justify-start flex items-center gap-2 px-6 py-3 mt-2 md:mt-0 bg-primary hover:bg-primary-dull rounded-full font-medium"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
       </div>
        
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
        {movies.map((_, i) => (
          <div
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all ${
              i === current ? 'bg-white scale-125' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection

// import React, { useState, useEffect, useRef } from 'react'
// import { ArrowRight } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// const movies = [
//     {
//         title: "Stranger Things",
//         image: "/background2.jpg",
//         logo: "/logo2.png",
//         info: "2016-2025 · U/A · Series",
//         desc: "In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.",
//         genre: "Dark Fantasy | Sci-Fi | Coming-of-Age"
//     },
//     {
//         title: "KFP",
//         image: "/background3.jpg",
//         logo: "/logo3.png",
//         info: "2016 · U/A · 1h 35m",
//         desc: 'Continuing his "legendary adventures of awesomeness", Po must face two hugely epic, but different threats: one supernatural and the other a little closer to home.',
//         genre: "Action | Comedy | Family"
//     },
//     {
//       title: "Cars 3",
//       image: "/background1.png",
//       logo: "/logo1.png",
//       info: "2017 · U · 1h 42m · 4 Languages",
//       desc: "Blindsided by a new generation of racers,Lightning McQueen is pushed out of the sport he loves. To get back in the game, he'll need some help and inspiration.",
//       genre: "Animation | Kids | Adventure | Fantasy"
//     },
//   {
//     title: "peaky Blinders",
//     image: "/background4.jpg",
//     logo: "/logo4.jpg",
//     info: "2013-2022 · U/A · Series",
//     desc: 'A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.',
//     genre: "Gangster | Crime | Drama"
//   }
// ]

// const HeroSection = () => {
//   const navigate = useNavigate()
//   const [current, setCurrent] = useState(0)
//   const [fade, setFade] = useState(true)

//   const touchStartX = useRef(0)
//   const touchEndX = useRef(0)

//   // 🔁 Auto slide
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext()
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [current])

//   //moving left
//   const handlePrev = () => {
//   setFade(false)
//   setTimeout(() => {
//     setCurrent(prev => (prev - 1 + movies.length) % movies.length)
//     setFade(true)
//   }, 300)
// }

//   //arrow keys
//   useEffect(() => {
//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowRight") {
//       handleNext()
//     }
//     if (e.key === "ArrowLeft") {
//       handlePrev()
//     }
//   }

//   window.addEventListener("keydown", handleKeyDown)

//   return () => {
//     window.removeEventListener("keydown", handleKeyDown)
//   }
// }, [])

//   // 👉 Next slide
//   const handleNext = () => {
//     setFade(false)
//     setTimeout(() => {
//       setCurrent(prev => (prev + 1) % movies.length)
//       setFade(true)
//     }, 300)
//   }

//   // 👉 Dot click
//   const handleDotClick = (index) => {
//     setFade(false)
//     setTimeout(() => {
//       setCurrent(index)
//       setFade(true)
//     }, 300)
//   }

//   // 👉 Swipe
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.targetTouches[0].clientX
//   }

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.targetTouches[0].clientX
//   }

//   const handleTouchEnd = () => {
//     if (touchStartX.current - touchEndX.current > 50) {
//       handleNext()
//     }
//     if (touchStartX.current - touchEndX.current < -50) {
//       setFade(false)
//       setTimeout(() => {
//         setCurrent(prev => (prev - 1 + movies.length) % movies.length)
//         setFade(true)
//       }, 300)
//     }
//   }

//   const movie = movies[current]

//   return (
//     <div
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       className="relative h-screen flex items-center px-6 md:px-16 lg:px-36 overflow-hidden"
//     >
//       {/* Background */}
//       <div
//         className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
//           fade ? 'opacity-100' : 'opacity-0'
//         }`}
//         style={{ backgroundImage: `url(${movie.image})` }}
//       />

//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      
//       <div
//         className={`z-50 flex flex-col gap-6 max-w-xl mt-10 transition-opacity duration-700 ${
//           fade ? 'opacity-100' : 'opacity-0'
//         }`}
//       >

//         <img src={movie.logo} className="w-72 md:w-90" />
       
//        <div className='flex flex-col gap-6 ml-5'>

//         <div className="flex items-center font-semibold">
//           {movie.info}
//         </div>


//         <p className="text-gray-200">
//           {movie.desc}
//         </p>


//         <p className="font-semibold">
//           {movie.genre}
//         </p>

//         <button
//           onClick={() => navigate('/movies')}
//           className="w-fit flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull rounded-full"
//         >
//           Explore Movies
//           <ArrowRight className="w-5 h-5" />
//         </button>
//        </div>
        
//       </div>

//       {/* Dots */}
//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
//         {movies.map((_, i) => (
//           <div
//             key={i}
//             onClick={() => handleDotClick(i)}
//             className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all ${
//               i === current ? 'bg-white scale-125' : 'bg-gray-500'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default HeroSection