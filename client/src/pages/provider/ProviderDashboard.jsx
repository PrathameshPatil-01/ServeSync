import { Box, Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '@/redux/provider/providerThunks';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function ProviderDashboard() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.providerAuth);
  const { dashboardStats, loading, error } = useSelector((state) => state.provider);

  useEffect(() => {
    if (userId) {
      dispatch(fetchDashboardStats(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Provider Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back! Here's a quick overview of your performance.
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', bgcolor: '#e8f5e9' }}>
            <ListAltIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold" mt={1}>
              {dashboardStats.totalBookings}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Total Bookings
            </Typography>
            <Link to="/provider/orders" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              View Orders
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', bgcolor: '#fff3e0' }}>
            <ListAltIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold" mt={1}>
              {dashboardStats.pendingOrders}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Pending Orders
            </Typography>
            <Link to="/provider/orders?status=pending" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              Review Now
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <MonetizationOnIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold" mt={1}>
              ₹{dashboardStats.totalEarnings.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Total Earnings
            </Typography>
            <Link to="/provider/earnings" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              View Details
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', bgcolor: '#f3e5f5' }}>
            <EventIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h5" fontWeight="bold" mt={1}>
              {dashboardStats.upcomingAppointments}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Upcoming Appointments
            </Typography>
            <Link to="/provider/schedule" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
              Manage Schedule
            </Link>
          </Paper>
        </Grid>
      </Grid>

      {/* You can add more sections here, e.g., recent activities, performance charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Orders</Typography>
            {/* Placeholder for recent orders list */}
            <Typography variant="body2" color="text.secondary">
              (Display a few recent orders here, link to Orders page)
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Upcoming Schedule</Typography>
            {/* Placeholder for upcoming schedule items */}
            <Typography variant="body2" color="text.secondary">
              (Display next few schedule items, link to Schedule page)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
