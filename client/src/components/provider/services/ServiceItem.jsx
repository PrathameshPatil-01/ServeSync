import { Box, Typography, Button, Card, CardContent, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ServiceItem({ service, onEdit, onDelete }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">{service.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {service.category} {service.subCategory ? ` / ${service.subCategory}` : ''}
            </Typography>
            <Typography variant="body1" fontWeight="bold" mt={1}>
              ₹{service.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service.description}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(service)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(service.id)}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
