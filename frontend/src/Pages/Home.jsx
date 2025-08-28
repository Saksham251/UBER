import React, { useRef, useState, useEffect } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import "remixicon/fonts/remixicon.css"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LiveTracking from "../components/LiveTracking";
import LookingForDriver from "../components/LookingForDriver"
import {SocketContext} from "../context/SocketContext";
import { UserDataContext } from '../context/UserContext';


const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [fare, setFare] = useState();
  const [vehicleType, setVehicleType] = useState(null);
  const [ride,setRide] = useState();
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const destinationInputRef = useRef(null);

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = (e) => e.preventDefault();

  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });
      setFare(response.data.fare);
    } catch (err) {
      console.error("Fare API Error:", err.response ? err.response.data : err.message);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Ride Created:", response.data);
    } catch (err) {
      console.error("Ride Create Error:", err);
    }
  }

  useEffect(()=>{
    socket.emit("join",{userType:"user",userId:user._id});
  },[user]);

  // suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const query = activeField === "pickup" ? pickup : destination;
        if (query.length < 3) {
          setSuggestions([]);
          return;
        }
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: query },
          headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });
        setSuggestions(res.data || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };
    fetchSuggestions();
  }, [pickup, destination, activeField]);


  socket.on('ride-confirmed',ride=>{
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on('ride-started',ride=>{
    setWaitingForDriver(false);
    navigate("/riding",{state:{ride}});
  })
  const handleSelectSuggestion = (place) => {
    if (activeField === "pickup") {
      setPickup(place.description);
      if (destinationInputRef.current) {
        destinationInputRef.current.focus();
      }
    } else if (activeField === "destination") {
      setDestination(place.description);
    }
  };

  // GSAP panels
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', duration: 0.3, padding: 24 });
      gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(panelRef.current, { height: '0%', duration: 0.3, padding: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.3 });
    }
  }, { dependencies: [panelOpen] });

  useGSAP(() => { gsap.to(vehiclePanelRef.current, { y: vehiclePanel ? 0 : "100%" }); }, { dependencies: [vehiclePanel] });
  useGSAP(() => { gsap.to(confirmRidePanelRef.current, { y: confirmRidePanel ? 0 : "100%" }); }, { dependencies: [confirmRidePanel] });
  useGSAP(() => { gsap.to(vehicleFoundRef.current, { y: vehicleFound ? 0 : "100%" }); }, { dependencies: [vehicleFound] });
  useGSAP(() => { gsap.to(waitingForDriverRef.current, { y: waitingForDriver ? 0 : "100%" }); }, { dependencies: [waitingForDriver] });

  return (
    <div className='relative h-screen overflow-hidden'>
      {/* Uber Logo */}
      <img className='w-16 left-5 top-5 absolute' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

      {/* Map */}
      <div className="h-screen w-screen">
        <LiveTracking/>
      </div>

      {/* Search Form */}
      <div className='h-screen absolute top-0 w-full flex flex-col justify-end'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute text-2xl top-6 right-6 opacity-0'>
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
              onChange={(e) => { setPickup(e.target.value); setActiveField("pickup"); }}
              onClick={() => { setPanelOpen(true); setActiveField("pickup"); }}
            />
            <input
              ref={destinationInputRef}
              className="bg-[#eee] rounded-lg px-4 py-2 text-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setActiveField("destination"); }}
              onClick={() => { setPanelOpen(true); setActiveField("destination"); }}
            />
          </form>
          <button
            type="button"
            onClick={findTrip}
            className="bg-black text-white px-6 py-2 rounded-lg mt-4 w-full font-semibold">
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white overflow-hidden border-t border-gray-200' style={{ height: "0%" }}>
          <LocationSearchPanel suggestions={suggestions} onSelect={handleSelectSuggestion} />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div
        ref={vehiclePanelRef}
        className={`fixed z-10 bottom-0 px-3 py-6 w-full bg-white pt-12 transition-all duration-300 
        ${vehiclePanel ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* Confirm Ride */}
      <div
        ref={confirmRidePanelRef}
        className={`fixed z-10 bottom-0 px-3 py-6 w-full bg-white pt-12 transition-all duration-300 
        ${confirmRidePanel ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for Driver */}
      <div
        ref={vehicleFoundRef}
        className={`fixed z-10 bottom-0 px-3 py-6 w-full bg-white pt-12 transition-all duration-300 
        ${vehicleFound ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      {/* Waiting For Driver */}
      <div
        ref={waitingForDriverRef}
        className={`fixed z-10 bottom-0 px-3 py-6 w-full bg-white pt-12 transition-all duration-300 
        ${waitingForDriver ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <WaitingForDriver 
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver} 
          ride={ride}
        />
      </div>
    </div>
  )
}

export default Home
