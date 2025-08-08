// src/pages/provider/Orders.jsx
import OrderCard from '@/components/provider/orders/OrderCard';
import OrdersFilterTabs from '@/components/provider/orders/OrdersFilterTabs';
import { clearOrderError, fetchAllProviderOrders, updateOrder } from '@/redux/provider/orders/orderSlice';
import { Alert, Box, CircularProgress, Grid, Pagination, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const statuses = ['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected'];

export default function Orders() { // Renamed component to Orders
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.providerAuth);
    const { orders, totalPages, loading, error } = useSelector((state) => state.order);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [page, setPage] = useState(0); // Backend uses 0-indexed pages

    useEffect(() => {
        if (user?.providerId) {
            dispatch(fetchAllProviderOrders({ providerId: user?.providerId, status: selectedStatus, searchTerm, pageable: { page, size: 6 } }));
        }
    }, [dispatch, user?.providerId, selectedStatus, searchTerm, page]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearOrderError());
        }
    }, [error, dispatch]);

    const handleUpdateOrderStatus = (orderId, newStatus) => {
        dispatch(updateOrder({ orderId, newStatus }))
            .unwrap()
            .then(() => {
                toast.success(`Order ${orderId} status updated to ${newStatus}!`);
                // Re-fetch orders to update the list
                dispatch(fetchAllProviderOrders({ providerId: user?.providerId, status: selectedStatus, searchTerm, pageable: { page, size: 6 } }));
            })
            .catch(() => {
                // Error handled by useEffect above
            });
    };

    const countByStatus = useMemo(() => {
        // This would ideally come from a separate API endpoint for accurate counts across all statuses
        // For now, we'll count based on the currently fetched orders, which might not be comprehensive
        const counts = { all: orders.length };
        statuses.slice(1).forEach((status) => {
            counts[status] = orders.filter((o) => o.status?.toLowerCase() === status).length;
        });
        return counts;
    }, [orders]);

    const handleStatusChange = (newStatus) => {
        setSelectedStatus(newStatus);
        setPage(0); // Reset to first page when status changes
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1); // Convert to 0-indexed for backend
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.dark">
                    Orders
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Manage your service orders
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Search by customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <OrdersFilterTabs
                    statuses={statuses}
                    counts={countByStatus}
                    selectedStatus={selectedStatus}
                    onChange={handleStatusChange}
                />

                {loading && orders.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress color="primary" />
                    </Box>
                ) : error && orders.length === 0 ? (
                    <Alert severity="error">{error}</Alert>
                ) : orders.length === 0 ? (
                    <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                        No orders found for the selected filters.
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {orders.map((order) => (
                            <Grid item xs={12} md={6} lg={4} key={order.id} sx={{ display: 'flex' }}>
                                <OrderCard order={order} onUpdateStatus={handleUpdateOrderStatus} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page + 1} // Convert to 1-indexed for UI
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}
            </Box>
        </motion.div>
    );
}
