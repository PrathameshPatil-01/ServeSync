import { Box, Typography, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const getStatusColor = (status) => {
    switch (status) {
        case 'confirmed': return 'success';
        case 'pending': return 'warning';
        case 'available': return 'default';
        default: return 'primary';
    }
};

export default function ScheduleSlot({ slot }) {
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
                    {slot.time}
                </Typography>
                {slot.customer && (
                    <>
                        <Typography variant="body2">{slot.customer}</Typography>
                        <Typography variant="body2" color="text.secondary">{slot.location}</Typography>
                        <Typography variant="body2" color="primary">{slot.service}</Typography>
                    </>
                )}
                {!slot.customer && (
                    <Typography variant="body2" color="success.main">Free Slot</Typography>
                )}
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
                <Chip
                    label={slot.status}
                    color={getStatusColor(slot.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                />
                <IconButton size="small">
                    <EditIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}
