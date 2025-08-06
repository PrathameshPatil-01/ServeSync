import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';

const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return 'warning';
        case 'accepted': return 'success';
        case 'in-progress': return 'info';
        case 'completed': return 'default';
        default: return 'primary';
    }
};

export default function OrderCard({ order }) {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Order #{order.id}
                    </Typography>
                    <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                </Box>

                <Typography variant="body2" color="text.secondary">
                    {order.customer} | {order.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {order.address} | {order.time}
                </Typography>

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    {order.service}
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                        ₹{order.price}
                    </Typography>

                    {order.status === 'pending' && (
                        <Button variant="contained" size="small">Accept</Button>
                    )}
                    {order.status === 'accepted' && (
                        <Button variant="contained" size="small">Start Service</Button>
                    )}
                    {order.status === 'in-progress' && (
                        <Button variant="contained" size="small">Complete Order</Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
