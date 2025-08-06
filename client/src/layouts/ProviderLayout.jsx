import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/provider/Sidebar.jsx';
import { Box } from '@mui/material';

export default function ProviderLayout() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: '210px', p: 4 }}>
        <Outlet />  {/* Nested routes will render here */}
      </Box>
    </Box>
  );
}
