import BlockTimeDialog from '@/components/provider/schedule/BlockTimeDialog'; // Updated import path
import ScheduleSlot from '@/components/provider/schedule/ScheduleSlot'; // Updated import path
import WorkingHoursDay from '@/components/provider/schedule/WorkingHoursDay'; // Updated import path
import WorkingHoursDialog from '@/components/provider/schedule/WorkingHoursDialog'; // Updated import path
import {
  addBlockedTimeSlot,
  clearScheduleError,
  deleteBlockedTimeSlot,
  fetchDailySchedule,
  fetchWorkingHours,
  updateWorkingHours,
} from '@/redux/provider/schedule/scheduleSlice'; // Updated import path
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export default function Schedule() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.providerAuth);
  const { dailySchedule, workingHours, loading, error } = useSelector((state) => state.schedule);

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [blockTimeDialogOpen, setBlockTimeDialogOpen] = useState(false);
  const [workingHoursDialogOpen, setWorkingHoursDialogOpen] = useState(false);
  const [currentDayForWorkingHours, setCurrentDayForWorkingHours] = useState(null);
  const [currentHoursForDialog, setCurrentHoursForDialog] = useState(null);

  useEffect(() => {
    if (user?.providerId) {
      dispatch(fetchDailySchedule({ providerId : user?.providerId, date: selectedDate }));
      dispatch(fetchWorkingHours(user?.providerId));
    }
  }, [dispatch, user?.providerId, selectedDate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearScheduleError());
    }
  }, [error, dispatch]);

  const handleDateChange = (direction) => {
    const newDate = dayjs(selectedDate).add(direction, 'day').format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  const handleBlockTime = (values) => {
    if (!user?.providerId) {
      toast.error("Provider ID not found. Cannot block time.");
      return;
    }
    const startTime = dayjs(`${values.date}T${values.startTime}`).toISOString();
    const endTime = dayjs(`${values.date}T${values.endTime}`).toISOString();
    dispatch(addBlockedTimeSlot({ providerId : user?.providerId, slotData: { startTime, endTime, reason: values.reason } }));
  };

  const handleDeleteBlockedSlot = (slotId) => {
    if (window.confirm('Are you sure you want to delete this blocked time slot?')) {
      dispatch(deleteBlockedTimeSlot(slotId));
    }
  };

  const handleEditWorkingHours = (day, hours) => {
    setCurrentDayForWorkingHours(day);
    setCurrentHoursForDialog(hours);
    setWorkingHoursDialogOpen(true);
  };

  const handleSaveWorkingHours = (day, values) => {
    if (!user?.providerId) {
      toast.error("Provider ID not found. Cannot update working hours.");
      return;
    }

    const updatedWorkingHours = workingHours.map(wh => {
      if (wh.dayOfWeek === day) {
        return {
          ...wh,
          startTime: values.isClosed ? null : values.startTime,
          endTime: values.isClosed ? null : values.endTime,
          isWorking: !values.isClosed,
        };
      }
      return wh;
    });

    // If a new day is being added (e.g., if workingHours was empty or day not found)
    // This logic might need refinement if the backend expects only existing days to be updated
    // or if new days are created implicitly. For now, it ensures the day is present.
    if (!updatedWorkingHours.some(wh => wh.dayOfWeek === day)) {
        updatedWorkingHours.push({
            dayOfWeek: day,
            startTime: values.isClosed ? null : values.startTime,
            endTime: values.isClosed ? null : values.endTime,
            isWorking: !values.isClosed,
        });
    }

    dispatch(updateWorkingHours({ providerId : user?.providerId, workingHoursData: updatedWorkingHours }));
  };

  const getDisplayHours = (day) => {
    const hours = workingHours.find(wh => wh.dayOfWeek === day);
    if (!hours || !hours.isWorking) {
      return 'Closed';
    }
    return `${hours.startTime} - ${hours.endTime}`;
  };

  if (loading && dailySchedule.length === 0 && workingHours.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading schedule: {error}</Alert>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.dark">
          Your Schedule
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Manage your availability and appointments.
        </Typography>

      <Grid container spacing={3}>
        {/* Daily Schedule Section */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <IconButton onClick={() => handleDateChange(-1)} size="large">
                <ArrowBackIosIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">{dayjs(selectedDate).format('dddd, MMMM D, YYYY')}</Typography>
              <IconButton onClick={() => handleDateChange(1)} size="large">
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setBlockTimeDialogOpen(true)}
              sx={{ mb: 3 }}
            >
              Block Time Slot
            </Button>

            {dailySchedule.length === 0 && !loading ? (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                No bookings or blocked slots for this day.
              </Typography>
            ) : (
              <Box>
                {dailySchedule.map((slot, index) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                  >
                    <ScheduleSlot
                      slot={slot}
                      onDeleteBlockedSlot={handleDeleteBlockedSlot}
                    />
                  </motion.div>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Working Hours Section */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Working Hours
            </Typography>
            {daysOfWeek.map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <WorkingHoursDay
                  day={day}
                  hours={getDisplayHours(day)}
                  onEdit={handleEditWorkingHours}
                />
              </motion.div>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <BlockTimeDialog
        open={blockTimeDialogOpen}
        onClose={() => setBlockTimeDialogOpen(false)}
        onBlock={handleBlockTime}
      />

      <WorkingHoursDialog
        open={workingHoursDialogOpen}
        onClose={() => setWorkingHoursDialogOpen(false)}
        day={currentDayForWorkingHours}
        currentHours={currentHoursForDialog}
        onSave={handleSaveWorkingHours}
      />
    </motion.div>
  );
}

