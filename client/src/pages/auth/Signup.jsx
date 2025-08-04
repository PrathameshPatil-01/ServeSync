// src/components/auth/SignupForm.jsx
import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import AuthLayout from '../../layouts/AuthLayout';
import { clearAuthMessages, resetAuthState } from '../../redux/auth/authSlice';
import { signup } from '../../redux/auth/authThunks';

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

export default function SignupForm() {
  const dispatch = useDispatch();
  const { signupSuccess, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // ✅ Clear messages when component mounts
  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  // ✅ Redirect after successful signup
  useEffect(() => {
    if (signupSuccess) {
      navigate('/auth/login');
      dispatch(resetAuthState()); // Reset flag after redirect
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
          role: 'ROLE_PROVIDER',
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
                <Typography color="error" fontSize="0.9rem">
                  {error}
                </Typography>
              )}

              <Box display="flex" gap={2}>
                <TextField
                  name="firstName"
                  label="First Name"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
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
              />

              <Box display="flex" gap={2}>
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
                />
              </Box>


              {/* Hidden Role */}
              <input type="hidden" name="role" value={values.role} />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? 'Registering...' : 'Sign Up'}
              </Button>

              <Typography variant="body2" align="center">
                Already have an account?{' '}
                <MuiLink component={Link} to="/auth/login" underline="hover">
                  Log in
                </MuiLink>
              </Typography>

              <Typography variant="body2" align="center">
                <MuiLink component={Link} to="/auth/forgot-password" underline="hover">
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
