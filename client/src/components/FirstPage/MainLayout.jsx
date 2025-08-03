import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import NotificationSidebar from './NotificationSideBar';
import '../App.css';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false); 

  const handleUserIconClick = () => setSidebarOpen(true);
  const handleCartIconClick = () => setNotificationOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleCloseNotification = () => setNotificationOpen(false); 

  return (
    <div style={{ position: 'relative' }}>
      {/* Pass both open functions to NavBar */}
      <NavBar
        onUserIconClick={handleUserIconClick}
        onUserCartIconClick={() => setNotificationOpen(true)}  
      />

      {/* Backdrop blur logic */}
      {(sidebarOpen || notificationOpen) && (
        <div className="backdrop" onClick={() => {
          handleCloseSidebar();
          handleCloseNotification();
        }}></div>
      )}

      {/* Sidebar for user */}
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* 👉 Sidebar for notification/cart */}
      <NotificationSidebar isOpen={notificationOpen} onClose={handleCloseNotification} />

      {/* Main content blur */}
      <div className={`main-content ${(sidebarOpen || notificationOpen) ? 'blur-bg' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
}

