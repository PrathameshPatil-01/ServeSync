// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerRoutes from './CustomerRoutes';
// import ProviderRoutes from './ProviderRoutes';
// import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<CustomerRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* <Route path="/provider/*" element={<ProviderRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
