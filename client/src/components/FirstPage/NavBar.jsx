import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import logo from "./images/logo-svg.svg";
import { useNavigate } from 'react-router-dom';

export default function NavBar({ onUserIconClick, onUserNotificationIconClick }) {
  const navigate = useNavigate(); // <-- use navigate hook

  const handleLogoClick = () => {
    navigate('/firstpage'); // <-- navigate to home
  };

  
const handleHomesClick = () => {
  navigate('/firstpage'); // 👈 Go to /homes
};

  return (
    <div container="true" style={{ margin: 0, padding: 0 }}>
      <nav className="navbar navbar-expand-lg classy-navbar w-100">
        <div className="w-100 container-fluid d-flex justify-content-between align-items-center px-4">

          {/* Left: Logo and Links */}
          <div className="d-flex align-items-center gap-4">
            {/* ⬇️ Use onClick instead of <a href="/"> */}
            <div
              className="navbar-brand d-flex align-items-center"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={logo}
                alt="ServSync"
                style={{ width: "150px", height: "auto" }}
              />
            </div>

            <div className="d-none d-md-flex gap-3 ms-2">
              <a className="nav-link classy-link" href="#">Beauty</a>
              <a className="nav-link classy-link" href="#"onClick={handleHomesClick}>Homes</a>
              <a className="nav-link classy-link" href="#">Native</a>
            </div>
          </div>

          {/* Middle: Location & Search */}
          <div className="d-flex flex-grow-1 mx-4 gap-3" style={{ maxWidth: '700px' }}>
            <div className="input-group classy-input" style={{ width: "40%" }}>
              <span className="input-group-text classy-icon">📍</span>
              <input
                type="text"
                className="form-control classy-field"
                value="Deccan Gymkhana, Pune"
                readOnly
              />
            </div>
            <div className="input-group classy-input flex-grow-1" style={{ width: "40%" }}>
              <span className="input-group-text classy-icon">🔍</span>
              <input
                type="text"
                className="form-control classy-field"
                placeholder="Search for ‘Kitchen cleaning’"
              />
            </div>
          </div>

          {/* Right: Icons */}
          <div className="d-flex align-items-center gap-3 fs-5">
            <span className="classy-icon-btn" onClick={onUserNotificationIconClick}>🔔</span>
            <span className="classy-icon-btn">🛒</span>
            <span className="classy-icon-btn" onClick={onUserIconClick}>👤</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
