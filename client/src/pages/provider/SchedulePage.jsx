import { Box, Typography, Grid, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ScheduleSlot from '@/components/provider/schedule/ScheduleSlot';
import QuickStats from '@/components/provider/schedule/QuickStats';
import WorkingHoursDay from '@/components/provider/schedule/WorkingHoursDay';
import { useState } from 'react';

const schedule = [
    { time: '9:00 AM - 10:00 AM', customer: 'Sneha Patel', location: 'Cyber City, Gurgaon', service: 'Plumbing Repair', status: 'confirmed' },
    { time: '11:00 AM - 12:00 PM', customer: 'Rajesh Kumar', location: 'DLF Phase 2, Gurgaon', service: 'AC Repair', status: 'confirmed' },
    { time: '2:00 PM - 4:00 PM', customer: 'Priya Sharma', location: 'Sector 15, Gurgaon', service: 'Home Cleaning', status: 'pending' },
    { time: '5:00 PM - 6:00 PM', status: 'available' },
];

const workingHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 2:00 PM' },
];

const stats = { todayBookings: 3, availableSlots: 1, totalHours: 7, weekBookings: 28 };

export default function SchedulePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <Box sx={{ ml: '260px', p: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h5">Schedule</Typography>
                    <Typography variant="body1">Manage your availability and appointments</Typography>
                </Box>
                <Button variant="contained">+ Block Time</Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Today's Schedule</Typography>
                        {schedule.map((slot, index) => (
                            <ScheduleSlot key={index} slot={slot} />
                        ))}
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>Working Hours</Typography>
                        {workingHours.map((wh, index) => (
                            <WorkingHoursDay key={index} day={wh.day} hours={wh.hours} />
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Calendar</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateCalendar value={selectedDate} onChange={setSelectedDate} />
                        </LocalizationProvider>
                    </Box>

                    <QuickStats stats={stats} />
                </Grid>
            </Grid>
        </Box>
    );
}
