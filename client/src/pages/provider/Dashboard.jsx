import QuickStats from '@/components/provider/dashboard/QuickStats'; // Updated import path
import { fetchProviderOrders } from '@/redux/provider/orders/orderSlice'; // Updated import path
import { fetchProviderDashboardStats } from '@/redux/provider/providerThunks'; // Updated import path
import { fetchProviderServiceOffers } from '@/redux/provider/services/providerServiceOfferSlice'; // Updated import path
import { Alert, Box, Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';


export default function Dashboard() {
  const dispatch = useDispatch();
  const { providerId } = useSelector((state) => state.providerAuth);
  const { dashboardStats, loading: statsLoading, error: statsError } = useSelector((state) => state.provider);
  const { offers, loading: offersLoading, error: offersError } = useSelector((state) => state.providerServiceOffer);
  const { orders, loading: ordersLoading, error: ordersError } = useSelector((state) => state.order);

  useEffect(() => {
    if (providerId) {
      dispatch(fetchProviderDashboardStats(providerId));
      dispatch(fetchProviderServiceOffers(providerId));
      dispatch(fetchProviderOrders({ providerId, status: 'pending', pageable: { page: 0, size: 5 } })); // Fetch some pending orders
    }
  }, [dispatch, providerId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.dark">
          Provider Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Overview of your services, orders, and performance.
        </Typography>

      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} md={6}>
          <QuickStats stats={dashboardStats} loading={statsLoading} error={statsError} />
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Pending Orders
            </Typography>
            {ordersLoading ? (
              <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
            ) : ordersError ? (
              <Alert severity="error">Error loading orders: {ordersError}</Alert>
            ) : orders && orders.length > 0 ? (
              orders.slice(0, 3).map((order) => ( // Show top 3 recent pending orders
                <Box key={order.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body1" fontWeight="medium">Order #{order.id}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.customer?.firstName} {order.customer?.lastName} - {order.providerServiceOffer?.subService?.subServiceName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Scheduled: {new Date(order.scheduledStart).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No pending orders.</Typography>
            )}
            <Button component={Link} to="/provider/orders" variant="outlined" sx={{ mt: 2 }}>View All Orders</Button>
          </Paper>
        </Grid>

        {/* Your Services */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Services
            </Typography>
            {offersLoading ? (
              <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
            ) : offersError ? (
              <Alert severity="error">Error loading services: {offersError}</Alert>
            ) : offers && offers.length > 0 ? (
              offers.slice(0, 3).map((offer) => ( // Show top 3 services
                <Box key={offer.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body1" fontWeight="medium">{offer.subService?.subServiceName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.currency}{offer.price?.toFixed(2)} - {offer.estimatedDurationMinutes} mins
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No services added yet.</Typography>
            )}
            <Button component={Link} to="/provider/services" variant="outlined" sx={{ mt: 2 }}>Manage Services</Button>
          </Paper>
        </Grid>

        {/* Upcoming Schedule */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Schedule
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              View your full schedule for upcoming bookings and blocked times.
            </Typography>
            <Button component={Link} to="/provider/schedule" variant="outlined" sx={{ mt: 2 }}>View Schedule</Button>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
}

