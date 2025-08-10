import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { topProviders } from '../../mockData/homeMockData';

export default function TopProvidersCarousel() {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>Top-Rated Providers</Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
        {topProviders.map((provider, i) => (
          <Card key={i} sx={{ minWidth: 220 }}>
            <CardContent>
              <Avatar src={provider.image} sx={{ width: 56, height: 56, mb: 1 }} />
              <Typography variant="subtitle1">{provider.name}</Typography>
              <Typography variant="body2">{provider.service} • {provider.experience}</Typography>
              <Typography variant="body2">⭐ {provider.rating} • ₹{provider.price}+</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
