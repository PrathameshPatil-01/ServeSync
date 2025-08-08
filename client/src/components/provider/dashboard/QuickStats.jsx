import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function QuickStats({ stats, loading, error }) {
  const theme = useTheme();

  const StatCard = ({ label, value, color }) => (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: 'background.default',
      }}
    >
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        color={color || 'text.primary'}
        sx={{ mt: 1 }}
      >
        {value}
      </Typography>
    </Paper>
  );

  if (loading) {
    return (
      <Paper
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '180px',
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: `1px solid ${theme.palette.error.main}`,
        }}
      >
        <Typography color="error" variant="body1">
          Error loading stats: {error}
        </Typography>
      </Paper>
    );
  }

  if (!stats) {
    return (
      <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', py: 2 }}
        >
          No stats available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary.main">
        Quick Stats
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Total Orders" value={stats.totalOrders || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Pending Orders" value={stats.pendingOrders || 0} color="warning.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Completed Orders" value={stats.completedOrders || 0} color="success.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard label="Upcoming Appointments" value={stats.upcomingAppointments || 0} color="info.main" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            label="Total Earnings"
            value={`₹${stats.totalEarnings?.toFixed(2) || '0.00'}`}
            color="primary.dark"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Today"
            value={`₹${stats.todayEarnings?.toFixed(2) || '0.00'}`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="This Week"
            value={`₹${stats.thisWeekEarnings?.toFixed(2) || '0.00'}`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="This Month"
            value={`₹${stats.thisMonthEarnings?.toFixed(2) || '0.00'}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
