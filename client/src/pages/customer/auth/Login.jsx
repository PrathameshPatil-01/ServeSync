// src/components/auth/LoginForm.jsx
import React from 'react';
import { useEffect } from 'react';
import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../redux/customer/auth/customerAuthThunks'; // Adjust the import path as needed
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import { clearAuthMessages } from '../../../redux/customer/auth/customerAuthSlice'; // Adjust the import path as needed



const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const { userId, loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      toast.success('Logged in successfully!');
      navigate('/firstPage'); // redirect to home after login
    }
  }, [userId, navigate]);

  useEffect(() => {
    dispatch(clearAuthMessages()); // Clear messages on component mount   
  }, [dispatch]);

  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values)).unwrap().catch(() => setSubmitting(false));
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
          <Form noValidate>
            <Box display="flex" flexDirection="column" gap={2}>
              {error && (
                <Typography color="error" fontSize="0.9rem">
                  {error}
                </Typography>
              )}

              <TextField
                name="email"
                label="Email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Box textAlign="right">
                <MuiLink component={Link} to="/auth/forgot-password" underline="hover" fontSize={17}>
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button type="submit" variant="contained" fullWidth disabled={loading || isSubmitting}>
                {loading || isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              <Typography variant="body2" align="center">
                Don&apos;t have an account?{' '}
                <MuiLink component={Link} to="/auth/signup" underline="hover">
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
