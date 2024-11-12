import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '10px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <button onClick={() => navigate('/dashboard')} style={buttonStyle}>Home</button>
        <button onClick={onLogout} style={buttonStyle}>Logout</button>
      </div>
    </nav>
  );
};

const buttonStyle = {
  background: '#007bff',
  border: 'none',
  padding: '10px 20px',
  color: '#fff',
  cursor: 'pointer',
  marginLeft: '10px',
  borderRadius: '5px',
};

export default Navbar;
