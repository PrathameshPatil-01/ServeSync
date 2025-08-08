import React, { useState, useEffect } from 'react';
import './EditAddressSidebar.css';
import { useSelector } from 'react-redux';
import { updateAddress } from '@/services/editUserAddress';

const EditAddressSidebar = ({ isOpen, onClose, userAddress, onSave }) => {
  const userId = useSelector((state) => state.CustomerAuth);

  // Local form state with default empty fields
  const [address, setAddress] = useState({
    flat: '',
    area: '',
    landmark: '',
    pincode: '',
    city: '',
    state: ''
  });

  // Update form fields when sidebar opens and userAddress is available
  useEffect(() => {
    if (isOpen && userAddress) {
      setAddress({
        flat: userAddress.flat || '',
        area: userAddress.area || '',
        landmark: userAddress.landmark || '',
        pincode: userAddress.pincode || '',
        city: userAddress.city || '',
        state: userAddress.state || ''
      });
    }
  }, [isOpen, userAddress]);

  // Handle input changes
  const handleChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Save button handler
  const handleSave = async () => {
    try {
      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      const formattedData = {
        flat: address.flat,
        area: address.area,
        landmark: address.landmark,
        postalCode: address.pincode,
        city: address.city,
        state: address.state,
        country: 'India' // default value
      };

      await updateAddress(userId, formattedData);
      onSave();   // refresh parent component
      onClose();  // close the sidebar
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-address-sidebar-overlay">
      <div className="edit-address-sidebar">
        <div className="sidebar-header">
          <h2>Edit Address</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="sidebar-content">
          <label>
            Flat, House no., Building, Company, Apartment
            <input
              type="text"
              value={address.flat}
              onChange={(e) => handleChange('flat', e.target.value)}
            />
          </label>

          <label>
            Area, Street, Sector, Village
            <input
              type="text"
              value={address.area}
              onChange={(e) => handleChange('area', e.target.value)}
            />
          </label>

          <label>
            Landmark
            <input
              type="text"
              value={address.landmark}
              onChange={(e) => handleChange('landmark', e.target.value)}
            />
          </label>

          <label>
            Pincode
            <input
              type="text"
              value={address.pincode}
              onChange={(e) => handleChange('pincode', e.target.value)}
            />
          </label>

          <label>
            City
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </label>

          <label>
            State
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </label>
        </div>

        <div className="sidebar-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressSidebar;
