import { Box, Typography, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const getStatusColor = (status) => {
    switch (status) {
        case 'confirmed': return 'success';
        case 'pending': return 'warning';
        case 'available': return 'default';
        case 'blocked': return 'error'; // Added blocked status
        default: return 'primary';
    }
};

export default function ScheduleSlot({ slot, onEdit }) {
    return (
        <Box
            sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                p: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <Box>
                <Typography variant="body1" fontWeight="bold">
                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                {slot.customerName && (
                    <>
                        <Typography variant="body2">{slot.customerName}</Typography>
                        <Typography variant="body2" color="text.secondary">{slot.location}</Typography>
                        <Typography variant="body2" color="primary">{slot.serviceName}</Typography>
                    </>
                )}
                {!slot.customerName && slot.status === 'available' && (
                    <Typography variant="body2" color="success.main">Free Slot</Typography>
                )}
                 {!slot.customerName && slot.status === 'blocked' && (
                    <Typography variant="body2" color="error.main">Blocked Slot</Typography>
                )}
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
                <Chip
                    label={slot.status}
                    color={getStatusColor(slot.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                />
                <IconButton size="small" onClick={() => onEdit(slot)}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}
