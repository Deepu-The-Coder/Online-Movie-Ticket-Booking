import React from 'react'
import HeroSection from '../components/HeroSection'
import Trailer from '../components/Trailer'
import FeaturedSection from '../components/FeaturedSection'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <main className='w-full overflow-x-hidden'>
      <HeroSection/>
      <FeaturedSection/>
      <Trailer/>
      <Contact/>
    </main>
  )
}

export default Home

// import React from 'react'
// import HeroSection from '../components/HeroSection'
// import Trailer from '../components/Trailer'
// import FeaturedSection from '../components/FeaturedSection'
// import Contact from '../components/Contact'

// const Home = () => {
//   return (
//     <>
//     <HeroSection/>
//     <FeaturedSection/>
//     <Trailer/>
//     <Contact/>
//     </>
//   )
// }

// export default Home