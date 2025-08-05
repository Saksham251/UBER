import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
    const navigate = useNavigate();    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {user,setUser} = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                email: email,
                password: password
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem("token",data.token);
                navigate('/home');
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

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
