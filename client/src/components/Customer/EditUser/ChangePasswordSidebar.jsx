import React, { useState } from 'react';
import './ChangePasswordSidebar.css';

const ChangePasswordSidebar = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidPassword = () => {
    const hasNumber = /\d/.test(newPassword);
    const hasSpecial = /[!@#$%^&*]/.test(newPassword);
    return newPassword.length >= 8 && hasNumber && hasSpecial;
  };

  const isButtonDisabled =
    !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || !isValidPassword();

  return (
    <div className={`change-password-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Change Password</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="form-section">
        <input
          type="password"
          placeholder="Old Password*"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password*"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password*"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="requirements">
          <p>New password must meet the following requirements:</p>
          <ul>
            <li>✅ At least one number</li>
            <li>✅ At least one special character</li>
            <li>✅ At least 8 characters</li>
          </ul>
        </div>

        <button className="submit-btn" disabled={isButtonDisabled}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordSidebar;
