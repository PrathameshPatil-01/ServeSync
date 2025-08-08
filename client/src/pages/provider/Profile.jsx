// src/pages/provider/Profile.jsx
import ProfileForm from '@/components/provider/profile/ProfileForm';
import { Box, Paper, Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Profile() { // Renamed component to Profile
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.dark">
          Your Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Manage your personal and business information.
        </Typography>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 900, mx: 'auto', borderRadius: 3, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)' }}>
          <ProfileForm />
        </Paper>
      </Box>
    </motion.div>
  );
}
