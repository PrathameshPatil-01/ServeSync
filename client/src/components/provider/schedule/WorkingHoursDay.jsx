// src/components/provider/schedule/WorkingHoursDay.jsx
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function WorkingHoursDay({ day, hours, onEdit }) {
    const displayHours = hours === 'Closed' ? 'Closed' : `${hours.startTime} - ${hours.endTime}`;
    const isClosed = hours === 'Closed';

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ x: 5 }}
        >
            <Box
                sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    mb: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
                    },
                }}
            >
                <Typography variant="body1" fontWeight="bold" color="text.primary">{day}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" color={isClosed ? 'error.main' : 'text.secondary'} fontWeight="medium">
                        {displayHours}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => onEdit(day, hours)}
                        sx={{ color: 'primary.main', '&:hover': { bgcolor: 'primary.light', color: 'primary.dark' } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </motion.div>
    );
}
