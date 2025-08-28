import React from 'react'
import { useContext } from 'react';
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2V9i8xsBdYJRpANAiQw3cmO1EL8OF_Edyg&s" alt="" />
                    <h4 className='text-lg font-medium capitalize'>
                        {captain?.fullname?.firstName + " " + captain?.fullname?.lastName}
                    </h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹ 345.32</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex justify-center items-start gap-8 bg-gray-100 rounded-xl p-3 mt-8'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-line"></i>
                    <h5 className='text-lg font-medium'>10.2 Hrs</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium'>102.3KM</h5>
                    <p className='text-sm text-gray-600'>Distance</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-pages-fill"></i>
                    <h5 className='text-lg font-medium'>Notes+</h5>
                    <p className='text-sm text-gray-600'>Add Notes</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
