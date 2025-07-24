import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import BookingOversight from '../pages/admin/BookingOversight';
import CategoryPricing from '../pages/admin/CategoryPricing';
import DisputesPage from '../pages/admin/DisputesPage';
import RevenueControl from '../pages/admin/RevenueControl';

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="bookings" element={<BookingOversight />} />
        <Route path="categories" element={<CategoryPricing />} />
        <Route path="disputes" element={<DisputesPage />} />
        <Route path="revenue" element={<RevenueControl />} />
      </Routes>
    </AdminLayout>
  );
}
