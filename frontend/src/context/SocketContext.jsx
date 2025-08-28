import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    transports: ["websocket"], 
});

export const SocketContextProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to Server");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from Server");
        });
    }, []);
   
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
};
export default SocketContextProvider