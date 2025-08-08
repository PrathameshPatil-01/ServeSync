import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

export default function ServiceItem({ service, onEdit, onDelete }) {
  const theme = useTheme(); // Use theme hook

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 3, // More rounded corners
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)', // Softer shadow
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-3px)', // Subtle lift on hover
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)', // Enhanced shadow on hover
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold" color="primary.dark" gutterBottom>
              {service.subService?.subServiceName || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Category: {service.subService?.serviceName || 'N/A'}
            </Typography>
            <Typography variant="h5" fontWeight="bold" mt={1} color="success.main">
              {service.currency}{service.price?.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Est. Duration: {service.estimatedDurationMinutes} minutes
            </Typography>
            <Chip
              label={service.isActive ? 'Active' : 'Inactive'}
              color={service.isActive ? 'success' : 'default'}
              size="small"
              sx={{ mt: 1, fontWeight: 'medium' }}
            />
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="flex-end">
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(service)}
              sx={{
                minWidth: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(service.id)}
              sx={{
                minWidth: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: theme.palette.error.light,
                  color: theme.palette.error.contrastText,
                },
              }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

