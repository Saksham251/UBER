import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import CaptainDetails from '../components/CaptainDetails';
import RidePopup from '../components/RidePopup';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from '../context/SocketContext';

import ConfirmRidePopup from '../components/ConfirmRidePopup';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);


  // Sets the SocketId for captain 
  useEffect(() => {
    socket.emit("join",
      {
        userType: "captain",
        userId: captain._id
      }
    );

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude, // lng
                position.coords.latitude   // lat
              ]
            }
          })
        );
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    return clearInterval(locationInterval);
  }, [captain]);

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, 
      {
      'rideId': ride._id,
      'captainId':captain._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("captainToken")}`
        }
      }
    );
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      });
    }
    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, { dependencies: [ridePopupPanel] });

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      });
    }
    else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, { dependencies: [confirmRidePopupPanel] });

  useEffect(() => {
    const handleNewRide = (data) => {
      console.log("New ride:", data);
      setRide(data);
      setRidePopupPanel(true);
    };
    socket.on("new-ride", handleNewRide);
    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, []);

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to="/captain-home" className="h-10 w-10 flex justify-center items-center rounded-full bg-white ">
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed z-10 bottom-0 px-3 py-6 w-full translate-y-full bg-white pt-12'>
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className='h-screen fixed z-10 bottom-0 px-3 py-6 w-full translate-y-full bg-white pt-12'>
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome;
