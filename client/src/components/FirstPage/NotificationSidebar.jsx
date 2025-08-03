import React from 'react';
import './NotificationSidebar.css';
import { X } from 'lucide-react';

const NotificationSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Blur background */}
      {isOpen && <div className="notification-overlay" onClick={onClose}></div>}

      <div className={`notification-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h3>Notifications</h3>
        <ul className="notification-list">
          <li>🔔 Order #1234 has been delivered</li>
          <li>💳 Payment received successfully</li>
          <li>🎁 New coupon: GET100</li>
          <li>⚠ Your address is incomplete</li>
        </ul>
      </div>
    </>
  );
};

export default NotificationSidebar;
