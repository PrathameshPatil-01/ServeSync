import { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Grid, TextField, CircularProgress, Alert } from '@mui/material';
import OrdersFilterTabs from '@/components/provider/orders/OrdersFilterTabs';
import OrderCard from '@/components/provider/orders/OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrder } from '@/redux/orders/orderThunks';
import { clearOrderError } from '@/redux/orders/orderSlice';
import { toast } from 'react-toastify';

const statuses = ['all', 'pending', 'accepted', 'in-progress', 'completed', 'cancelled']; // Added 'cancelled'

export default function OrdersPage() {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.providerAuth);
    const { orders, loading, error } = useSelector((state) => state.orders);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrders({ providerId: userId, status: selectedStatus, searchTerm }));
        }
    }, [dispatch, userId, selectedStatus, searchTerm]);

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
            })
            .catch(() => {
                // Error handled by useEffect above
            });
    };

    const countByStatus = useMemo(() => {
        const counts = { all: orders.length };
        statuses.slice(1).forEach((status) => {
            counts[status] = orders.filter((o) => o.status === status).length;
        });
        return counts;
    }, [orders]);

    // Filter orders based on selectedStatus and searchTerm
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
            const matchesSearch = order.customerName
                ? order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            return matchesStatus && matchesSearch;
        });
    }, [orders, selectedStatus, searchTerm]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>Orders</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Manage your service orders</Typography>

            <TextField
                variant="outlined"
                placeholder="Search by customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
            />

            <OrdersFilterTabs
                statuses={statuses}
                counts={countByStatus}
                selectedStatus={selectedStatus}
                onChange={setSelectedStatus}
            />

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : filteredOrders.length === 0 ? (
                <Typography>No orders found for the selected filters.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredOrders.map((order) => (
                        <Grid item xs={12} md={6} key={order.id} sx={{ display: 'flex' }}>
                            <OrderCard order={order} onUpdateStatus={handleUpdateOrderStatus} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
