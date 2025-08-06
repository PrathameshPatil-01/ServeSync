import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Login from '../pages/customer/auth/Login.jsx';
import Signup from '../pages/customer/auth/Signup.jsx';
import ForgotPassword from '../pages/customer/auth/ForgotPassword.jsx';
import Home from '../pages/customer/Home.jsx';
import SearchResults from '../pages/customer/SearchResults.jsx';
import ServiceList from '../components/ServiceList/ServiceList';

// import ProviderProfile from '../pages/customer/ProviderProfile';
// import BookingPage from '../pages/customer/BookingPage';
// import CustomerDashboard from '../pages/customer/Dashboard';

export default function CustomerRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/services" element={<ServiceList />} />
        {/* <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/booking/:serviceId" element={<BookingPage />} />
        <Route path="/dashboard" element={<CustomerDashboard />} /> */}
      </Routes>
    </MainLayout>
  );
}
