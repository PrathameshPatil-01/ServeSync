import { Box, Paper, Typography } from '@mui/material';

export default function AuthLayout({ title, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f4f6f8',
        px: 1,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
}
