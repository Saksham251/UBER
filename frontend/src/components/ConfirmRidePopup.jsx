import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopup = (props) => {
  const [otp,setOtp] = useState('');

  const submitHandler = (e)=>{
    e.preventDefault();
  }
  return (
    <div>
      <h5 className='absolute w-[93%] text-center p-1 top-0' onClick={() => {
        props.setConfirmRidePopupPanel(false)
      }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line pt-14"></i></h5>
      <h3 className='text-2xl mb-3 font-semibold'>Confirm this ride to Start</h3>

      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3 justify-center'>
          <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2V9i8xsBdYJRpANAiQw3cmO1EL8OF_Edyg&s" alt="" />
          <h2 className='text-lg font-medium'>Harsh Patel</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className='flex flex-col gap-2 justify-between items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="ri-map-pin-range-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kanariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kanariya Talab, Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 mb-5'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>193.20</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <input 
              value={otp}
              onChange={(e)=>{setOtp(e.target.value)}}
              className="bg-[#eee] rounded-lg px-6 py-4 font-mono text-lg w-full mt-3"
              type="text" placeholder='Enter the OTP'
            />
            <Link to={"/captain-riding"} className='text-lg bg-green-600 flex justify-center w-full text-white font-semibold p-3 rounded-lg mt-5'>
              Confirm
            </Link>
            <button onClick={() => {
              props.setConfirmRidePopupPanel(false);
              props.setRidePopupPanel(false);
            }}
              className='mt-2 bg-red-500 text-lg w-full text-white font-semibold p-3 rounded-lg'
            >Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopup
