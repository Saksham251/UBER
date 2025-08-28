import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("captainToken");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/profile`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setCaptain(response.data);
        setIsLoading(false);
      }
    })
    .catch(err => {
      console.error("Profile fetch error:", err.response?.data || err.message);
      localStorage.removeItem("captainToken");
      navigate("/captain-login");
    });
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return <>{children}</>;
}

export default CaptainProtectedWrapper;
