import React from 'react'
import Title from './Title' 

const Contact = () => {
  return (
    <div className='w-full max-w-4xl mx-auto px-4 py-10 sm:py-16 md:py-24'>
        
      {/* Header Section */}
      <div className='text-center mb-8 sm:mb-10'>
        <Title text1="Contact" text2="Us" />
        <p className='text-gray-400 mt-3 text-sm md:text-base'>
          Have a question or want to work together? Drop us a message!
        </p>
      </div>

      {/* Form Section */}
      <form className='space-y-4 sm:space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          
          {/* Name Input */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1 sm:mb-2'>
              Your Name
            </label>
            <input
              type='text'
              placeholder='John Doe'
              className='w-full px-4 py-3 bg-[#1a1a1a]/50 border border-gray-800 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1 sm:mb-2'>
              Your Email
            </label>
            <input
              type='email'
              placeholder='john@example.com'
              className='w-full px-4 py-3 bg-[#1a1a1a]/50 border border-gray-800 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
              required
            />
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-1 sm:mb-2'>
            Message
          </label>
          <textarea
            rows='5'
            placeholder='How can we help you?'
            className='w-full px-4 py-3 bg-[#1a1a1a]/50 border border-gray-800 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none'
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className='text-center mt-6 sm:mt-8'>
          <button
            type='button' 
            className='px-10 py-3 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-all cursor-pointer w-full md:w-auto'
          >
            Send Message
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default Contact

// import React from 'react'
// import Title from './Title' // Reusing your existing Title component

// const Contact = () => {
//   return (
//     <div className='w-full max-w-4xl mx-auto px-4 py-16 md:py-24'>
        
//       {/* Header Section */}
//       <div className='text-center mb-10'>
//         <Title text1="Contact" text2="Us" />
//         <p className='text-gray-400 mt-3 text-sm md:text-base'>
//           Have a question or want to work together? Drop us a message!
//         </p>
//       </div>

//       {/* Form Section */}
//       <form className='space-y-6'>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          
//           {/* Name Input */}
//           <div>
//             <label className='block text-sm font-medium text-gray-300 mb-2'>
//               Your Name
//             </label>
//             <input
//               type='text'
//               placeholder='John Doe'
//               className='w-full px-4 py-3 bg-[#1a1a1a]/50 border border-gray-800 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
//               required
//             />
//           </div>

//           {/* Email Input */}
//           <div>
//             <label className='block text-sm font-medium text-gray-300 mb-2'>
//               Your Email
//             </label>
//             <input
//               type='email'
//               placeholder='john@example.com'
//               className='w-full px-4 py-3 bg-[#1a1a1a]/50 border border-gray-800 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'
//               required
//             />
//           </div>
//         </div>

//         {/* Message Input */}
//         <div>
//           <label className='block text-sm font-medium text-gray-300 mb-2'>
//             Message
//           </label>
//           <textarea
//             rows='5'
//             placeholder='How can we help you?'
//             className='w-full px-4 py-3 bg-[#1a1a1a]/50 border border-gray-800 rounded-md text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none'
//             required
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <div className='text-center mt-8'>
//           <button
//             type='button' 
//             className='px-10 py-3 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-all cursor-pointer w-full md:w-auto'
//           >
//             Send Message
//           </button>
//         </div>
//       </form>
      
//     </div>
//   )
// }

// export default Contact