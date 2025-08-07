import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string().required('End time is required'),
});

export default function WorkingHoursDialog({ open, onClose, day, currentHours, onSave }) {
  const isClosed = currentHours === 'Closed';
  const initialStartTime = isClosed ? '09:00' : currentHours.split(' - ')[0].replace(' AM', '').replace(' PM', '');
  const initialEndTime = isClosed ? '18:00' : currentHours.split(' - ')[1].replace(' AM', '').replace(' PM', '');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Working Hours for {day}</DialogTitle>
      <Formik
        initialValues={{
          startTime: initialStartTime,
          endTime: initialEndTime,
          isClosed: isClosed,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSave(day, values);
          onClose();
        }}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.isClosed}
                      onChange={handleChange}
                      name="isClosed"
                    />
                  }
                  label="Closed for the day"
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
                    />
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
