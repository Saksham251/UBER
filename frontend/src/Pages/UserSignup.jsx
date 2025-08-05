import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [userData,setUserData] = useState({});
    const submitHandler = (e)=>{
        e.preventDefault();
        setUserData({
            email:email,
            password:password,
            fullName:{
                firstName:firstName,
                lastName:lastName,
            }
        });
        console.log(userData);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
    return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
       <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
                <div className='flex gap-4 mb-6'>
                   <input 
                    className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
                    type="text" 
                    required 
                    placeholder='Firstname'
                    value={firstName}
                    onChange={(e)=>{
                        setFirstName(e.target.value);
                    }}
                  />
                   <input 
                    className='bg-[#eeeeee] rounded border w-1/2 text-lg px-4 py-2 placeholder:text-base'
                    type="text" 
                    required 
                    placeholder='Lastname'
                    value={lastName}
                    onChange={(e)=>{
                        setLastName(e.target.value);
                    }}
                  />
                </div>
               
                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input 
                    className='bg-[#eeeeee] mb-6 rounded border w-full text-lg px-4 py-2 placeholder:text-base'
                    type="email" 
                    required 
                    placeholder='email.example.com'
                    value={email}
                    onChange={(e)=>{
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
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
                <button className='bg-[#111] mb-3 font-semibold text-white rounded w-full text-lg px-4 py-2 placeholder:text-base'>
                    Login
                </button>
            </form>
            <p className='text-center'>Already have an account? <Link to={"/login"} className='text-blue-600'>Login here</Link></p>
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

export default UserSignup
