import React, { useRef, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;

  const [finishRidePanel,setFinishRidePanel] = useState(false);
  const finishRidePanelRef= useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      });
    }
    else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, { dependencies: [finishRidePanel] });

  return (
    <div className='h-screen relative'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to="/captain-home" className="h-10 w-10 flex justify-center items-center rounded-full bg-white ">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-4/5'>
        <LiveTracking/>
      </div>

      <div className='h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative pt-10'
        onClick={()=>{
          setFinishRidePanel(true);
        }}
      >
        <h5 className='absolute w-[93%] text-center p-1 top-0' onClick={() => {
        }}><i className="text-3xl text-gray-700 ri-arrow-up-wide-line pt-14"></i></h5>
        <h4 className='text-xl font-semibold'>4 Km away</h4>
        <button onClick={() => {
        }} className='bg-green-600 text-white font-semibold p-4 px-8 rounded-lg'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 px-3 py-6 w-full translate-y-full bg-white pt-12'>
        <FinishRide 
          rideData={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  )
}

export default CaptainRiding
