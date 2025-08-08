// src/components/provider/profile/ProfileForm.jsx
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProvider, fetchProvider } from '@/redux/provider/providerThunks';  
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { clearProviderError } from '@/redux/provider/providerSlice';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  businessName: Yup.string().required('Business name is required'),
  aadharNumber: Yup.string().matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits').required('Aadhar number is required'),
  gstNumber: Yup.string().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number format').nullable(),
  panNumber: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format').nullable(),
  bio: Yup.string().max(1000, 'Bio cannot exceed 1000 characters'),
  yearsOfExperience: Yup.number().min(0, 'Must be non-negative').required('Required'),
  availableDays: Yup.string().max(50, 'Max 50 characters').nullable(),
  availableTimeStart: Yup.string().nullable(),
  availableTimeEnd: Yup.string().nullable(),
  serviceAreaRadiusKm: Yup.number().min(1, 'Minimum 1 km').required('Required'),
  // Address fields
  addressLine1: Yup.string().required('Address Line 1 is required'),
  addressLine2: Yup.string().nullable(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().matches(/^[0-9]{6}$/, 'Zip Code must be 6 digits').required('Zip Code is required'),
});

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { provider, loading, error, success } = useSelector((state) => state.provider);
  const { user } = useSelector((state) => state.providerAuth);

  useEffect(() => {
    if (user?.providerId) {
      dispatch(fetchProvider(user?.providerId)); // Pass user?.providerId to fetchProvider
    }
  }, [dispatch, user?.providerId]);

  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully!');
      dispatch(clearProviderError());
    }
    if (error) {
      toast.error(error);
      dispatch(clearProviderError());
    }
  }, [success, error, dispatch]);

  if (loading && !provider) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress color="primary" />
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
        businessName: provider.businessName || '',
        aadharNumber: provider.aadharNumber || '',
        gstNumber: provider.gstNumber || '',
        panNumber: provider.panNumber || '',
        bio: provider.bio || '',
        yearsOfExperience: provider.yearsOfExperience || 0,
        availableDays: provider.availableDays || '',
        availableTimeStart: provider.availableTimeStart || '',
        availableTimeEnd: provider.availableTimeEnd || '',
        serviceAreaRadiusKm: provider.serviceAreaRadiusKm || 10,
        addressLine1: provider.address?.line1 || '',
        addressLine2: provider.address?.line2 || '',
        city: provider.address?.city || '',
        state: provider.address?.state || '',
        zipCode: provider.address?.zipCode || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (!user?.providerId) {
          toast.error("Provider ID not found. Cannot update profile.");
          setSubmitting(false);
          return;
        }

        const updateData = {
          fullName: values.fullName,
          businessName: values.businessName,
          aadharNumber: values.aadharNumber,
          gstNumber: values.gstNumber,
          panNumber: values.panNumber,
          bio: values.bio,
          yearsOfExperience: values.yearsOfExperience,
          availableDays: values.availableDays,
          availableTimeStart: values.availableTimeStart,
          availableTimeEnd: values.availableTimeEnd,
          serviceAreaRadiusKm: values.serviceAreaRadiusKm,
          address: {
            line1: values.addressLine1,
            line2: values.addressLine2,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
          },
        };

        dispatch(updateProvider({ providerId: provider.id, updateData }))
          .unwrap()
          .catch(() => setSubmitting(false))
          .finally(() => setSubmitting(false));
      }}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
        <Form noValidate>
          <Box display="flex" flexDirection="column" gap={3}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Typography variant="h6" gutterBottom color="primary.dark">Personal & Business Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="fullName"
                    label="Full Name"
                    fullWidth
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="businessName"
                    label="Business Name"
                    fullWidth
                    value={values.businessName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.businessName && !!errors.businessName}
                    helperText={touched.businessName && errors.businessName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="aadharNumber"
                    label="Aadhar Number"
                    fullWidth
                    value={values.aadharNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.aadharNumber && !!errors.aadharNumber}
                    helperText={touched.aadharNumber && errors.aadharNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="gstNumber"
                    label="GST Number"
                    fullWidth
                    value={values.gstNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gstNumber && !!errors.gstNumber}
                    helperText={touched.gstNumber && errors.gstNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="panNumber"
                    label="PAN Number"
                    fullWidth
                    value={values.panNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.panNumber && !!errors.panNumber}
                    helperText={touched.panNumber && errors.panNumber}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
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
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="primary.dark">Service & Availability</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="availableDays"
                    label="Available Days (e.g., Mon,Tue,Wed)"
                    fullWidth
                    value={values.availableDays}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.availableDays && !!errors.availableDays}
                    helperText={touched.availableDays && errors.availableDays}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="availableTimeStart"
                    label="Available Time Start"
                    type="time"
                    fullWidth
                    value={values.availableTimeStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.availableTimeStart && !!errors.availableTimeStart}
                    helperText={touched.availableTimeStart && errors.availableTimeStart}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="availableTimeEnd"
                    label="Available Time End"
                    type="time"
                    fullWidth
                    value={values.availableTimeEnd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.availableTimeEnd && !!errors.availableTimeEnd}
                    helperText={touched.availableTimeEnd && errors.availableTimeEnd}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }} color="primary.dark">Address Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="addressLine1"
                    label="Address Line 1"
                    fullWidth
                    value={values.addressLine1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.addressLine1 && !!errors.addressLine1}
                    helperText={touched.addressLine1 && errors.addressLine1}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="addressLine2"
                    label="Address Line 2 (Optional)"
                    fullWidth
                    value={values.addressLine2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.addressLine2 && !!errors.addressLine2}
                    helperText={touched.addressLine2 && errors.addressLine2}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="city"
                    label="City"
                    fullWidth
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="state"
                    label="State"
                    fullWidth
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    value={values.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.zipCode && !!errors.zipCode}
                    helperText={touched.zipCode && errors.zipCode}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </motion.div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || isSubmitting}
              sx={{ mt: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              {loading || isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
