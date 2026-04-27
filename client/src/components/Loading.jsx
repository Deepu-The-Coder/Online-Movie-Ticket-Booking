import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

  const {nextUrl} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(nextUrl){
      const timer = setTimeout(()=>{
        navigate('/' + nextUrl)
      }, 8000)
      
      return () => clearTimeout(timer)
    }
  }, [nextUrl, navigate]) 

  return (
    <div className='flex justify-center items-center h-[70vh] md:h-[80vh]'>
        <div className='animate-spin rounded-full h-10 w-10 md:h-14 md:w-14 border-2 border-t-primary'></div>
    </div>
  )
}

export default Loading

// import React from 'react'
// import { useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'

// const Loading = () => {

//   const {nextUrl} = useParams()
//   const navigate = useNavigate()

//   useEffect(()=>{
//     if(nextUrl){
//       setTimeout(()=>{
//         navigate('/' + nextUrl)
//       },8000)
//     }
//   })
//   return (
//     <div className='flex justify-center items-center h-[80vh]'>
//         <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary'></div>

//     </div>
//   )
// }

// export default Loading