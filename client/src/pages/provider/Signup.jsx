// src/pages/auth/Signup.jsx
import AuthLayout from '@/layouts/AuthLayout.jsx';
import { clearAuthMessages, resetAuthState , signup } from '@/redux/provider/auth/providerAuthSlice';
import {
  Box,
  Button,
  CircularProgress,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter valid 10-digit phone number')
    .required('Phone number is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

export default function ProviderSignup() { // Renamed component to Signup
  const dispatch = useDispatch();
  const { signupSuccess, loading, error } = useSelector((state) => state.providerAuth); // Using providerAuth slice
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  useEffect(() => {
    if (signupSuccess) {
      navigate('/provider/login');
      dispatch(resetAuthState());
    }
  }, [signupSuccess, navigate, dispatch]);

  return (
    <AuthLayout title="Create Account">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          role: 'ROLE_PROVIDER', // Default role for provider registration
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // eslint-disable-next-line no-unused-vars
          const { confirmPassword, ...data } = values;
          dispatch(signup(data)).unwrap().catch(() => setSubmitting(false));
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

              <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                <TextField
                  name="firstName"
                  label="First Name"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <TextField
                name="email"
                label="Email Address"
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
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
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
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <input type="hidden" name="role" value={values.role} />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || isSubmitting}
                sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
              >
                {loading || isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <MuiLink component={Link} to="/provider/login" underline="hover" color="primary.main" fontWeight="medium">
                  Log in
                </MuiLink>
              </Typography>

              <Typography variant="body2" align="center">
                <MuiLink component={Link} to="/provider/forgot-password" underline="hover" color="primary.main" fontWeight="medium">
                  Forgot Password?
                </MuiLink>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
