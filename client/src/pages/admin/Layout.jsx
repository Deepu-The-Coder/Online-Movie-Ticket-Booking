import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import Loading from '../../components/Loading'

const Layout = () => {
  const {isAdmin, isCheckingAdmin} = useAppContext()

  // 1. If we are still waiting for the API, show the loading screen
  if (isCheckingAdmin) {
      return <Loading/>
  }

  // 2. If the API is done and they are an admin, show the layout
  // (If they aren't an admin, AppContext has already redirected them to '/')
  return isAdmin ? (
    <>
        <AdminNavbar/>
        <div className='flex'>
            <AdminSidebar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
            <Outlet/>
        </div>
        </div>
    </>
  ) : null
}

export default Layout