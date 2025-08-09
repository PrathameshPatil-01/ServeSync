import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProfileSettings.css';
import EditUserSidebar from '@/components/Customer/EditUser/EditUserSidebar';
import ChangePasswordSidebar from '@/components/Customer/EditUser/ChangePasswordSidebar';
import EditAddressSidebar from '@/components/Customer/EditUser/EditAddressSidebar';

const ProfileSettings = () => {
  const user = useSelector((state) => state.customerAuth);

  const [userDetails, setUserDetails] = useState({
    username: '',
    phone: '',
    email: '',
    pan: '',
    legalName: '',
    outletCity: '',
    profilePic: '',
    address: {
      house_no: '',
      area: '',
      landmark: '',
      postalCode: '',
      city: '',
      state: '',
    },
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordSidebarOpen, setPasswordSidebarOpen] = useState(false);
  const [isAddressSidebarOpen, setAddressSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token && user.firstName) {
      setUserDetails({
        username: `${user.firstName} ${user.lastName}`.trim(),
        phone: user.phoneNumber || '',
        email: user.email || '',
        pan: user.panNumber || '',
        legalName: `${user.firstName} ${user.lastName}`.trim(),
        outletCity: user.city || '',
        profilePic: user.profilePic || '',
        address: {
          house_no: user.houseNo || '',
          area: user.area || '',
          landmark: user.landmark || '',
          postalCode: user.postalCode || '',
          city: user.city || '',
          state: user.state || '',
        },
      });
      setLoading(false);
    }
  }, [user]);

  const renderAddressField = (key, value) => {
    const labelMap = {
      house_no: 'House No.',
      area: 'Area',
      landmark: 'Landmark',
      postalCode: 'Postal Code',
      city: 'City',
      state: 'State'
    };

    return (
      <div className="info-item" key={key}>
        <div className="label">{labelMap[key]}</div>
        <div className="value">{value || 'Not provided'}</div>
      </div>
    );
  };

  if (loading) {
    return <div className="profile-settings-wrapper">Loading user data...</div>;
  }

  return (
    <div className="profile-settings-wrapper">
      <h1 className="profile-settings-title">Profile Settings</h1>

      <div className="profile-settings">
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
            <div className="value">{userDetails.pan || '🟠 Unverified'}</div>
          </div>
          <div className="info-item">
            <div className="label">Legal entity name</div>
            <div className="value">{userDetails.legalName}</div>
          </div>

          <div className="action-section">
            <button className="change-password" onClick={() => setPasswordSidebarOpen(true)}>Change Password</button>
            <button className="edit-details" onClick={() => setIsEditOpen(true)}>Edit Details</button>
          </div>
        </div>

        <div className="profile-right">
          <div className="user-address-card">
            <div className="user-address-header">
              <h3 className="address-title">User Address</h3>
              <button className="edit-address-btn" onClick={() => setAddressSidebarOpen(true)}>
                <i className="fa fa-edit"></i> Edit
              </button>
            </div>

            {Object.entries(userDetails.address).map(([key, value]) =>
              renderAddressField(key, value)
            )}
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
