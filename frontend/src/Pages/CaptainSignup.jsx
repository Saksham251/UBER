import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setvehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const {captain,setCaptain} = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType 
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');

    setVehicleColor('');
    setVehiclePlate('');
    setvehicleCapacity('');
    setVehicleType('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2 w-full'>What's your Captains's Name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
              type="text"
              required
              placeholder='Firstname'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
              type="text"
              required
              placeholder='Lastname'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            className='bg-[#eeeeee] mb-6 rounded border w-full text-lg px-4 py-2 placeholder:text-base'
            type="email"
            required
            placeholder='email.example.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-6 rounded border w-full text-lg px-4 py-2 placeholder:text-base'
            type="password"
            required
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <h3 className='text-lg font-medium mb-2 w-full'>Vehicle Information</h3>
          <div className='flex gap-4 mb-6'>
            <input
              className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
              type="text"
              required
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
              type="text"
              required
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setvehicleCapacity(e.target.value);
              }}
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input
              className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
              type="text"
              required
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
            <select
              required
              className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
              placeholder='Vehicle Type'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>Select Vehice Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Moto</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button className='bg-[#111] mb-3 font-semibold text-white rounded w-full text-lg px-4 py-2 placeholder:text-base'>
            Create Captain Account
          </button>
        </form>
        <p className='text-center'>Already have an account? <Link to={"/captain-login"} className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span>Google Privacy Policy</span>  and <span>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
