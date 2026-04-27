import { useClerk, UserButton, useUser,   } from '@clerk/react'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import React from 'react'
import { Link , useNavigate} from 'react-router-dom'

const Navbar = () => {

  const {user} = useUser()
  const {openSignIn} = useClerk()
  const navigate = useNavigate()

  return (
    <div className='flex gap-4 md:gap-10 py-3 md:py-5 px-4 md:px-25 z-70 fixed top-0 left-0 w-full justify-between md:justify-around items-center mt-0 md:mt-2 bg-black/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none'>

      <Link to='/' className='max-md:flex-1'>
        <h1 className='text-red-500 flex text-3xl md:text-5xl font-bold items-center'>
          Q<span className='text-white text-lg md:text-2xl font-bold'>uickWatch</span>
        </h1>
      </Link>

      <div className='hidden md:flex flex-row items-center gap-6 px-8 py-3 rounded-full backdrop-blur bg-white/10 border border-gray-300/20 overflow-hidden transition-[width] duration-300'>

        {/* <XIcon className='max-md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' /> */}
        <Link onClick={() => {window.scrollTo(0, 0)}} to='/' >Home</Link>
        <Link onClick={() => {window.scrollTo(0, 0)}} to='/movies' >Movies</Link>
        <Link onClick={() => {window.scrollTo(0, 0)}} to='/favourites' >Favourites</Link>
        <Link onClick={() => {window.scrollTo(0, 0)}} to='/admin' >Dashboard</Link>
      </div>

      <div className='flex items-center gap-4 md:gap-8'>
        <SearchIcon className='hidden md:block w-6 h-6 cursor-pointer' />

        {
          !user ? (
            <button onClick={() => openSignIn()}  className='px-5 py-2 md:px-7 md:py-2 text-sm md:text-base bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
          ) :(
            <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
                  </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      {/* <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' /> */}

    </div>
  )
}

export default Navbar

// import { useClerk, UserButton, useUser,   } from '@clerk/react'
// import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
// import React from 'react'
// import { Link , useNavigate} from 'react-router-dom'

// const Navbar = () => {

//   const {user} =useUser()
//   const {openSignIn} = useClerk()
//   const navigate = useNavigate()

//   return (
//     <div className='flex gap-10 py-5 px-25 z-70 fixed top-0 left-0 w-full justify-around items-center mt-2'>

//       <Link to='/' className='max-md:flex-1'>
//         <h1 className='text-red-500 flex text-5xl font-bold items-center'>Q<span className='text-white text-2xl font-bold'>uickWatch</span></h1>
//       </Link>


//       <div className='max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-6  min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300'>

//         {/* <XIcon className='max-md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' /> */}
//         <Link onClick={() => {scrollTo(0, 0)}} to='/' >Home</Link>
//         <Link onClick={() => {scrollTo(0, 0)}} to='/movies' >Movies</Link>
//         <Link onClick={() => {scrollTo(0, 0)}} to='/favourites' >Favourites</Link>
//         <Link onClick={() => {scrollTo(0, 0)}} to='/admin' >Dashboard</Link>
//       </div>

//       <div className='flex items-center gap-8'>
//         <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer' />

//         {
//           !user ? (
//             <button onClick={() => openSignIn()}  className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
//           ) :(
//             <UserButton>
//                   <UserButton.MenuItems>
//                     <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
//                   </UserButton.MenuItems>
//             </UserButton>
//           )
//         }
//       </div>

//       {/* <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' /> */}



//     </div>
//   )
// }

// export default Navbar