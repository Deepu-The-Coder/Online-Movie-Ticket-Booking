import { useClerk, UserButton, useUser } from '@clerk/react'
import { MenuIcon, TicketPlus, XIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  const navLinkClass = ({ isActive }) => (
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary/15 text-white'
        : 'text-gray-300 hover:bg-white/[0.06] hover:text-white'
    }`
  )

  return (
    <header className='fixed left-1/2 top-4 z-[70] w-[calc(100%-2rem)] max-w-[1100px] -translate-x-1/2'>
      <div className='relative flex min-h-16 items-center justify-between rounded-2xl border border-white/10 bg-[#100e10]/80 px-4 shadow-xl shadow-black/80 backdrop-blur-xs sm:px-6'>
        <Link to='/' onClick={closeMenu} aria-label='QuickWatch home' className='flex shrink-0 items-center'>
          <span className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>Q</span>
          <span className='-ml-1 text-xl font-semibold tracking-tight text-white sm:text-2xl'>uickWatch</span>
        </Link>

        <nav aria-label='Main navigation' className='hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.01] py-1 px-4 md:flex'>
          <NavLink to='/' onClick={closeMenu} className={navLinkClass}>Home</NavLink>
          <NavLink to='/movies' onClick={closeMenu} className={navLinkClass}>Movies</NavLink>
          <NavLink to='/favourites' onClick={closeMenu} className={navLinkClass}>Favourites</NavLink>
          <NavLink to='/my-bookings' onClick={closeMenu} className={navLinkClass}>My Bookings</NavLink>
          <NavLink to='/admin' onClick={closeMenu} className={navLinkClass}>Dashboard</NavLink>
        </nav>

        <div className='flex shrink-0 items-center gap-3 sm:gap-4'>
          {!user ? (
            <button
              type='button'
              onClick={() => openSignIn()}
              className='rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-dull'
            >
              Login
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15} />} onClick={() => navigate('/my-bookings')} />
              </UserButton.MenuItems>
            </UserButton>
          )}

          <button
            type='button'
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-navigation'
            onClick={() => setIsMenuOpen(open => !open)}
            className='grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-200 transition hover:border-primary/40 hover:bg-primary/10 md:hidden'
          >
            {isMenuOpen ? <XIcon className='h-5 w-5' /> : <MenuIcon className='h-5 w-5' />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id='mobile-navigation'
            aria-label='Mobile navigation'
            className='absolute left-0 right-0 top-[calc(100%+0.6rem)] flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#100e10]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden'
          >
            <NavLink to='/' onClick={closeMenu} className={navLinkClass}>Home</NavLink>
            <NavLink to='/movies' onClick={closeMenu} className={navLinkClass}>Movies</NavLink>
            <NavLink to='/favourites' onClick={closeMenu} className={navLinkClass}>Favourites</NavLink>
            <NavLink to='/admin' onClick={closeMenu} className={navLinkClass}>Dashboard</NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
