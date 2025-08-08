import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './ProfileSettings.css';
import EditUserSidebar from '@/components/Customer/EditUser/EditUserSidebar';
import ChangePasswordSidebar from '@/components/Customer/EditUser/ChangePasswordSidebar';
import EditAddressSidebar from '@/components/Customer/EditUser/EditAddressSidebar';

const ProfileSettings = () => {
  const user = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({
    username: '',
    phone: '',
    email: '',
    pan: '',
    legalName: '',
    outletCity: '',
    profilePic: '',
    address: {
      flat: '',
      area: '',
      landmark: '',
      pincode: '',
      city: '',
      state: ''
    },
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordSidebarOpen, setPasswordSidebarOpen] = useState(false);
  const [isAddressSidebarOpen, setAddressSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserDetails({
        username: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        phone: user.phoneNumber || '–',
        email: user.email || '–',
        pan: user.panNumber || '🟠 Unverified',
        legalName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        outletCity: user.city || '–',
        profilePic: user.profilePic || '',
        address: {
          flat: user.address?.flat || '–',
          area: user.address?.area || '–',
          landmark: user.address?.landmark || '–',
          pincode: user.address?.pincode || '–',
          city: user.address?.city || '–',
          state: user.address?.state || '–',
        }
      });
    }
  }, [user]);

  return (
    <div className="profile-settings-wrapper">
      <h1 className="profile-settings-title">Profile Settings</h1>

      <div className="profile-settings">
        {/* Left Section - User Info */}
        <div className="profile-left">
          <div className="info-item">
            <div className="label">User name</div>
            <div className="value">{userDetails.username}</div>
          </div>
          <div className="info-item">
            <div className="label">Login phone number</div>
            <div className="value">{userDetails.phone}</div>
          </div>
          <div className="info-item">
            <div className="label">Email address</div>
            <div className="value">{userDetails.email}</div>
          </div>
          <div className="info-item">
            <div className="label">PAN card number</div>
            <div className="value pan-unverified">{userDetails.pan}</div>
          </div>
          <div className="info-item">
            <div className="label">Legal entity name</div>
            <div className="value">{userDetails.legalName}</div>
          </div>

          <div className="action-section">
            <button className="change-password" onClick={() => setPasswordSidebarOpen(true)}>
              Change Password
            </button>
            <button className="edit-details" onClick={() => setIsEditOpen(true)}>
              Edit Details
            </button>
          </div>
        </div>

        {/* Right Section - Address Card */}
        <div className="profile-right">
          <div className="user-address-card">
            <div className="user-address-header">
              <h3 className="address-title">User Address</h3>
              <button className="edit-address-btn" onClick={() => setAddressSidebarOpen(true)}>
                <i className="fa fa-edit"></i> Edit
              </button>
            </div>

            <div className="info-item">
              <div className="label">Flat, House no., Building, Company, Apartment</div>
              <div className="value">{userDetails.address.flat}</div>
            </div>
            <div className="info-item">
              <div className="label">Area, Street, Sector, Village</div>
              <div className="value">{userDetails.address.area}</div>
            </div>
            <div className="info-item">
              <div className="label">Landmark</div>
              <div className="value">{userDetails.address.landmark}</div>
            </div>
            <div className="info-item">
              <div className="label">Pincode</div>
              <div className="value">{userDetails.address.pincode}</div>
            </div>
            <div className="info-item">
              <div className="label">City</div>
              <div className="value">{userDetails.address.city}</div>
            </div>
            <div className="info-item">
              <div className="label">State</div>
              <div className="value">{userDetails.address.state}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebars */}
      <EditUserSidebar
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        userDetails={userDetails}
      />
      <ChangePasswordSidebar
        isOpen={isPasswordSidebarOpen}
        onClose={() => setPasswordSidebarOpen(false)}
      />
      <EditAddressSidebar
        isOpen={isAddressSidebarOpen}
        onClose={() => setAddressSidebarOpen(false)}
        userAddress={userDetails.address}
        onSave={(updatedAddress) =>
          setUserDetails((prev) => ({
            ...prev,
            address: updatedAddress,
          }))
        }
      />
    </div>
  );
};

export default ProfileSettings;
