import React from 'react'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-screen pt-8 flex flex-col justify-between'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white px-4 py-4 pb-7'>
            <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
            <Link to="/login" className='flex items-center justify-center bg-black text-white rounded-2xl py-3 w-full mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
