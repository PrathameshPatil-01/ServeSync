import { Routes, Route } from 'react-router-dom';
import ProviderLayout from '../layouts/ProviderLayout';
import ProviderDashboard from '../pages/provider/ProviderDashboard';
import ManageServices from '../pages/provider/ManageServices';
import BookingsManagement from '../pages/provider/BookingsManagement';
import EarningsPage from '../pages/provider/EarningsPage';
import ProviderReviews from '../pages/provider/ProviderReviews';

export default function ProviderRoutes() {
  return (
    <ProviderLayout>
      <Routes>
        <Route path="" element={<ProviderDashboard />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="bookings" element={<BookingsManagement />} />
        <Route path="earnings" element={<EarningsPage />} />
        <Route path="reviews" element={<ProviderReviews />} />
      </Routes>
    </ProviderLayout>
  );
}
