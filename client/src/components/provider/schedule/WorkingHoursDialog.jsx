// src/components/provider/schedule/WorkingHoursDialog.jsx
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  startTime: Yup.string().when('isClosed', {
    is: false,
    then: (schema) => schema.required('Start time is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  endTime: Yup.string().when('isClosed', {
    is: false,
    then: (schema) => schema.required('End time is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  isClosed: Yup.boolean(),
});

export default function WorkingHoursDialog({ open, onClose, day, currentHours, onSave, loading }) {
  const isClosed = currentHours === 'Closed';
  let initialStartTime = '09:00';
  let initialEndTime = '18:00';

  if (currentHours && currentHours !== 'Closed') {
    const parts = currentHours.split(' - ');
    if (parts.length === 2) {
      initialStartTime = parts[0];
      initialEndTime = parts[1];
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', pb: 2 }}>Edit Working Hours for {day}</DialogTitle>
      <Formik
        initialValues={{
          startTime: initialStartTime,
          endTime: initialEndTime,
          isClosed: isClosed,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSave(day, values);
          setSubmitting(false); // Dialog closes via onSave's success/error handling
        }}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isClosed}
                      onChange={handleChange}
                      name="isClosed"
                      color="primary"
                    />
                  }
                  label="Closed for the day"
                  sx={{ mb: 1 }}
                />

                {!values.isClosed && (
                  <Box display="flex" gap={2}>
                    <TextField
                      name="startTime"
                      label="Start Time"
                      type="time"
                      fullWidth
                      value={values.startTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.startTime && !!errors.startTime}
                      helperText={touched.startTime && errors.startTime}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                    <TextField
                      name="endTime"
                      label="End Time"
                      type="time"
                      fullWidth
                      value={values.endTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.endTime && !!errors.endTime}
                      helperText={touched.endTime && errors.endTime}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
