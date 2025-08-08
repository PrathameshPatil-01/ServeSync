// src/pages/auth/ForgotPassword.jsx
import AuthLayout from '@/layouts/AuthLayout.jsx';
import { clearAuthMessages } from '@/redux/provider/auth/providerAuthSlice';
import { forgotPassword } from '@/redux/provider/auth/providerAuthThunks';
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
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPassword() { // Renamed component to ForgotPassword
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.providerAuth); // Using providerAuth slice

    useEffect(() => {
      dispatch(clearAuthMessages()); // Clear messages on component mount   
    }, [dispatch]);

  return (
    <AuthLayout title="Forgot Password">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(forgotPassword(values.email))
            .unwrap()
            .catch(() => setSubmitting(false))
            .finally(() => setSubmitting(false));
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form noValidate>
            <Box display="flex" flexDirection="column" gap={3}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Enter your registered email. We’ll send a reset link if it matches our records.
                </Typography>
              </motion.div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Typography color="error" fontSize="0.9rem" align="center">
                    {error}
                  </Typography>
                </motion.div>
              )}

              {successMessage && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <Typography color="success.main" fontSize="0.9rem" align="center">
                    {successMessage}
                  </Typography>
                </motion.div>
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
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading || isSubmitting}
                sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
              >
                {loading || isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
              </Button>

              <Typography variant="body2" align="center">
                Remember your password?{' '}
                <MuiLink component={Link} to="/provider/login" underline="hover" color="primary.main" fontWeight="medium">
                  Login
                </MuiLink>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
