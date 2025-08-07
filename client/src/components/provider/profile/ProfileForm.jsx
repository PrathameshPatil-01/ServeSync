import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProvider, fetchProvider } from '@/redux/provider/providerThunks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { clearProviderError } from '@/redux/provider/providerSlice';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter valid 10-digit phone number')
    .required('Phone number is required'),
  businessName: Yup.string().required('Business name is required'),
  bio: Yup.string().max(1000, 'Bio cannot exceed 1000 characters'),
  yearsOfExperience: Yup.number().min(0, 'Must be non-negative').required('Required'),
  serviceAreaRadiusKm: Yup.number().min(1, 'Minimum 1 km').required('Required'),
});

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { provider, loading, error, success } = useSelector((state) => state.provider);
  const { userId } = useSelector((state) => state.providerAuth); // Assuming userId is available here

  useEffect(() => {
    if (userId) {
      dispatch(fetchProvider(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully!');
      dispatch(clearProviderError()); // Clear success message after toast
    }
    if (error) {
      toast.error(error);
      dispatch(clearProviderError()); // Clear error message after toast
    }
  }, [success, error, dispatch]);

  if (loading && !provider) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !provider) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!provider) {
    return <Typography>No provider data found. Please complete your registration.</Typography>;
  }

  return (
    <Formik
      initialValues={{
        fullName: provider.fullName || '',
        email: provider.email || '',
        phoneNumber: provider.phoneNumber || '',
        businessName: provider.businessName || '',
        bio: provider.bio || '',
        yearsOfExperience: provider.yearsOfExperience || 0,
        serviceAreaRadiusKm: provider.serviceAreaRadiusKm || 10,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateProvider({ providerId: userId, updateData: values }))
          .unwrap()
          .catch(() => setSubmitting(false))
          .finally(() => setSubmitting(false));
      }}
      enableReinitialize // Reinitialize form when provider data changes
    >
      {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
        <Form noValidate>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && !!errors.fullName}
              helperText={touched.fullName && errors.fullName}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              disabled // Email is usually not editable
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
            <TextField
              name="businessName"
              label="Business Name"
              fullWidth
              value={values.businessName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.businessName && !!errors.businessName}
              helperText={touched.businessName && errors.businessName}
            />
            <TextField
              name="bio"
              label="Short Bio"
              fullWidth
              multiline
              rows={4}
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.bio && !!errors.bio}
              helperText={touched.bio && errors.bio}
            />
            <Box display="flex" gap={2}>
              <TextField
                name="yearsOfExperience"
                label="Years of Experience"
                type="number"
                fullWidth
                value={values.yearsOfExperience}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.yearsOfExperience && !!errors.yearsOfExperience}
                helperText={touched.yearsOfExperience && errors.yearsOfExperience}
              />
              <TextField
                name="serviceAreaRadiusKm"
                label="Service Area Radius (Km)"
                type="number"
                fullWidth
                value={values.serviceAreaRadiusKm}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.serviceAreaRadiusKm && !!errors.serviceAreaRadiusKm}
                helperText={touched.serviceAreaRadiusKm && errors.serviceAreaRadiusKm}
              />
            </Box>

            <Button type="submit" variant="contained" fullWidth disabled={loading || isSubmitting}>
              {loading || isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
