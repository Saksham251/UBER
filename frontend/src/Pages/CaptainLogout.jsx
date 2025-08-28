import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('captainToken');

    axios.post(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('captainToken');
        navigate("/captain-login");
      }
    })
    .catch((err) => {
      console.error("Logout failed:", err);
      localStorage.removeItem('captainToken');
      navigate("/captain-login");
    });

  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default CaptainLogout;
