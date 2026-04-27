import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-10 h-16 border-b border-gray-300/30 bg-black/50 backdrop-blur-md sticky top-0 z-50'>
        <Link to='/'>
        <h1 className='text-red-500 flex text-3xl md:text-5xl font-bold items-center'>
          Q<span className='text-white text-lg md:text-2xl font-bold'>uickWatch</span>
        </h1>
        </Link>
    </div>
  )
}

export default AdminNavbar
// import React from 'react'
// import { Link } from 'react-router-dom'

// const AdminNavbar = () => {
//   return (
//     <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
//         <Link to='/'>
//         <h1 className='text-red-500 flex text-5xl font-bold items-center'>Q<span className='text-white text-2xl font-bold'>uickWatch</span></h1>
//         </Link>
//     </div>
//   )
// }

// export default AdminNavbar