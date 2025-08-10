import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography
} from '@mui/material';
import { clearAuthMessages } from '../../../redux/customer/auth/customerAuthSlice.js'; // create this action
import { requestPasswordReset } from '../../../redux/customer/auth/customerAuthThunks'; // Adjust the import path as needed
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import AuthLayout from '../../../layouts/AuthLayout';
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.customerAuth);

    useEffect(() => {
      dispatch(clearAuthMessages()); // Clear messages on component mount   
    }, [dispatch]);

  return (
    <AuthLayout title="Forgot Password">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(requestPasswordReset(values.email))
            .unwrap()
            .catch(() => setSubmitting(false));
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
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Instruction Message */}
              <Typography variant="body2" color="text.secondary" align="center">
                Enter your registered email. We’ll send a reset link if it matches our records.
              </Typography>

              {/* Error Message */}
              {error && (
                <Typography color="error" fontSize="0.9rem" align="center">
                  {error}
                </Typography>
              )}

              {/* Success Message */}
              {successMessage && (
                <Typography color="success.main" fontSize="0.9rem" align="center">
                  {successMessage}
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

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
              </Button>

              <Typography variant="body2" align="center">
                Remember your password?{' '}
                <MuiLink component={Link} to="/customer/login" underline="hover">
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
