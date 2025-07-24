import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/customer/Home';
import SearchResults from '../pages/customer/SearchResults';
// import ProviderProfile from '../pages/customer/ProviderProfile';
// import BookingPage from '../pages/customer/BookingPage';
// import CustomerDashboard from '../pages/customer/Dashboard';

export default function CustomerRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        {/* <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/booking/:serviceId" element={<BookingPage />} />
        <Route path="/dashboard" element={<CustomerDashboard />} /> */}
      </Routes>
    </MainLayout>
  );
}
