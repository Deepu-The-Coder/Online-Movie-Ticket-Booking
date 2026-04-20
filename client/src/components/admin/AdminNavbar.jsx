import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>
        <Link to='/'>
        <h1 className='text-red-500 flex text-5xl font-bold items-center'>Q<span className='text-white text-2xl font-bold'>uickWatch</span></h1>
        </Link>
    </div>
  )
}

export default AdminNavbar