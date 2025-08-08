// src/components/ServiceList/ServiceCard.jsx
import { Card, CardContent, Typography, Box, Avatar, Rating } from '@mui/material';

export default function ServiceCard({ service }) {
  return (
    <Card variant="outlined" sx={{ width: 300 }}>
      <Box display="flex" alignItems="center" p={2}>
        <Avatar src={service.image} sx={{ width: 56, height: 56, mr: 2 }} />
        <Box>
          <Typography fontWeight="bold">{service.provider}</Typography>
          <Typography variant="body2" color="text.secondary">{service.name}</Typography>
        </Box>
      </Box>
      <CardContent>
        <Rating value={service.rating} precision={0.1} readOnly />
        <Typography variant="subtitle1" fontWeight="bold">₹{service.price}</Typography>
        <Typography variant="body2" color="text.secondary">{service.category}</Typography>
      </CardContent>
    </Card>
  );
}
