import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

//import '../App.css';

const HLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default HLayout;
