import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axiosInstance from '@/api/axios';

const validationSchema = Yup.object({
  subServiceId: Yup.number().required('Sub-service is required').min(1, 'Sub-service is required'),
  price: Yup.number().min(0.01, 'Price must be positive').required('Price is required'),
  currency: Yup.string().required('Currency is required').max(10, 'Currency code max length is 10'),
  estimatedDurationMinutes: Yup.number().min(1, 'Estimated duration must be at least 1 minute').required('Estimated duration is required'),
});

export default function AddEditServiceDialog({ open, onClose, serviceToEdit, onSave, loading }) {
  const isEditMode = Boolean(serviceToEdit);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subServicesForSelectedCategory, setSubServicesForSelectedCategory] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndSubServices = async () => {
      try {
        const response = await axiosInstance.get('/services/all-with-subservices');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories and sub-services:', error);
        setCategories([]);
      }
    };
    if (open) {
      fetchCategoriesAndSubServices();
    }
  }, [open]);

  useEffect(() => {
    if (serviceToEdit && categories.length > 0) {
      const categoryOfEditedService = categories.find((cat) =>
        cat.subServices.some((sub) => sub.id === serviceToEdit.subService.id)
      );
      if (categoryOfEditedService) {
        setSelectedCategory(categoryOfEditedService.id);
        setSubServicesForSelectedCategory(categoryOfEditedService.subServices);
      }
    }
  }, [serviceToEdit, categories]);

  const initialValues = serviceToEdit
    ? {
        subServiceId: serviceToEdit.subService.id,
        price: serviceToEdit.price,
        currency: serviceToEdit.currency,
        estimatedDurationMinutes: serviceToEdit.estimatedDurationMinutes,
        isActive: serviceToEdit.isActive,
      }
    : {
        subServiceId: '',
        price: '',
        currency: 'INR',
        estimatedDurationMinutes: 30,
        isActive: true,
      };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', pb: 2 }}>
        {isEditMode ? 'Edit Service Offer' : 'Add New Service Offer'}
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          onSave(values);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors, setFieldValue, isSubmitting }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2 }}>
              <Box display="flex" flexDirection="column" gap={2}>

                {/* Category Select */}
                {!isEditMode && (
                  <FormControl fullWidth variant="outlined" error={touched.category && !!errors.category}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      label="Category"
                      value={selectedCategory}
                      onChange={(e) => {
                        const catId = e.target.value;
                        setSelectedCategory(catId);
                        const selectedCat = categories.find((cat) => cat.id === catId);
                        setSubServicesForSelectedCategory(selectedCat ? selectedCat.subServices : []);
                        setFieldValue('subServiceId', '');
                      }}
                      onBlur={handleBlur}
                      required
                    >
                      <MenuItem value="">
                        <em>Select a Category</em>
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.serviceName}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category && errors.category && (
                      <Typography variant="caption" color="error">
                        {errors.category}
                      </Typography>
                    )}
                  </FormControl>
                )}

                {/* Sub-Service Select */}
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={touched.subServiceId && !!errors.subServiceId}
                  disabled={isEditMode ? false : subServicesForSelectedCategory.length === 0}
                  required
                >
                  <InputLabel id="subservice-label">Sub-Service</InputLabel>
                  <Select
                    labelId="subservice-label"
                    name="subServiceId"
                    label="Sub-Service"
                    value={values.subServiceId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="">
                      <em>Select a Sub-Service</em>
                    </MenuItem>
                    {(isEditMode ? [serviceToEdit.subService] : subServicesForSelectedCategory).map((sub) => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.subServiceName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.subServiceId && errors.subServiceId && (
                    <Typography variant="caption" color="error">
                      {errors.subServiceId}
                    </Typography>
                  )}
                </FormControl>

                {/* Price */}
                <TextField
                  name="price"
                  label="Price (₹)"
                  type="number"
                  fullWidth
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  variant="outlined"
                  required
                />

                {/* Currency */}
                <TextField
                  name="currency"
                  label="Currency"
                  fullWidth
                  value={values.currency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.currency && !!errors.currency}
                  helperText={touched.currency && errors.currency}
                  variant="outlined"
                  required
                />

                {/* Estimated Duration */}
                <TextField
                  name="estimatedDurationMinutes"
                  label="Estimated Duration (minutes)"
                  type="number"
                  fullWidth
                  value={values.estimatedDurationMinutes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.estimatedDurationMinutes && !!errors.estimatedDurationMinutes}
                  helperText={touched.estimatedDurationMinutes && errors.estimatedDurationMinutes}
                  variant="outlined"
                  required
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={onClose} color="secondary" variant="outlined" disabled={loading || isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading || isSubmitting}>
                {(loading || isSubmitting) ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'Save Changes' : 'Add Service Offer')}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
