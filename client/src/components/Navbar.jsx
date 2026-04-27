import { useClerk, UserButton, useUser } from '@clerk/react'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const navigate = useNavigate()
    
    // State to handle mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className='flex gap-4 md:gap-10 py-3 md:py-5 px-4 md:px-25 z-[100] fixed top-0 left-0 w-full justify-between md:justify-around items-center bg-black/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none mt-0 md:mt-2'>

            {/* Logo */}
            <Link to='/' onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0) }} className='z-[110]'>
                <h1 className='text-red-500 flex text-3xl md:text-5xl font-bold items-center'>
                    Q<span className='text-white text-lg md:text-3xl font-bold'>uickWatch</span>
                </h1>
            </Link>

            {/* Desktop & Mobile Navigation Menu */}
            <div className={`
                ${isMenuOpen ? 'translate-x-0 opacity-100' : 'max-md:translate-x-full max-md:opacity-0 md:flex'} 
                fixed md:static top-0 right-0 h-screen md:h-auto w-full md:w-auto 
                flex flex-col md:flex-row items-center justify-center md:justify-start 
                gap-8 md:gap-6 px-8 py-3 
                bg-black/95 md:bg-white/10 backdrop-blur-2xl md:backdrop-blur-md 
                md:border border-gray-300/20 md:rounded-full 
                transition-all duration-300 ease-in-out z-[105]
            `}>
                
                {/* Close button for mobile - Only visible when menu is open */}
                <XIcon 
                    onClick={() => setIsMenuOpen(false)} 
                    className='md:hidden absolute top-7 right-6 w-8 h-8 cursor-pointer text-white' 
                />

                <Link onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0) }} to='/' className='text-xl md:text-lg font-medium hover:text-primary transition-colors'>Home</Link>
                <Link onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0) }} to='/movies' className='text-xl md:text-lg font-medium hover:text-primary transition-colors'>Movies</Link>
                <Link onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0) }} to='/favourites' className='text-xl md:text-lg font-medium hover:text-primary transition-colors'>Favourites</Link>
                <Link onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0) }} to='/admin' className='text-xl md:text-lg font-medium hover:text-primary transition-colors'>Dashboard</Link>
                
                {/* Search icon inside mobile menu */}
                <div className='md:hidden flex items-center gap-2 mt-4 px-6 py-3 bg-white/10 rounded-full w-full max-w-[250px]'>
                    <SearchIcon className='w-5 h-5 text-gray-400' />
                    <input type="text" placeholder="Search..." className='bg-transparent outline-none text-sm w-full' />
                </div>
            </div>

            {/* Right side Actions */}
            <div className='flex items-center gap-4 md:gap-8 z-[110]'>
                <SearchIcon className='hidden md:block w-6 h-6 cursor-pointer hover:text-primary transition-colors' />

                {
                    !user ? (
                        <button 
                            onClick={() => { setIsMenuOpen(false); openSignIn(); }} 
                            className='px-5 py-2 md:px-7 md:py-2 text-sm md:text-base bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
                        >
                            Login
                        </button>
                    ) : (
                        <UserButton afterSignOutUrl="/">
                            <UserButton.MenuItems>
                                <UserButton.Action 
                                    label="My Bookings" 
                                    labelIcon={<TicketPlus width={15}/>} 
                                    onClick={() => { setIsMenuOpen(false); navigate('/my-bookings'); }}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    )
                }

                {/* Hamburger Icon for mobile */}
                <MenuIcon 
                    onClick={() => setIsMenuOpen(true)} 
                    className='md:hidden w-8 h-8 cursor-pointer text-white hover:text-primary transition-colors' 
                />
            </div>

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