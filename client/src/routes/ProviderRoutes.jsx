import ProviderLayout from '@/layouts/ProviderLayout.jsx';
import EarningsPage from '@/pages/provider/EarningsPage.jsx';
import OrdersPage from '@/pages/provider/OrdersPage.jsx';
import SchedulePage from '@/pages/provider/SchedulePage.jsx';
import ProviderDashboard from '@/pages/provider/ProviderDashboard.jsx'; // New
import ProfileSettings from '@/pages/provider/ProfileSettings.jsx'; // New
import ServiceManagement from '@/pages/provider/ServiceManagement.jsx'; // New
import ReviewsPage from '@/pages/provider/ReviewsPage.jsx'; // New

import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../pages/provider/auth/ForgotPassword.jsx';
import Login from '../pages/provider/auth/Login.jsx';
import ProviderRegistrationForm from '@/pages/provider/auth/ProviderRegistrationForm.jsx';
import Signup from '../pages/provider/auth/Signup.jsx';

export default function ProviderRoutes() {
  return (
    <Routes>
      {/* Public routes without sidebar */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="register" element={<ProviderRegistrationForm />} />

      {/* Protected/provider routes with sidebar */}
      <Route element={<ProviderLayout />}>
        <Route path="dashboard" element={<ProviderDashboard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="earnings" element={<EarningsPage/>} />
        <Route path="services" element={<ServiceManagement />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="profile" element={<ProfileSettings />} />
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
}
