import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='absolute w-[93%] text-center p-1 top-0' onClick={() => {
        props.setVehiclePanel(false)
      }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>

      <div className='flex justify-between items-center'>
        <img className='h-16' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png" alt="" />
        <div className='text-right'>
          <h2 className='font-medium text-lg'>Sarthak</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP 04 AB 1234</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
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
      </div>
    </div>
  )
}

export default WaitingForDriver;
