// src/layouts/AuthLayout.jsx
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function AuthLayout({ title, children }) {
  const theme = useTheme(); // Get the current theme
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        px: 2,
        py: 4, // Add vertical padding for smaller screens
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 500 }}
      >
        <Paper
          elevation={6} // Increased elevation for more depth
          sx={{
            p: { xs: 3, sm: 4 }, // Responsive padding
            width: '100%',
            maxWidth: 500,
            borderRadius: 4, // More rounded corners
            bgcolor: 'background.paper',
            boxShadow : theme.shadows[5], // Use theme shadows for consistency
          }}
        >
          <Typography
            variant="h4" // Larger title
            fontWeight="bold"
            mb={4} // Increased margin-bottom
            textAlign="center"
            color="primary.main" // Use primary color for title
          >
            {title}
          </Typography>
          {children}
        </Paper>
      </motion.div>
    </Box>
  );
}
