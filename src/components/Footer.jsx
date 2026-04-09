import React from 'react'
import google from "../assets/google.svg"
import apple from "../assets/apple.svg"
import BlurCircle from './BlurCircle'
const Footer = () => {
  return (
    <>
    <div className='flex mt-40 justify-center mb-10 gap-40 text-slate-200 '>
        <div className='flex flex-col gap-4'>
            <h1 className='text-red-500 flex text-4xl font-bold items-center'>Q<h1 className='text-white text-xl font-bold'>uickWatch</h1></h1>
            <div className='w-100 text-sm'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
            <div className='flex gap-2'>
                <img src={google} alt=''/>
                <img src={apple} alt=''/>
            </div>
        </div>
        <div className='flex gap-40'>
            <div className='flex flex-col gap-6'>
                <div className='text-lg font-semibold'>Company</div>
                <div className='flex flex-col text-sm'>
                <div>Home</div>
                <div>About us</div>
                <div>Contact us</div>
                <div>Privacy policy</div>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='text-lg font-semibold'>Get in touch</div>
                <div className='flex flex-col text-sm'>
                <div>+91-72xxxxxx08</div>
                <div>xyz@gmail.com</div>
            </div>

        </div>
    </div>
    </div>
    <hr className=" border-gray-600 border mx-45" />
    <div className='text-center mb-5 mt-2'>Copyright 2026 © GreatStack. All Right Reserved.</div>
    </>
  )
}

export default Footer