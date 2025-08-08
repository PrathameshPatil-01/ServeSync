// src/layouts/ProviderLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/provider/Sidebar.jsx'; // Updated path
import { Box, useTheme, useMediaQuery } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function ProviderLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display="flex" sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: '140px' }, // Adjust margin for sidebar width
          p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          width: { xs: '100%', md: `calc(100% - 240px)` },
          mt: isMobile ? '64px' : 0, // Add top margin for mobile header/menu icon
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />  {/* Nested routes will render here */}
        </motion.div>
      </Box>
    </Box>
  );
}
