import React, { useState, useEffect } from 'react';
import './EditAddressSidebar.css';
import { useDispatch } from 'react-redux';
import { saveOrUpdateAddress } from '@/services/editUserAddress';
import { updateAddress } from '@/redux/customer/auth/customerAuthSlice';

const EditAddressSidebar = ({ isOpen, onClose, userAddress, onSave }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    id: null,
    houseNo: '',
    area: '',
    landmark: '',
    postalCode: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && userAddress) {
      setAddress({
        id: userAddress.id || null,
        houseNo: userAddress.house_no || userAddress.houseNo || '',
        area: userAddress.area || '',
        landmark: userAddress.landmark || '',
        postalCode: userAddress.postalCode || '',
        city: userAddress.city || '',
        state: userAddress.state || ''
      });
      setErrors({});
    }
  }, [isOpen, userAddress]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: ''
    }));
  };

  const validateFields = () => {
    let newErrors = {};
    Object.keys(address).forEach((key) => {
      if (key !== 'id' && !address[key]?.trim()) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      alert('⚠️ All fields are mandatory!');
      return;
    }

    try {
      const formattedData = {
        houseNo: address.houseNo,
        area: address.area,
        city: address.city,
        state: address.state,
        landmark: address.landmark,
        country: 'India',
        postalCode: address.postalCode
      };

      const savedAddress = await saveOrUpdateAddress(formattedData, address.id);
      dispatch(updateAddress(savedAddress));

      if (onSave) onSave(savedAddress);
      onClose();
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-address-sidebar-overlay">
      <div className="edit-address-sidebar">
        <div className="sidebar-header">
          <h2>{address.id ? 'Edit Address' : 'Add Address'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="sidebar-content">
          <label>
            Flat, House no., Building, Company, Apartment
            <input
              type="text"
              value={address.houseNo}
              onChange={(e) => handleChange('houseNo', e.target.value)}
            />
            {errors.houseNo && <span className="error-text">{errors.houseNo}</span>}
          </label>

          <label>
            Area, Street, Sector, Village
            <input
              type="text"
              value={address.area}
              onChange={(e) => handleChange('area', e.target.value)}
            />
            {errors.area && <span className="error-text">{errors.area}</span>}
          </label>

          <label>
            Landmark
            <input
              type="text"
              value={address.landmark}
              onChange={(e) => handleChange('landmark', e.target.value)}
            />
            {errors.landmark && <span className="error-text">{errors.landmark}</span>}
          </label>

          <label>
            Postal Code
            <input
              type="text"
              value={address.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
            />
            {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
          </label>

          <label>
            City
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </label>

          <label>
            State
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
            {errors.state && <span className="error-text">{errors.state}</span>}
          </label>
        </div>

        <div className="sidebar-actions">
          <button className="save-btn" onClick={handleSave}>
            {address.id ? 'Update' : 'Save'}
          </button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressSidebar;
