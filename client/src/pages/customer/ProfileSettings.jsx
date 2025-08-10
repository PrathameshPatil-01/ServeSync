import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileSettings.css';
import EditUserSidebar from '@/components/Customer/EditUser/EditUserSidebar';
import ChangePasswordSidebar from '@/components/Customer/EditUser/ChangePasswordSidebar';
import EditAddressSidebar from '@/components/Customer/EditUser/EditAddressSidebar';

const ProfileSettings = () => {
  const user = useSelector((state) => state.customerAuth);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordSidebarOpen, setPasswordSidebarOpen] = useState(false);
  const [isAddressSidebarOpen, setAddressSidebarOpen] = useState(false);

  const addressFields = [
    { key: 'houseNo', label: 'House No.' },
    { key: 'area', label: 'Area' },
    { key: 'landmark', label: 'Landmark' },
    { key: 'postalCode', label: 'Postal Code' },
    { key: 'city', label: 'City' },
    { key: 'addressState', label: 'State' }, 
    //state: userAddress.state || '' // ✅ changed to match Redux key
  ];

  return (
    <div className="profile-settings-wrapper">
      <h1 className="profile-settings-title">Profile Settings</h1>

      <div className="profile-settings">
        {/* Left Side - User Info */}
        <div className="profile-left">
          <div className="info-item">
            <div className="label">User name</div>
            <div className="value">
              {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Not provided'}
            </div>
          </div>
          <div className="info-item">
            <div className="label">Login phone number</div>
            <div className="value">{user.phoneNumber || 'Not provided'}</div>
          </div>
          <div className="info-item">
            <div className="label">Email address</div>
            <div className="value">{user.email || 'Not provided'}</div>
          </div>
          <div className="info-item">
            <div className="label">PAN card number</div>
            <div className="value">{user.panNumber || '🟠 Unverified'}</div>
          </div>
          <div className="info-item">
            <div className="label">Legal entity name</div>
            <div className="value">
              {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Not provided'}
            </div>
          </div>

          <div className="action-section">
            <button
              className="change-password"
              onClick={() => setPasswordSidebarOpen(true)}
            >
              Change Password
            </button>
            <button
              className="edit-details"
              onClick={() => setIsEditOpen(true)}
            >
              Edit Details
            </button>
          </div>
        </div>

        {/* Right Side - Address Info */}
        <div className="profile-right">
          <div className="user-address-card">
            <div className="user-address-header">
              <h3 className="address-title">User Address</h3>
              <button
                className="edit-address-btn"
                onClick={() => setAddressSidebarOpen(true)}
              >
                <i className="fa fa-edit"></i> Edit
              </button>
            </div>

            {addressFields.map(({ key, label }) => (
              <div className="info-item" key={key}>
                <div className="label">{label}</div>
                <div className="value">{user[key] || 'Not provided'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebars */}
      <EditUserSidebar
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userDetails={{
          username: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          phone: user.phoneNumber || '',
          email: user.email || '',
          pan: user.panNumber || '',
          legalName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          outletCity: user.city || '',
          profilePic: user.profilePic || '',
        }}
      />
      <ChangePasswordSidebar
        isOpen={isPasswordSidebarOpen}
        onClose={() => setPasswordSidebarOpen(false)}
      />
      <EditAddressSidebar
        isOpen={isAddressSidebarOpen}
        onClose={() => setAddressSidebarOpen(false)}
        userAddress={{
          houseNo: user.houseNo || '',
          area: user.area || '',
          landmark: user.landmark || '',
          postalCode: user.postalCode || '',
          city: user.city || '',
          state: user.addressState || '', // ✅ changed
          //state: userAddress.state || ''
        }}
      />
    </div>
  );
};

export default ProfileSettings;
