// src/components/provider/orders/OrderCard.jsx
import { Box, Button, Card, CardContent, Chip, Typography, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'; // For subtle animations

const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'pending': return 'warning';
        case 'confirmed': return 'success';
        case 'in_progress': return 'info';
        case 'completed': return 'default';
        case 'cancelled': return 'error';
        case 'rejected': return 'error';
        default: return 'primary';
    }
};

export default function OrderCard({ order, onUpdateStatus }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = (newStatus) => {
        onUpdateStatus(order.id, newStatus);
        handleMenuClose();
    };

    const customerName = order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'N/A';
    const customerPhone = order.customer ? order.customer.phoneNumber : 'N/A';
    const serviceAddress = order.serviceAddress ? `${order.serviceAddress.line1}, ${order.serviceAddress.city}` : 'N/A';
    const serviceName = order.providerServiceOffer ? order.providerServiceOffer.subService.subServiceName : 'N/A';
    const scheduledTime = order.scheduledStart ? new Date(order.scheduledStart).toLocaleString() : 'N/A';

    const currentStatus = order.status?.toLowerCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)' }}
            style={{ width: '100%', height: '100%' }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                            Order #{order.id}
                        </Typography>
                        <Chip label={order.status} color={getStatusColor(currentStatus)} size="small" sx={{ textTransform: 'capitalize' }} />
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                        <Box component="span" fontWeight="medium">Customer:</Box> {customerName} | {customerPhone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Box component="span" fontWeight="medium">Address:</Box> {serviceAddress}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Box component="span" fontWeight="medium">Scheduled:</Box> {scheduledTime}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Service: {serviceName}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            ₹{order.totalPrice?.toFixed(2)}
                        </Typography>

                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                            size="small"
                            sx={{ color: 'text.secondary' }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    borderRadius: 2,
                                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                                },
                            }}
                        >
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
                            {/* No actions for completed, cancelled, rejected */}
                            {(currentStatus === 'completed' || currentStatus === 'cancelled' || currentStatus === 'rejected') && (
                                <MenuItem disabled sx={{ color: 'text.disabled' }}>No actions available</MenuItem>
                            )}
                        </Menu>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}
