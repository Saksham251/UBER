import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userData,setUserData] = useState({});
    const submitHandler = (e)=>{
        e.preventDefault();
        setUserData({
            email:email,
            password:password
        });
        console.log(userData);
        setEmail('');
        setPassword('');
    
    }
    return (
    <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
            <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <h3 className='text-xl font-medium mb-2'>What's your email</h3>
                <input 
                    className='bg-[#eeeeee] mb-7 rounded border w-full text-lg px-4 py-2 placeholder:text-base'
                    type="email" 
                    required 
                    placeholder='email.example.com'
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
                <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
                <input 
                    className='bg-[#eeeeee] mb-7 rounded border w-full text-lg px-4 py-2 placeholder:text-base'
                    type="password" 
                    required 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                />
                <button className='bg-[#111] mb-3 font-semibold text-white rounded w-full text-lg px-4 py-2 placeholder:text-base'>
                    Login
                </button>
            </form>
            <p className='text-center'>New here?<Link to={"/signup"} className='text-blue-600'>Create New Account</Link></p>
       </div>
       <div>
        <Link 
            to='/captain-login'
            className='bg-[#10b461] flex items-center justify-center mb-7 font-semibold text-white rounded w-full text-lg px-4 py-2 placeholder:text-base'
        >
            Sign in as Captain
        </Link>
       </div>
    </div>
  )
}

export default UserLogin
