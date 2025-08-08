import { Box, Grid, Paper, Typography } from '@mui/material';
import { categories } from '../../mockData/homeMockData';

export default function CategoryGrid() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>Popular Categories</Typography>
      <Grid container spacing={2}>
        {categories.map((cat, i) => (
          <Grid item xs={6} sm={4} md={2.4} key={i}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
              <Typography variant="h4">{cat.icon}</Typography>
              <Typography>{cat.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
