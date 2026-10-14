import { Link } from 'react-router-dom'
import google from '../assets/google.svg'
import apple from '../assets/apple.svg'
import BlurCircle from './BlurCircle'

const Footer = () => (
  <footer className='relative mt-20 overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#111012] to-[#09090B] text-slate-300'>
    <BlurCircle top='-150px' right='-100px' />

    <div className='relative mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10 lg:px-12'>
      <section className='max-w-lg'>
        <Link to='/' aria-label='QuickWatch home' className='inline-flex items-center'>
          <span className='text-4xl font-bold tracking-tight text-primary'>Q</span>
          <span className='-ml-1 text-2xl font-semibold tracking-tight text-white'>uickWatch</span>
        </Link>
        <p className='mt-4 max-w-md text-sm leading-7 text-gray-400'>
          It is a high-performance movie ticketing platform designed to bridge the gap between
          &quot;wanting to watch&quot; and &quot;walking into the theatre.&quot; Built for the modern
          cinephile who values time as much as the cinematic experience.
        </p>
        <div className='mt-6'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>Get the app</p>
          <div className='flex flex-wrap gap-3'>
            <img src={google} alt='Get it on Google Play' className='h-10 w-auto transition hover:opacity-80' />
            <img src={apple} alt='Download on the App Store' className='h-10 w-auto transition hover:opacity-80' />
          </div>
        </div>
      </section>

      <nav aria-label='Company' className='md:justify-self-center'>
        <h2 className='text-sm font-semibold text-white'>Company</h2>
        <ul className='mt-5 space-y-3 text-sm text-gray-400'>
          <li><Link to='/' className='transition hover:text-primary'>Home</Link></li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy policy</li>
        </ul>
      </nav>

      <section>
        <h2 className='text-sm font-semibold text-white'>Get in touch</h2>
        <div className='mt-5 space-y-3 text-sm text-gray-400'>
          <p>+91-72xxxxxx08</p>
          <p>xyz@gmail.com</p>
        </div>
        <p className='mt-6 max-w-xs text-xs leading-5 text-gray-500'>
          Here to help make your next movie night a great one.
        </p>
      </section>
    </div>

    <div className='relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12'>
      <div className='flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between'>
        <p>Copyright 2026 © QuickWatch. All rights reserved.</p>
        <p>Made for movie lovers.</p>
      </div>
    </div>
  </footer>
)

export default Footer
