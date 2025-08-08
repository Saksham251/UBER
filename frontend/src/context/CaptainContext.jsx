import React, { createContext } from 'react'
import { useState } from 'react';

export const CaptainDataContext = createContext();
const CaptainContext = ({children}) => {
  const [captain,setCaptain] = useState(null);
  const [error,setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false);

  const value = {captain,setCaptain,error,setError,isLoading,setIsLoading};
  
  return (
    <div>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext
