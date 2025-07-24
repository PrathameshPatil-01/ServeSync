// src/pages/auth/Login.jsx
import { TextField, Button, Link } from '@mui/material';
import AuthFormWrapper from '../../components/auth/AuthFormWrapper';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Add validation + API call
    console.log('Logging in with:', email, password);
  };

  return (
    <AuthFormWrapper title="Login">
      <TextField
        fullWidth margin="normal"
        label="Email" type="email"
        value={email} onChange={e => setEmail(e.target.value)}
      />
      <TextField
        fullWidth margin="normal"
        label="Password" type="password"
        value={password} onChange={e => setPassword(e.target.value)}
      />
      <Button
        fullWidth variant="contained" sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Link href="/auth/forgot-password" underline="hover" sx={{ display: 'block', mt: 2 }}>
        Forgot Password?
      </Link>
      <Link href="/auth/signup" underline="hover">
        Don't have an account? Sign up
      </Link>
    </AuthFormWrapper>
  );
}
