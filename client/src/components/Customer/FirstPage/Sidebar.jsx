import React from 'react';
import './Sidebar.css';
import {
  FileText,
  HelpCircle,
  CreditCard,
  User,
  Bell,
  Heart,
  Gift,
  PlusCircle,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/customer/auth/customerAuthSlice'; // <-- Make sure this exists

function Sidebar({ isOpen, onClose, onUserNotificationIconClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 1️⃣ Remove stored tokens
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // 2️⃣ Update Redux store
    dispatch(logout());

    // 3️⃣ Redirect to home
    navigate('/customer');

    // 4️⃣ Close sidebar
    onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      ></div>

      <div className={`sidebar right ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="sidebar-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            alt="avatar"
            className="sidebar-avatar"
          />
          <div>
            <h2 className="sidebar-name">Guest Outlet</h2>
            <p className="sidebar-sub">Guest Account</p>
          </div>
        </div>

        {/* Orders */}
        <div className="sidebar-section">
          <h4 className="sidebar-section-title red-left">Orders & Statements</h4>
          <SidebarItem icon={<FileText size={18} />} label="Your orders" />
          <SidebarItem icon={<FileText size={18} />} label="Account statement" />
          <SidebarItem icon={<HelpCircle size={18} />} label="Need help" />
        </div>

        {/* Others */}
        <div className="sidebar-section">
          <h4 className="sidebar-section-title red-left">Others</h4>
          <SidebarItem icon={<User size={18} />} label="Profile settings" onClick={() => {navigate('/customer/profile'); onClose();}} />
          <SidebarItem icon={<Bell size={18} />} label="Notifications" onClick={() => {onUserNotificationIconClick(); onClose();}} />
          <SidebarItem icon={<Heart size={18} />} label="My list" onClick={() => {navigate('/customer/my-list'); onClose();}} />
          <SidebarItem icon={<Gift size={18} />} label="Claim coupon" />
          <SidebarItem icon={<PlusCircle size={18} />} label="Request new Worker" />
          <SidebarItem icon={<Mail size={18} />} label="Contact us" />
        </div>

        <div className="sidebar-logout">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

const SidebarItem = ({ icon, label, onClick }) => (
  <div className="sidebar-item" onClick={onClick}>
    <div className="sidebar-item-left">
      {icon}
      <span>{label}</span>
    </div>
    <ChevronRight size={16} className="arrow-icon" />
  </div>
);

export default Sidebar;
