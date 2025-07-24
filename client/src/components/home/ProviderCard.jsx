import { Card, CardContent, Typography, Box, Avatar, Button, Chip } from '@mui/material';

export default function ProviderCard({ provider }) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={provider.image} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="subtitle1">{provider.name}</Typography>
            <Typography variant="body2" color="textSecondary">{provider.experience}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Chip label={provider.service} size="small" sx={{ mr: 1 }} />
          {provider.rating >= 4.5 && <Chip label="Verified" color="success" size="small" />}
        </Box>

        <Typography sx={{ mt: 1 }}>⭐ {provider.rating}</Typography>
        <Typography>Starting from ₹{provider.price}</Typography>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small">Call</Button>
          <Button variant="contained" size="small">Book</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
