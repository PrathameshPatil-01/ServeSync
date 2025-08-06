import { useState, useMemo } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import OrdersFilterTabs from '@/components/provider/orders/OrdersFilterTabs';
import OrderCard from '@/components/provider/orders/OrderCard';

const orders = [
    { id: 'ORD-001', customer: 'Priya Sharma', phone: '+91 98765 43210', address: 'Sector 15, Gurgaon', time: '2:00 PM - 4:00 PM', service: 'Home Cleaning', price: 800, status: 'pending' },
    { id: 'ORD-002', customer: 'Rajesh Kumar', phone: '+91 98765 43211', address: 'DLF Phase 2, Gurgaon', time: '11:00 AM - 12:00 PM', service: 'AC Repair', price: 1200, status: 'accepted' },
    { id: 'ORD-003', customer: 'Sneha Patel', phone: '+91 98765 43212', address: 'Cyber City, Gurgaon', time: '9:00 AM - 10:00 AM', service: 'Plumbing', price: 600, status: 'in-progress' },
    { id: 'ORD-004', customer: 'Vikram Singh', phone: '+91 98765 43213', address: 'Golf Course Road, Gurgaon', time: 'Yesterday 3:00 PM', service: 'Electrical Work', price: 950, status: 'completed' },
];

const statuses = ['all', 'pending', 'accepted', 'in-progress', 'completed'];

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, selectedStatus]);

    const countByStatus = useMemo(() => {
        const counts = { all: orders.length };
        statuses.slice(1).forEach((status) => {
            counts[status] = orders.filter((o) => o.status === status).length;
        });
        return counts;
    }, []);

    return (
        <Box sx={{ ml: '260px', p: 4 }}>
            <Typography variant="h5" gutterBottom>Orders</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>Manage your service orders</Typography>

            <TextField
                variant="outlined"
                placeholder="Search orders..."
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

            {filteredOrders.length === 0 ? (
                <Typography>No orders found.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredOrders.map((order) => (
                        <Grid item xs={12} md={6} key={order.id} sx={{ display: 'flex' }}>
                            <OrderCard order={order} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
