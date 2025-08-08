// src/pages/auth/Login.jsx
import AuthLayout from '@/layouts/AuthLayout.jsx';
import { clearAuthError, clearAuthMessages, login } from '@/redux/provider/auth/providerAuthSlice';
import { Box, Button, CircularProgress, Link as MuiLink, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() { // Renamed component to Login
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, roles } = useSelector((state) => state.providerAuth); // Using providerAuth slice

  const navigate = useNavigate();

    useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated && roles.includes('ROLE_PROVIDER')) {
      toast.success('Logged in successfully!');
      navigate('/provider/dashboard', { replace: true });
    } else if (isAuthenticated && roles.includes('ROLE_CUSTOMER')) {
      // If a customer tries to log in via provider path, redirect to customer dashboard
      toast.info('Logged in as customer. Redirecting to customer dashboard.');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, roles, navigate]);

  useEffect(() => {
    dispatch(clearAuthMessages()); // Clear messages on component mount   
  }, [dispatch]);

  return (
    <AuthLayout title="Provider Login"> {/* Updated title */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values)).unwrap().catch(() => setSubmitting(false));
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
          <Form noValidate>
            <Box display="flex" flexDirection="column" gap={3}>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Typography color="error" fontSize="0.9rem">
                    {error}
                  </Typography>
                </motion.div>
              )}

              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Box textAlign="right">
                <MuiLink component={Link} to="/provider/forgot-password" underline="hover" color="primary.main" fontWeight="medium">
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || isSubmitting}
                sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
              >
                {loading || isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>

              <Typography variant="body2" align="center">
                Don&apos;t have an account?{' '}
                <MuiLink component={Link} to="/provider/signup" underline="hover" color="primary.main" fontWeight="medium">
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
