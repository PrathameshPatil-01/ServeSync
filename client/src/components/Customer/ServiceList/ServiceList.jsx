// src/components/ServiceList/ServiceList.jsx
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { services } from '../../mockData/serviceData';
import Filters from './Filters';
import ServiceCard from './ServiceCard';

export default function ServiceList() {
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    maxPrice: 1000,
  });

  const filtered = services.filter((s) => {
    const matchCategory = filters.category ? s.category === filters.category : true;
    const matchRating = filters.rating ? s.rating >= filters.rating : true;
    const matchPrice = s.price <= filters.maxPrice;
    return matchCategory && matchRating && matchPrice;
  });

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Explore Services</Typography>
      <Filters filters={filters} setFilters={setFilters} />
      <Grid container spacing={3}>
        {filtered.map((service) => (
          <Grid item key={service.id}>
            <ServiceCard service={service} />
          </Grid>
        ))}
      </Grid>
      {filtered.length === 0 && <Typography mt={3}>No services found.</Typography>}
    </Box>
  );
}
