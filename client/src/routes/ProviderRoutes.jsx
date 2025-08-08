import ProviderLayout from '@/layouts/ProviderLayout.jsx';
import Dashboard from '@/pages/provider/Dashboard.jsx';
import Earnings from '@/pages/provider/Earnings.jsx';
import ForgotPassword from '@/pages/provider/ForgotPassword.jsx';
import Login from '@/pages/provider/Login.jsx';
import Orders from '@/pages/provider/Orders.jsx';
import Profile from '@/pages/provider/Profile.jsx';
import Reviews from '@/pages/provider/Reviews.jsx';
import Schedule from '@/pages/provider/Schedule.jsx';
import Services from '@/pages/provider/Services.jsx';
import Signup from '@/pages/provider/Signup.jsx';
import Register from '@/pages/provider/Register.jsx';


import { Route, Routes } from 'react-router-dom';


export default function ProviderRoutes() {
  return (
    <Routes>
      {/* Public routes without sidebar */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} /> 

      {/* Protected/provider routes with sidebar */}
      <Route element={<ProviderLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="services" element={<Services />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reviews" element={<Reviews />} /> 
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
}
