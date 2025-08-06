import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    Card,
    CardContent,
    Grid,
    Tabs,
    Tab,
    Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

// Dummy data for earnings cards
const earningsData = [
    {
        title: "Today's Earnings",
        amount: '₹2,450',
        subtitle: '+18% from yesterday',
        icon: '$',
    },
    {
        title: 'This Week',
        amount: '₹15,680',
        subtitle: '+12% from last week',
        icon: '📈',
    },
    {
        title: 'This Month',
        amount: '₹58,250',
        subtitle: '+8% from last month',
        icon: '📅',
    },
    {
        title: 'Total Earnings',
        amount: '₹2,84,500',
        subtitle: 'All time earnings',
        icon: '💳',
    },
];

// Dummy recent transactions
const recentTransactions = [
    {
        orderId: 'ORD-004',
        customer: 'Vikram Singh',
        service: 'Electrical Work',
        time: 'Today, 4:30 PM',
        status: 'completed',
        earnings: 855,
        total: 950,
        commission: 95,
    },
    {
        orderId: 'ORD-003',
        customer: 'Sneha Patel',
        service: 'Plumbing',
        time: 'Today, 10:15 AM',
        status: 'completed',
        earnings: 540,
        total: 600,
        commission: 60,
    },
    {
        orderId: 'ORD-002',
        customer: 'Rajesh Kumar',
        service: 'AC Repair',
        time: 'Yesterday, 12:00 PM',
        status: 'completed',
        earnings: 1080,
        total: 1200,
        commission: 120,
    },
];

// Earnings Card Component
function EarningsCard({ title, amount, subtitle, icon }) {
    return (
        <Card variant="outlined" sx={{ minWidth: 230 }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {amount} <span style={{ fontSize: 18 }}>{icon}</span>
                </Typography>
                <Typography variant="caption" color="success.main">
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    );
}

// Single Transaction Item
function TransactionItem({
    orderId,
    customer,
    service,
    time,
    status,
    earnings,
    total,
    commission,
}) {
    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid #ddd',
                borderRadius: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                    Order #{orderId}{' '}
                    <Box
                        component="span"
                        sx={{
                            ml: 1,
                            px: 1,
                            bgcolor: 'success.light',
                            color: 'success.dark',
                            fontSize: 12,
                            borderRadius: 1,
                            textTransform: 'capitalize',
                            fontWeight: 600,
                        }}
                    >
                        {status}
                    </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {customer} • {service}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {time}
                </Typography>
            </Box>

            <Box textAlign="right">
                <Typography variant="h6" color="success.main" fontWeight="bold">
                    ₹{earnings}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Total: ₹{total}
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                    Commission: ₹{commission}
                </Typography>
            </Box>
        </Box>
    );
}

// Tabs Navigation component
function TabsNavigation({ value, onChange }) {
    return (
        <Tabs
            value={value}
            onChange={onChange}
            aria-label="Earnings page tabs"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
        >
            <Tab label="Recent Transactions" value="transactions" />
            <Tab label="Payout History" value="payouts" />
            <Tab label="Analytics" value="analytics" />
        </Tabs>
    );
}

// Main Earnings Page Component
export default function EarningsPage() {
    const [tab, setTab] = useState('transactions');

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f7f7fb', minHeight: '100vh' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Earnings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Track your income and payouts
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        Export
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<RequestQuoteIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        Request Payout
                    </Button>
                </Stack>
            </Stack>

            {/* Earnings summary cards */}
            <Grid container spacing={2} mb={3}>
                {earningsData.map(({ title, amount, subtitle, icon }) => (
                    <Grid item key={title}>
                        <EarningsCard
                            title={title}
                            amount={amount}
                            subtitle={subtitle}
                            icon={icon}
                        />
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ mb: 2 }} />

            {/* Tabs */}
            <TabsNavigation value={tab} onChange={handleTabChange} />

            {/* Tab content */}
            {tab === 'transactions' && (
                <Box>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Recent Transactions
                    </Typography>

                    {recentTransactions.map((txn) => (
                        <TransactionItem key={txn.orderId} {...txn} />
                    ))}
                </Box>
            )}

            {tab === 'payouts' && (
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        Payout History
                    </Typography>
                    <Typography color="text.secondary" mt={2}>
                        No payout history available yet.
                    </Typography>
                </Box>
            )}

            {tab === 'analytics' && (
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        Analytics
                    </Typography>
                    <Typography color="text.secondary" mt={2}>
                        Analytics content will be shown here.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
