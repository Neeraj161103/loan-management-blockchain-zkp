import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsLoggedIn(true);
        navigate('/dashboard');
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Welcome to ZKP Based Loan Management System</h1>
      {!isLoggedIn && <button onClick={handleLogin} style={buttonStyle}>Login with MetaMask</button>}
    </div>
  );
};

const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f4',
  flexDirection: 'column',
};

const headingStyle = {
  fontSize: '36px',
  marginBottom: '20px',
  textAlign: 'center',
};

const buttonStyle = {
  background: '#007bff',
  padding: '10px 20px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginPage;
