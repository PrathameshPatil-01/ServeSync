import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Customer/newHome/Navbar';
import Sidebar from '@/components/Customer/FirstPage/Sidebar';
import NotificationSidebar from '@/components/Customer/FirstPage/NotificationSidebar';

import EditUserSidebar from '@/components/Customer/EditUser/EditUserSidebar';
import '../App.css';


export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Profile Sidebar
  const [notificationOpen, setNotificationOpen] = useState(false); // Notification Sidebar
  const [editUserOpen, setEditUserOpen] = useState(false); // New User Sidebar

  const handleUserIconClick = () => setSidebarOpen(true);
  const onUserNotificationIconClick = () => setNotificationOpen(true);
  const handleEditUserClick = () => setEditUserOpen(true);

  const handleCloseAll = () => {
    setSidebarOpen(false);
    setNotificationOpen(false);
    setEditUserOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Navbar
        onUserIconClick={handleUserIconClick}
        onUserNotificationIconClick={onUserNotificationIconClick}
      />

      {(sidebarOpen || notificationOpen || editUserOpen) && (
        <div className="backdrop" onClick={handleCloseAll}></div>
      )}

      {/* Existing Sidebars */}
          <Sidebar
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      onUserNotificationIconClick={() => {
        setNotificationOpen(true);   // open notification sidebar
        setSidebarOpen(false);       // close profile sidebar
      }}
    />
      <NotificationSidebar isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />

      {/* New Edit User Sidebar */}
      <EditUserSidebar isOpen={editUserOpen} onClose={() => setEditUserOpen(false)} />

      {/* Main content */}
      <div className={`main-content ${sidebarOpen || notificationOpen || editUserOpen ? 'blur-bg' : ''}`}>
        {/* Use context or props to pass handleEditUserClick to the user card */}
        <Outlet context={{ openEditUser: handleEditUserClick }} />
      </div>
    </div>
  );
}
