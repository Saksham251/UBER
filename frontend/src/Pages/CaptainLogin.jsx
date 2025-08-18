import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const captainData = {
                email: email,
                password: password
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captain/login`,
                captainData,
                { withCredentials: true } 
            );
            console.log("Captain login response:", response);
            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem("token", data.token);
                navigate("/captain-home");
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            console.error("Captain login failed:", error.response?.data || error.message);
            alert("Login failed: " + (error.response?.data?.message || "Something went wrong"));
        }
    };
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-xl font-medium mb-2'>What's your email</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded border w-full text-lg px-4 py-2 placeholder:text-base'
                        type="email"
                        required
                        placeholder='email.example.com'
                        value={email}
                        onChange={(e) => {
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
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button className='bg-[#111] mb-3 font-semibold text-white rounded w-full text-lg px-4 py-2 placeholder:text-base'>
                        Login
                    </button>
                </form>
                <p className='text-center'>Join Uber as a Captain?<Link to={"/captain-signup"} className='text-blue-600'>Create New Account</Link></p>
            </div>
            <div>
                <Link
                    to='/login'
                    className='bg-[#ff642d] flex items-center justify-center mb-7 font-semibold text-white rounded w-full text-lg px-4 py-2 placeholder:text-base'
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin;
