// src/pages/auth/ForgotPassword.jsx
import { TextField, Button, Link } from '@mui/material';
import AuthFormWrapper from '../../components/auth/AuthFormWrapper';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    // TODO: Add API call to send reset link
    console.log('Reset link sent to:', email);
  };

  return (
    <AuthFormWrapper title="Reset Password">
      <TextField
        fullWidth margin="normal"
        label="Email" type="email"
        value={email} onChange={e => setEmail(e.target.value)}
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleReset}>
        Send Reset Link
      </Button>
      <Link href="/auth/login" underline="hover" sx={{ display: 'block', mt: 2 }}>
        Back to Login
      </Link>
    </AuthFormWrapper>
  );
}
