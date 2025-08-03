import React, { useState } from 'react';
import './ProfileSettings.css';
import EditUserSidebar from '../../components/EditUser/EditUserSidebar';
import ChangePasswordSidebar from '../../components/EditUser/ChangePasswordSidebar';
import Footer from '../../components/Footer';

const ProfileSettings = () => {
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);
  const [passwordSidebarOpen, setPasswordSidebarOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: 'Guest User',
    phone: '9168717017',
    email: '–',
    pan: '🟠 Unverified',
    legalName: 'Guest Account',
    outletCity: 'Pune',
  });

  const handleSave = (updatedData) => {
    setUserDetails(updatedData);
  };

  return (
    <>
      {/* Edit User Sidebar */}
      <EditUserSidebar
        isOpen={editSidebarOpen}
        onClose={() => setEditSidebarOpen(false)}
        userDetails={userDetails}
        onSave={handleSave}
      />

      {/* Change Password Sidebar */}
      <ChangePasswordSidebar
        isOpen={passwordSidebarOpen}
        onClose={() => setPasswordSidebarOpen(false)}
      />

      {/* Blur background */}
      {(editSidebarOpen || passwordSidebarOpen) && (
        <div
          className="backdrop"
          onClick={() => {
            setEditSidebarOpen(false);
            setPasswordSidebarOpen(false);
          }}
        ></div>
      )}

      {/* Main profile settings layout */}
      <div className={`profile-settings-container ${editSidebarOpen || passwordSidebarOpen ? 'blur-bg' : ''}`}>
        {/* LEFT: Profile Info */}
        <div className="profile-card">
          <div className="info-section">
            <p className="label">User name</p>
            <p className="value">{userDetails.username}</p>

            <p className="label">Login phone number</p>
            <p className="value">{userDetails.phone}</p>

            <p className="label">Email address</p>
            <p className="value">{userDetails.email}</p>

            <p className="label">PAN card number</p>
            <p className="value">{userDetails.pan}</p>

            <div className="button-row">
              <button className="btn-outline" onClick={() => setPasswordSidebarOpen(true)}>
                Change Password
              </button>
              <button className="btn-filled" onClick={() => setEditSidebarOpen(true)}>
                Edit Details
              </button>
            </div>
          </div>

          <hr />

          <div className="preferences">
            <div className="pref-item">
              <span>💬 Send me order updates on WhatsApp</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="pref-item">
              <span>ⓘ Show prices including tax</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="pref-item">
              <span>📄 Send me paper invoice with orders.</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="invoice-note">
              You’re saving ₹4.72 & trees 🌱
            </div>
          </div>
        </div>

        {/* RIGHT: Outlet Info */}
        <div className="outlet-card">
          <div className="outlet-header">
            <span className="outlet-title">Hello {userDetails.username}</span>
            <span
              className="outlet-edit"
              onClick={() => setEditSidebarOpen(true)}
              style={{ cursor: 'pointer' }}
            >
              🖊️ <span style={{ color: '#f44336', fontWeight: 500 }}>edit</span>
            </span>
          </div>

          <div className="outlet-sub">{userDetails.outletCity}</div>

          <div className="outlet-contact">
            <span style={{ color: '#d81b60', fontSize: '18px' }}>📞</span>
            <span style={{ marginLeft: '8px' }}>{userDetails.phone}</span>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProfileSettings;