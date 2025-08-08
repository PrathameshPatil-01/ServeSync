import { Box, Paper, Typography, Grid } from '@mui/material';
import { testimonials } from '../../mockData/homeMockData';

export default function TestimonialsSection() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>What Customers Say</Typography>
      <Grid container spacing={2}>
        {testimonials.map((t, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="body1">“{t.feedback}”</Typography>
              <Typography variant="caption">– {t.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
