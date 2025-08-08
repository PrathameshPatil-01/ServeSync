// src/components/ServiceList/Filters.jsx
import { Box, MenuItem, Select, FormControl, InputLabel, Slider } from '@mui/material';

export default function Filters({ filters, setFilters }) {
  const handleChange = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          value={filters.category}
          onChange={handleChange('category')}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="AC Repair">AC Repair</MenuItem>
          <MenuItem value="Salon">Salon</MenuItem>
          <MenuItem value="Cleaning">Cleaning</MenuItem>
          <MenuItem value="Plumbing">Plumbing</MenuItem>
          <MenuItem value="Electrician">Electrician</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Rating</InputLabel>
        <Select
          label="Rating"
          value={filters.rating}
          onChange={handleChange('rating')}
        >
          <MenuItem value="">All</MenuItem>
          {[5, 4, 3, 2, 1].map((r) => (
            <MenuItem key={r} value={r}>{r} ★ & up</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ minWidth: 200 }}>
        <label>Max Price: ₹{filters.maxPrice}</label>
        <Slider
          value={filters.maxPrice}
          onChange={(e, val) => setFilters((prev) => ({ ...prev, maxPrice: val }))}
          min={0}
          max={1000}
          step={50}
        />
      </Box>
    </Box>
  );
}
