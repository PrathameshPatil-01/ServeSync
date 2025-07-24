// src/pages/auth/Signup.jsx
import { TextField, Button, Link } from '@mui/material';
import AuthFormWrapper from '../../components/auth/AuthFormWrapper';
import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    // TODO: Add validation + API call
    console.log('Signing up with:', form);
  };

  return (
    <AuthFormWrapper title="Create Account">
      <TextField
        fullWidth margin="normal"
        label="Name" name="name"
        value={form.name} onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal"
        label="Email" name="email" type="email"
        value={form.email} onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal"
        label="Password" name="password" type="password"
        value={form.password} onChange={handleChange}
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSignup}>
        Sign Up
      </Button>
      <Link href="/auth/login" underline="hover" sx={{ display: 'block', mt: 2 }}>
        Already have an account? Login
      </Link>
    </AuthFormWrapper>
  );
}
