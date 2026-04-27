import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  
  return (
    <div className='min-h-screen bg-black overflow-x-hidden'>
        <AdminNavbar/>
        <div className='flex'>
            <AdminSidebar/>
            
            {/* 1. Added px-3 for mobile to maximize workspace on S20 Ultra 
               2. Kept your md:px-10 for laptop
               3. Used overflow-y-auto so the sidebar stays fixed while content scrolls
            */}
            <main className='flex-1 px-3 py-6 md:px-10 md:py-10 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-white/[0.02]'>
                <div className='max-w-7xl mx-auto'>
                    <Outlet/>
                </div>
            </main>
        </div>
    </div>
  )
}

export default Layout
// import React from 'react'
// import AdminNavbar from '../../components/admin/AdminNavbar'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import { Outlet } from 'react-router-dom'
// const Layout = () => {
  
//   return (
//     <>
//         <AdminNavbar/>
//         <div className='flex'>
//             <AdminSidebar/>
//         <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
//             <Outlet/>
//         </div>
//         </div>
//     </>
//   )
// }

// export default Layout