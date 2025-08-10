// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerRoutes from './CustomerRoutes';
import ProviderRoutes from './ProviderRoutes';
import Home from '../pages/customer/Home.jsx';
// import AdminRoutes from './AdminRoutes';
// import AuthRoutes from './AuthRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/customer/*" element={<CustomerRoutes />} />
      <Route path="/provider/*" element={<ProviderRoutes />} />
      <Route path="/" element={<Home />} />
      
      {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
