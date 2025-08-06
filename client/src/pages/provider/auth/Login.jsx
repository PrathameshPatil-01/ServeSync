// src/components/auth/LoginForm.jsx
import ProviderAuthLayout from '@/layouts/ProviderAuthLayout.jsx';
import { clearAuthMessages } from '@/redux/provider/auth/providerAuthSlice.js'; // create this action
import { login } from '@/redux/provider/auth/providerAuthThunks'; // Adjust the import path as needed
import { Box, Button, Link as MuiLink, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';



const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const { userId, loading, error } = useSelector((state) => state.providerAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      toast.success('Logged in successfully!');
      navigate('/provider/update');
    }
  }, [userId, navigate]);

  useEffect(() => {
    dispatch(clearAuthMessages()); // Clear messages on component mount   
  }, [dispatch]);

  return (
    <ProviderAuthLayout title="Login">
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
                <MuiLink component={Link} to="/provider/forgot-password" underline="hover" fontSize={17}>
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button type="submit" variant="contained" fullWidth disabled={loading || isSubmitting}>
                {loading || isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              <Typography variant="body2" align="center">
                Don&apos;t have an account?{' '}
                <MuiLink component={Link} to="/provider/signup" underline="hover">
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </ProviderAuthLayout>
  );
}
