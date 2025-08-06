import ProviderLayout from '@/layouts/ProviderLayout.jsx';
import EarningsPage from '@/pages/provider/EarningsPage.jsx';
import OrdersPage from '@/pages/provider/OrdersPage.jsx';
import SchedulePage from '@/pages/provider/SchedulePage.jsx';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../pages/provider/auth/ForgotPassword.jsx';
import Login from '../pages/provider/auth/Login.jsx';
import ProviderUpdationForm from '../pages/provider/auth/ProviderUpdationForm.jsx';
import Signup from '../pages/provider/auth/Signup.jsx';
// import ProviderDashboard from '../pages/provider/ProviderDashboard';
// import ManageServices from '../pages/provider/ManageServices';
// import BookingsManagement from '../pages/provider/BookingsManagement';
// import EarningsPage from '../pages/provider/EarningsPage';
// import ProviderReviews from '../pages/provider/ProviderReviews';

export default function ProviderRoutes() {
  return (
    <Routes>
      {/* Public routes without sidebar */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="update" element={<ProviderUpdationForm />} />

      {/* Protected/provider routes with sidebar */}
      <Route element={<ProviderLayout />}>
        {/* <Route path="/" element={<ProviderDashboard />} /> */}
        <Route path="orders" element={<OrdersPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="earnings" element={<EarningsPage/>} />
        {/* <Route path="services" element={<ManageServices />} /> */}
        {/* <Route path="bookings" element={<BookingsManagement />} /> */}
        {/* <Route path="earnings" element={<EarningsPage />} /> */}
        {/* <Route path="reviews" element={<ProviderReviews />} /> */}
      </Route>
    </Routes>
  );
}
