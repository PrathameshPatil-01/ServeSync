// src/components/Header.jsx
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          ServeSync
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/auth/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/auth/signup')}>Signup</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
