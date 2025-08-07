import { Box, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ScheduleSlot from '@/components/provider/schedule/ScheduleSlot';
import QuickStats from '@/components/provider/schedule/QuickStats';
import WorkingHoursDay from '@/components/provider/schedule/WorkingHoursDay';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSchedule,
    fetchWorkingHours,
    updateWorkingHours,
    blockTimeSlot,
} from '@/redux/schedule/scheduleThunks';
import { fetchDashboardStats } from '@/redux/provider/providerThunks';
import { clearScheduleError } from '@/redux/schedule/scheduleSlice';
import { toast } from 'react-toastify';
import WorkingHoursDialog from '@/components/provider/schedule/WorkingHoursDialog';
import BlockTimeDialog from '@/components/provider/schedule/BlockTimeDialog';

export default function SchedulePage() {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.providerAuth);
    const { schedule, workingHours, loading, error } = useSelector((state) => state.schedule);
    const { dashboardStats } = useSelector((state) => state.provider);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [workingHoursDialogOpen, setWorkingHoursDialogOpen] = useState(false);
    const [selectedDayForHours, setSelectedDayForHours] = useState(null);
    const [selectedHoursForDay, setSelectedHoursForDay] = useState(null);
    const [blockTimeDialogOpen, setBlockTimeDialogOpen] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(fetchSchedule({ providerId: userId, date: selectedDate }));
            dispatch(fetchWorkingHours(userId));
            dispatch(fetchDashboardStats(userId)); // Fetch updated stats for QuickStats
        }
    }, [dispatch, userId, selectedDate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearScheduleError());
        }
    }, [error, dispatch]);

    const handleEditWorkingHours = (day, hours) => {
        setSelectedDayForHours(day);
        setSelectedHoursForDay(hours);
        setWorkingHoursDialogOpen(true);
    };

    const handleSaveWorkingHours = (day, values) => {
        const formattedHours = values.isClosed ? 'Closed' : `${values.startTime} - ${values.endTime}`;
        dispatch(updateWorkingHours({ providerId: userId, workingHoursData: { day, hours: formattedHours } }))
            .unwrap()
            .then(() => toast.success(`Working hours for ${day} updated!`))
            .catch(() => {}); // Error handled by useEffect
    };

    const handleBlockTime = (slotData) => {
        const fullDate = new Date(slotData.date);
        const startDateTime = new Date(fullDate.setHours(parseInt(slotData.startTime.split(':')[0]), parseInt(slotData.startTime.split(':')[1])));
        const endDateTime = new Date(fullDate.setHours(parseInt(slotData.endTime.split(':')[0]), parseInt(slotData.endTime.split(':')[1])));

        dispatch(blockTimeSlot({
            providerId: userId,
            slotData: {
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                reason: slotData.reason,
                status: 'blocked',
            },
        }))
            .unwrap()
            .then(() => toast.success('Time slot blocked successfully!'))
            .catch(() => {}); // Error handled by useEffect
    };

    const handleEditScheduleSlot = (slot) => {
        // Implement logic to edit an existing schedule slot (e.g., change status, reassign)
        // This might open a new dialog or navigate to a specific booking detail page.
        toast.info(`Editing slot for ${slot.time}`);
    };

    const formattedWorkingHours = workingHours.map(wh => ({
        day: wh.day,
        hours: wh.hours,
    }));

    const quickStatsData = {
        todayBookings: dashboardStats.todayBookings || 0,
        availableSlots: dashboardStats.availableSlots || 0,
        totalHours: dashboardStats.totalHours || 0,
        weekBookings: dashboardStats.weekBookings || 0,
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h5">Schedule</Typography>
                    <Typography variant="body1">Manage your availability and appointments</Typography>
                </Box>
                <Button variant="contained" onClick={() => setBlockTimeDialogOpen(true)}>+ Block Time</Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Today's Schedule</Typography>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                                <CircularProgress size={24} />
                            </Box>
                        ) : schedule.length === 0 ? (
                            <Typography>No appointments or blocked slots for today.</Typography>
                        ) : (
                            schedule.map((slot) => (
                                <ScheduleSlot key={slot.id} slot={slot} onEdit={handleEditScheduleSlot} />
                            ))
                        )}
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>Working Hours</Typography>
                        {loading ? (
                            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                                <CircularProgress size={24} />
                            </Box>
                        ) : formattedWorkingHours.length === 0 ? (
                            <Typography>No working hours configured.</Typography>
                        ) : (
                            formattedWorkingHours.map((wh, index) => (
                                <WorkingHoursDay key={index} day={wh.day} hours={wh.hours} onEdit={handleEditWorkingHours} />
                            ))
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Calendar</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateCalendar value={selectedDate} onChange={setSelectedDate} />
                        </LocalizationProvider>
                    </Box>

                    <QuickStats stats={quickStatsData} />
                </Grid>
            </Grid>

            {selectedDayForHours && (
                <WorkingHoursDialog
                    open={workingHoursDialogOpen}
                    onClose={() => setWorkingHoursDialogOpen(false)}
                    day={selectedDayForHours}
                    currentHours={selectedHoursForDay}
                    onSave={handleSaveWorkingHours}
                />
            )}

            <BlockTimeDialog
                open={blockTimeDialogOpen}
                onClose={() => setBlockTimeDialogOpen(false)}
                onBlock={handleBlockTime}
            />
        </Box>
    );
}
