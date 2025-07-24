// src/components/auth/AuthFormWrapper.jsx
import { Box, Paper, Typography } from '@mui/material';

export default function AuthFormWrapper({ title, children }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {children}
      </Paper>
    </Box>
  );
}
