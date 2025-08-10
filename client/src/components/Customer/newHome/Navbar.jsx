import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import img from '../images/logo-svg.svg';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/customer/login'); // Navigate to login page
  };

  return (
    <header className="navbar" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Left: Big Logo */}
      <div className="navbar-left" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo">
          <img
            src={img}
            alt="ServSync Logo"
            className="servsync-logo"
            style={{ width: '220px', height: 'auto' }} // 🔹 Bigger logo
          />
        </div>
      </div>

      {/* Right: Login Button */}
      <div className="navbar-right">
        <button
          className="login-btn large"
          onClick={handleLoginClick}
         
        >
          Login / Signup
        </button>
      </div>
    </header>
  );
}

export default Navbar;
