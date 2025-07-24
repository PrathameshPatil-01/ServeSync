import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/search/searchSlice';

export default function LocationSelector() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.search.location);

  const handleChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleDetect = () => {
    // For now: just mock location detection
    dispatch(setLocation('Mumbai, Maharashtra'));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Enter Location"
        value={location}
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={handleDetect}>Detect</Button>
    </Box>
  );
}
