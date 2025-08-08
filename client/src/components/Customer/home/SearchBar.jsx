import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '../../redux/search/searchSlice';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keyword = useSelector((state) => state.search.keyword);

  const handleChange = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="What service are you looking for?"
        value={keyword}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
  );
}
