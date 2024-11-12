import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session or handle logout logic
    navigate('/');
  };

  return (
    <div style={pageStyle}>
      <Navbar onLogout={handleLogout} />
      <h2>Welcome to Your Dashboard</h2>
      <div style={buttonContainerStyle}>
        <button onClick={() => navigate('/request-loan')} style={buttonStyle}>Request a Loan</button>
        <button onClick={() => navigate('/repay-loan')} style={buttonStyle}>Repay a Loan</button>
        <button onClick={() => navigate('/loan-details')} style={buttonStyle}>View Loan Details</button>
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>
    </div>
  );
};

const pageStyle = {
  padding: '20px',
  backgroundColor: '#f4f4f4',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
};

const buttonStyle = {
  background: '#007bff',
  padding: '10px 20px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '10px',
};

export default Dashboard;
