import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// Mock categories and subcategories (replace with real data if available)
const categories = [
  { name: 'AC Repair', subCategories: ['Split AC', 'Window AC'] },
  { name: 'Salon', subCategories: ['Haircut', 'Facial'] },
  { name: 'Plumbing', subCategories: ['Leak Fix', 'Installation'] },
  { name: 'Cleaning', subCategories: ['Deep Cleaning', 'Bathroom Cleaning'] },
  { name: 'Electrician', subCategories: ['Wiring', 'Appliance Repair'] },
];

const validationSchema = Yup.object({
  name: Yup.string().required('Service name is required'),
  category: Yup.string().required('Category is required'),
  subCategory: Yup.string().nullable(),
  price: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
  description: Yup.string().max(500, 'Description too long'),
});

export default function AddEditServiceDialog({ open, onClose, serviceToEdit, onSave }) {
  const isEditMode = !!serviceToEdit;

  const initialValues = serviceToEdit || {
    name: '',
    category: '',
    subCategory: '',
    price: 0,
    description: '',
  };

  const currentCategory = categories.find(cat => cat.name === initialValues.category);
  const subCategoriesForSelectedCategory = currentCategory ? currentCategory.subCategories : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Service' : 'Add New Service'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(values);
          onClose();
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
          <Form>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  name="name"
                  label="Service Name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <FormControl fullWidth error={touched.category && !!errors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    label="Category"
                    value={values.category}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('subCategory', ''); // Reset subcategory when category changes
                    }}
                    onBlur={handleBlur}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.name} value={cat.name}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <Typography variant="caption" color="error">{errors.category}</Typography>
                  )}
                </FormControl>

                {values.category && subCategoriesForSelectedCategory.length > 0 && (
                  <FormControl fullWidth error={touched.subCategory && !!errors.subCategory}>
                    <InputLabel>Sub-Category</InputLabel>
                    <Select
                      name="subCategory"
                      label="Sub-Category"
                      value={values.subCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {subCategoriesForSelectedCategory.map((subCat) => (
                        <MenuItem key={subCat} value={subCat}>
                          {subCat}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.subCategory && errors.subCategory && (
                      <Typography variant="caption" color="error">{errors.subCategory}</Typography>
                    )}
                  </FormControl>
                )}

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
                />

                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                {isEditMode ? 'Save Changes' : 'Add Service'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
