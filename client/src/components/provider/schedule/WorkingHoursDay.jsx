import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function WorkingHoursDay({ day, hours, onEdit }) {
    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                mb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="body2" fontWeight="bold">{day}</Typography>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">{hours}</Typography>
                <IconButton size="small" onClick={() => onEdit(day, hours)}><EditIcon fontSize="small" /></IconButton>
            </Box>
        </Box>
    );
}
