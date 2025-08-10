import { Routes, Route } from 'react-router-dom';
import AddingServicesPage from '../pages/admin/AddingServicesPage';
import AddRolePage from '../pages/admin/AddRolePage';
import DashboardPage from '../pages/admin/DashboardPage';


export default function AdminRoutes() {
  return (
      <Routes>
        <Route path="addingServices" element={<AddingServicesPage />} />
        <Route path="role" element={<AddRolePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
  );
}
