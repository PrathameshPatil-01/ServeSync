import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Chip, IconButton, Typography } from '@mui/material';

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'confirmed': return 'success';
        case 'pending': return 'warning';
        case 'in_progress': return 'info';
        case 'completed': return 'default';
        case 'blocked': return 'error';
        case 'cancelled': return 'error';
        case 'rejected': return 'error';
        default: return 'primary';
    }
};

export default function ScheduleSlot({ slot, onDeleteBlockedSlot }) {
    const isBlockedSlot = slot.type === 'BLOCKED';

    const title = isBlockedSlot ? slot.title : `Service with ${slot.title}`; // slot.title for booking is customer name
    const description = isBlockedSlot ? slot.description : slot.description; // slot.description for booking is subService name

    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'divider', // Use theme divider color
                borderRadius: 2,
                p: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', // Subtle shadow
            }}
        >
            <Box>
                <Typography variant="body1" fontWeight="bold" color="text.primary">
                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                <Typography variant="body2" color="primary.main" mt={0.5}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
                <Chip
                    label={slot.status}
                    color={getStatusColor(slot.status)}
                    size="small"
                    sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}
                />
                {isBlockedSlot && (
                    <IconButton size="small" onClick={() => onDeleteBlockedSlot(slot.id)} aria-label="delete blocked slot">
                        <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
}

