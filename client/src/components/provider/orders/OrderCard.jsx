import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Card, CardContent, Chip, IconButton, Menu, MenuItem, Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';

const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return 'warning';
        case 'confirmed': return 'success';
        case 'in_progress': return 'info';
        case 'completed': return 'default';
        case 'cancelled':
        case 'rejected': return 'error';
        default: return 'primary';
    }
};

export default function OrderCard({ order, onUpdateStatus }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleStatusChange = (newStatus) => {
        onUpdateStatus(order.id, newStatus);
        handleMenuClose();
    };

    const customerName = order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'N/A';
    const customerPhone = order.customer?.phoneNumber || 'N/A';
    const serviceAddress = order.serviceAddress
        ? `${order.serviceAddress.line1 || ''}, ${order.serviceAddress.city || ''}`
        : 'N/A';
    const serviceName = order.providerServiceOffer?.subService?.subServiceName || 'N/A';
    const scheduledTime = order.scheduledStart ? new Date(order.scheduledStart).toLocaleString() : 'N/A';

    const currentStatus = order.status?.toLowerCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            style={{ width: '100%', height: '100%' }}
        >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                            Order #{order.id}
                        </Typography>
                        <Chip label={order.status} color={getStatusColor(currentStatus)} size="small" sx={{ textTransform: 'capitalize' }} />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        <b>Customer:</b> {customerName} | {customerPhone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Address:</b> {serviceAddress}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Scheduled:</b> {scheduledTime}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Service: {serviceName}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                            ₹{order.totalPrice?.toFixed(2) || '0.00'}
                        </Typography>

                        <IconButton onClick={handleMenuClick} size="small" sx={{ color: 'text.secondary' }}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                            {currentStatus === 'pending' && (
                                <>
                                    <MenuItem onClick={() => handleStatusChange('CONFIRMED')}>Confirm</MenuItem>
                                    <MenuItem onClick={() => handleStatusChange('REJECTED')}>Reject</MenuItem>
                                </>
                            )}
                            {currentStatus === 'confirmed' && (
                                <>
                                    <MenuItem onClick={() => handleStatusChange('IN_PROGRESS')}>Start Service</MenuItem>
                                    <MenuItem onClick={() => handleStatusChange('CANCELLED')}>Cancel</MenuItem>
                                </>
                            )}
                            {currentStatus === 'in_progress' && (
                                <MenuItem onClick={() => handleStatusChange('COMPLETED')}>Complete Order</MenuItem>
                            )}
                            {(currentStatus === 'completed' || currentStatus === 'cancelled' || currentStatus === 'rejected') && (
                                <MenuItem disabled>No actions available</MenuItem>
                            )}
                        </Menu>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}
