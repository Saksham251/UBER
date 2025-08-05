import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(2);
  axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })
  .then((response)=>{
    console.log(3);
    if(response.status===200){
      localStorage.removeItem('token');
      navigate("/login");
    }
  })

  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout;
