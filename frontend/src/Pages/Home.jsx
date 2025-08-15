import React, { useRef, useState } from 'react'
import { gsap } from "gsap";
import {useGSAP} from "@gsap/react";
import "remixicon/fonts/remixicon.css"
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen,setPanelOpen] = useState(false);
  const [vehiclePanel,setVehiclePanel] = useState(false);
  const [confirmRidePanel,setConfirmRidePanel] = useState(false);
  const [vehicleFound,setVehicleFound] = useState(false);
  const [waitingForDriver,setWaitingForDriver] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  }
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

useGSAP(() => {
  if (panelOpen) {
    gsap.to(panelRef.current, { 
      height: '70%', 
      duration: 0.3,
      padding:24
    });
    gsap.to(panelCloseRef.current, { 
      opacity: 1, 
      duration: 0.3
    });
  } else {
    gsap.to(panelRef.current, { 
      height: '0%', 
      duration: 0.3,
      padding:0
    });
    gsap.to(panelCloseRef.current, { 
      opacity: 0, 
      duration: 0.3 
    });
  }
}, { dependencies: [panelOpen] });

useGSAP(()=>{
  if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    });
  }
  else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    });
  }
}, { dependencies: [vehiclePanel] });

useGSAP(()=>{
  if(confirmRidePanel){
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
    });
  }
  else{
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
    });
  }
}, { dependencies: [confirmRidePanel] });

useGSAP(()=>{
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
    });
  }
  else{
    gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)'
    });
  }
}, { dependencies: [vehicleFound] });

useGSAP(()=>{
  if(waitingForDriver){
    gsap.to(waitingForDriverRef.current,{
      transform:'translateY(0)'
    });
  }
  else{
    gsap.to(waitingForDriverRef.current,{
      transform:'translateY(100%)'
    });
  }
}, { dependencies: [waitingForDriver] });


  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 left-5 top-5 absolute' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      <div className="h-screen w-screen">
        {/* Temporary background image */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      <div className=' h-screen absolute top-0 w-full flex flex-col justify-end'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{setPanelOpen(false)}} className='absolute text-2xl top-6 right-6 opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="font-semibold text-2xl">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute rounded-full bg-gray-900 h-16 w-1 top-[45%] left-[8%]'></div>
            <input
              className="bg-[#eee] rounded-lg px-4 py-2 text-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={()=>{setPanelOpen(true)}}
            />
            <input
              className="bg-[#eee] rounded-lg px-4 py-2 text-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={()=>{setPanelOpen(true)}}
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white overflow-hidden' style={{ height: "0%" }}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 px-3 py-6 w-full bg-white translate-y-full pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 px-3 py-6 w-full bg-white translate-y-full pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 px-3 py-6 w-full bg-white translate-y-full pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 px-3 py-6 w-full bg-white pt-12'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  )
}

export default Home
