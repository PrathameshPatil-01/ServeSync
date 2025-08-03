// src/components/auth/LoginForm.jsx
import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { login } from '../../redux/auth/authThunks';
import { setAuthMode } from '../../redux/auth/authSlice';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values))
          .unwrap()
          .catch(() => setSubmitting(false));
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
        <Form>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Typography color="error">{error}</Typography>}

            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
            />

            <Typography
              onClick={() => dispatch(setAuthMode('forgot'))}
              sx={{ cursor: 'pointer', textAlign: 'right', fontSize: 14, userSelect: 'none' }}
            >
              Forgot Password?
            </Typography>

            <Button
              type="submit"
              variant="contained"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
