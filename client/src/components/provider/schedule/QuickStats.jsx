import { Box, Typography } from '@mui/material';

export default function QuickStats({ stats }) {
  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Quick Stats</Typography>
      <Typography variant="body2">Today's Bookings: <strong>{stats.todayBookings}</strong></Typography>
      <Typography variant="body2">Available Slots: <strong>{stats.availableSlots}</strong></Typography>
      <Typography variant="body2">Total Hours: <strong>{stats.totalHours}</strong></Typography>
      <Typography variant="body2">This Week: <strong>{stats.weekBookings} bookings</strong></Typography>
    </Box>
  );
}
