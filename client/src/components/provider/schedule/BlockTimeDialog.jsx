// src/components/provider/schedule/BlockTimeDialog.jsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  date: Yup.date().required('Date is required'),
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string().required('End time is required'),
  reason: Yup.string().max(255, 'Reason too long'),
});

export default function BlockTimeDialog({ open, onClose, onBlock, loading }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', pb: 2 }}>Block Time Slot</DialogTitle>
      <Formik
        initialValues={{
          date: new Date().toISOString().split('T')[0], // Default to today
          startTime: '09:00',
          endTime: '10:00',
          reason: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onBlock(values);
          setSubmitting(false); // Dialog closes via onBlock's success/error handling
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
          <Form>
            <DialogContent dividers sx={{ pt: 2 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  name="date"
                  label="Date"
                  type="date"
                  fullWidth
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
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
                <TextField
                  name="reason"
                  label="Reason (Optional)"
                  fullWidth
                  multiline
                  rows={2}
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.reason && !!errors.reason}
                  helperText={touched.reason && errors.reason}
                  variant="outlined"
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Block Time'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
