// src/components/Footer.jsx
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#f1f1f1', mt: 6 }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} ServeSync. All rights reserved.
      </Typography>
    </Box>
  );
}
