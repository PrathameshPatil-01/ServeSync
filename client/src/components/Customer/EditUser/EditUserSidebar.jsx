import React, { useState, useEffect } from 'react';
import './EditUserSidebar.css';

const EditUserSidebar = ({ isOpen, onClose, userDetails, onSave }) => {
  const defaultValues = {
    username: '',
    phone: '',
    email: '',
    pan: '',
    outletCity: '',
  };

  const [formValues, setFormValues] = useState(userDetails || defaultValues);

  useEffect(() => {
    if (userDetails) {
      setFormValues(userDetails);
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formValues);
    onClose(); // Close sidebar after saving
  };

  return (
    <div className={`edit-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="edit-sidebar-header">
        <h2>Edit User Details</h2>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="edit-sidebar-body">
        <label>Username</label>
        <input name="username" value={formValues.username} onChange={handleChange} />

        <label>Phone</label>
        <input name="phone" value={formValues.phone} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={formValues.email} onChange={handleChange} />

        <label>PAN Number</label>
        <input name="pan" value={formValues.pan} onChange={handleChange} />

        <label>City</label>
        <input name="outletCity" value={formValues.outletCity} onChange={handleChange} />
      </div>

      <div className="edit-sidebar-footer">
        <button className="btn-cancel" onClick={onClose}>Cancel</button>
        <button className="btn-save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditUserSidebar;
