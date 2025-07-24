// src/layouts/ProviderLayout.jsx
import { Box, Typography } from '@mui/material';

export default function ProviderLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Placeholder */}
      <Box sx={{ width: '220px', backgroundColor: '#f0f4f8', p: 2 }}>
        <Typography variant="h6">Provider Panel</Typography>
        {/* Add nav links here */}
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
