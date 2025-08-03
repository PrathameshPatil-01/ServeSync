import React from 'react';
import './RoleCards.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './../../redux/auth/authThunks';

const RoleCards = () => {

const navigate = useNavigate();

  const LoginUser = () => {
    navigate('/auth/login'); // 👈 navigates to the login page
  };

  return (


    <div className="role-cards-wrapper">
      <div className="role-card seller-card">
        <div className="role-tag">FOR WORKER</div>
        <h2 className="role-title">Find jobs, earn confidently</h2>
        <p className="role-subtitle">Trusted by 10,000+ daily workers</p>
        <button className="role-btn">Register as Worker →</button>
      </div>

      <div className="role-card customer-card">
        <div className="role-tag">FOR USERS</div>
        <h2 className="role-title">Need a plumber or electrician?</h2>
        <p className="role-subtitle">Hire skilled professionals in seconds.</p>
        <button className="role-btn" onClick={LoginUser}>Find a Worker →</button>
      </div>
    </div>
  );
};

export default RoleCards;
