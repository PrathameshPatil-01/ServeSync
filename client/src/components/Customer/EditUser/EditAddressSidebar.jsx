import React, { useState, useEffect } from 'react';
import './EditAddressSidebar.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateAddress as updateAddressService } from '@/services/editUserAddress';
import { updateAddress } from '@/redux/customer/auth/customerAuthSlice'; // ✅ match slice export

const EditAddressSidebar = ({ isOpen, onClose, userAddress, onSave }) => {
  const token = useSelector((state) => state.customerAuth.token);
  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    houseNo: '',
    area: '',
    landmark: '',
    postalCode: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    console.log('userAddress passed to EditAddressSidebar:', userAddress);
    if (isOpen && userAddress) {
      setAddress({
        houseNo: userAddress.house_no || userAddress.houseNo || '',
        area: userAddress.area || '',
        landmark: userAddress.landmark || '',
        postalCode: userAddress.postalCode || '',
        city: userAddress.city || '',
        state: userAddress.state || ''
      });
    }
  }, [isOpen, userAddress]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const formattedData = {
        houseNo: address.houseNo,
        area: address.area,
        city: address.city,
        stateName: address.state, // ✅ match your slice reducer key
        landmark: address.landmark,
        country: 'India',
        postalCode: address.postalCode
      };

      // 1️⃣ Update backend
      await updateAddressService(formattedData);

      // 2️⃣ Update Redux + localStorage instantly
      dispatch(updateAddress(formattedData));

      // 3️⃣ Callback to parent if provided
      if (onSave) {
        onSave(formattedData);
      }

      // 4️⃣ Close sidebar
      onClose();
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
              value={address.houseNo}
              onChange={(e) => handleChange('houseNo', e.target.value)}
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
            Postal Code
            <input
              type="text"
              value={address.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
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
