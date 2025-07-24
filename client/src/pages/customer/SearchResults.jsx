import {
  Box,
  Grid,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Slider,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import ProviderCard from '../../components/home/ProviderCard';
import { topProviders } from '../../mockData/homeMockData';

export default function SearchResults() {
  const [showVerified, setShowVerified] = useState(false);
  const [minRating, setMinRating] = useState(4);
  const [priceRange, setPriceRange] = useState([100, 1000]);

  const filteredProviders = topProviders.filter(
    (p) =>
      (!showVerified || p.rating >= 4.5) &&
      p.rating >= minRating &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      {/* Left Filter Panel */}
      <Box sx={{ width: '300px' }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>

        <FormControlLabel
          control={<Checkbox checked={showVerified} onChange={(e) => setShowVerified(e.target.checked)} />}
          label="Verified only"
        />

        <Box sx={{ mt: 3 }}>
          <Typography gutterBottom>Rating (⭐ {minRating}+)</Typography>
          <Slider
            value={minRating}
            onChange={(e, v) => setMinRating(v)}
            step={0.1}
            min={3}
            max={5}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography gutterBottom>Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Typography>
          <Slider
            value={priceRange}
            onChange={(e, v) => setPriceRange(v)}
            step={50}
            min={0}
            max={2000}
          />
        </Box>
      </Box>

      {/* Right Results Grid */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          Search Results ({filteredProviders.length})
        </Typography>

        {filteredProviders.length === 0 ? (
          <Typography>No providers match your filters.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProviders.map((provider, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProviderCard provider={provider} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
