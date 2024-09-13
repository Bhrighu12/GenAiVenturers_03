import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import server from "../environment";

// Create the context
export const AuthContext = createContext({});

// Configure axios client
const client = axios.create({
  baseURL:  `${server}/api/v1/users`
});

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // Initial state

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post('/register', {
        name,
        username,
        password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post('/login', {
        username,
        password,
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem('token', request.data.token);
        router('/home');
      }
    } catch (err) {
      throw err;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
