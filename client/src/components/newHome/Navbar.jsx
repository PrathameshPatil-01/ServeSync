import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import img from '../images/logo-svg.svg';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/login'); // 👈 navigates to the login page
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src={img} alt="ServSync Logo" className="servsync-logo" />
        </div>

        <div className="location">
          <span className="delivery-label">Delivery in</span>
          <button className="location-btn">Select Location ▼</button>
        </div>

        <nav className="navbar-links">
          <a href="#catalogue" className="browse-catalogue">
            Browse catalogue <span className="new-badge">NEW</span>
          </a>
          <a href="#quality">Quality</a>
          <a href="#sustainability">Sustainability</a>
        </nav>
      </div>

      <div className="navbar-right">
        <button className="login-btn large" onClick={handleLoginClick}>
          Login/Signup
        </button>
      </div>
    </header>
  );
}

export default Navbar;
