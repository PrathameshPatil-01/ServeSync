import { Box, Typography, Paper } from '@mui/material';
import ProfileForm from '@/components/provider/profile/ProfileForm';

export default function ProfileSettings() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Profile Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Manage your personal and business information.
      </Typography>

      <Paper elevation={2} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <ProfileForm />
      </Paper>
    </Box>
  );
}
