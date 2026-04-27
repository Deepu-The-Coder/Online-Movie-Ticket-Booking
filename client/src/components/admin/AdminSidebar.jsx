import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import profile from '../../assets/profile.png'

const AdminSidebar = () => {

    const user ={
        firstName:"Admin",
        lastName:"User",
        imageUrl: profile
    }

    const adminNavLinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin/add-shows', icon:PlusSquareIcon },
        { name: 'List Shows', path: '/admin/list-shows', icon:ListIcon },
        { name: 'List Bookings', path: '/admin/list-bookings', icon:ListCollapseIcon },
    ]
    
  return (
    <aside>
        {/* Adjusted width: w-16 on mobile (icons only), w-60 on desktop (icons + text) */}
        <div className='h-[calc(100vh-64px)] flex flex-col items-center pt-8 w-16 md:w-60 border-r border-gray-300/20 text-sm sticky top-16'>
         
         <img className='h-8 w-8 md:h-14 md:w-14 rounded-full mx-auto object-cover border border-primary/30' src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
         
         <p className='mt-2 text-base font-medium hidden md:block'>{user.firstName} {user.lastName}</p>
         
         <div className='w-full mt-6 md:mt-10'>
            {adminNavLinks.map((link, index)=>(
                <NavLink key={index} to={link.path}  end
                className={({isActive}) => `relative flex items-center justify-center md:justify-start gap-3 w-full py-4 md:py-3 md:pl-10 text-gray-400 transition-all ${isActive ? 'bg-primary/15 text-primary' : 'hover:bg-white/5'}`}>
                    {({isActive})=>(
                        <>
                        <link.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'}`}/>
                        
                        {/* Hidden text on mobile, visible on desktop */}
                        <p className='hidden md:block font-medium'>{link.name}</p>
                        
                        {/* Indicator bar: Visible on active state */}
                        <span className={`w-1 h-8 md:h-10 rounded-l-full right-0 absolute transition-all ${isActive ? 'bg-primary' : 'bg-transparent'}`}/>
                        </>
                    )}
                </NavLink>
            ))}
         </div>

        </div>
    </aside>
  )
}

export default AdminSidebar
// import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import profile from '../../assets/profile.png'

// const AdminSidebar = () => {

//     const user ={
//         firstName:"Admin",
//         lastName:"User",
//         imageUrl: profile
//     }

//     const adminNavLinks = [
//         { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
//         { name: 'Add Shows', path: '/admin/add-shows', icon:PlusSquareIcon },
//         { name: 'List Shows', path: '/admin/list-shows', icon:ListIcon },
//         { name: 'List Bookings', path: '/admin/list-bookings', icon:ListCollapseIcon },
//     ]
//   return (
//     <div>
//         <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-60 border-r border-gray-300/20 text-sm'>
//          <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
//          <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>
//          <div className='w-full'>
//             {adminNavLinks.map((link, index)=>(
//                 <NavLink key={index} to={link.path}  end
//                 className={({isActive}) => `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
//                     {({isActive})=>(
//                         <>
//                         <link.icon className='w-5 h-5'/>
//                         <p className='max-md:hidden'>{link.name}</p>
//                         <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`}/>
//                         </>
//                     )}
//                 </NavLink>
//             ))}
//          </div>

//         </div>
//     </div>
//   )
// }

// export default AdminSidebar