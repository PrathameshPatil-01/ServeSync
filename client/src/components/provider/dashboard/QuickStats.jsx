import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

export default function QuickStats({ stats, loading, error }) {
  const theme = useTheme(); // Use theme hook

  if (loading) {
    return (
      <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '180px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, border: `1px solid ${theme.palette.error.main}` }}>
        <Typography color="error" variant="body1">Error loading stats: {error}</Typography>
      </Paper>
    );
  }

  if (!stats) {
    return (
      <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>No stats available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom color="primary.main">Quick Stats</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Total Orders:</Typography>
          <Typography variant="h5" fontWeight="bold" color="text.primary">{stats.totalOrders || 0}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Pending Orders:</Typography>
          <Typography variant="h5" fontWeight="bold" color="warning.main">{stats.pendingOrders || 0}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Completed Orders:</Typography>
          <Typography variant="h5" fontWeight="bold" color="success.main">{stats.completedOrders || 0}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">Upcoming Appointments:</Typography>
          <Typography variant="h5" fontWeight="bold" color="info.main">{stats.upcomingAppointments || 0}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">Total Earnings:</Typography>
          <Typography variant="h5" fontWeight="bold" color="primary.dark">₹{stats.totalEarnings?.toFixed(2) || '0.00'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Today:</Typography>
          <Typography variant="subtitle1" fontWeight="bold">₹{stats.todayEarnings?.toFixed(2) || '0.00'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">This Week:</Typography>
          <Typography variant="subtitle1" fontWeight="bold">₹{stats.thisWeekEarnings?.toFixed(2) || '0.00'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">This Month:</Typography>
          <Typography variant="subtitle1" fontWeight="bold">₹{stats.thisMonthEarnings?.toFixed(2) || '0.00'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

