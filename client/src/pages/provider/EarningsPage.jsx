import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    Alert,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEarningsSummary, fetchTransactions, requestProviderPayout } from '@/redux/earnings/earningThunks';
import { clearEarningError, clearPayoutSuccess } from '@/redux/earnings/earningSlice';
import { toast } from 'react-toastify';

// Earnings Card Component
function EarningsCard({ title, amount, subtitle, icon }) {
    return (
        <Card variant="outlined" sx={{ minWidth: 230 }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    ₹{amount.toLocaleString()} <span style={{ fontSize: 18 }}>{icon}</span>
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
    customerName,
    serviceName,
    scheduledTime,
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
                    {customerName} • {serviceName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {new Date(scheduledTime).toLocaleString()}
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
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.providerAuth);
    const { summary, transactions, loading, error, payoutSuccess } = useSelector((state) => state.earnings);

    const [tab, setTab] = useState('transactions');

    useEffect(() => {
        if (userId) {
            dispatch(fetchEarningsSummary(userId));
            dispatch(fetchTransactions({ providerId: userId }));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearEarningError());
        }
        if (payoutSuccess) {
            toast.success('Payout request submitted successfully!');
            dispatch(clearPayoutSuccess());
        }
    }, [error, payoutSuccess, dispatch]);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleRequestPayout = () => {
        // Example: Request payout of all available earnings
        if (userId && summary.totalEarnings > 0) {
            dispatch(requestProviderPayout({ providerId: userId, amount: summary.totalEarnings }))
                .unwrap()
                .then(() => {
                    // Re-fetch summary and transactions after successful payout request
                    dispatch(fetchEarningsSummary(userId));
                    dispatch(fetchTransactions({ providerId: userId }));
                })
                .catch(() => {}); // Error handled by useEffect
        } else {
            toast.info('No earnings to request payout for.');
        }
    };

    const earningsData = [
        {
            title: "Today's Earnings",
            amount: summary.todayEarnings,
            subtitle: '+18% from yesterday', // This would need actual comparison logic
            icon: '₹',
        },
        {
            title: 'This Week',
            amount: summary.weekEarnings,
            subtitle: '+12% from last week', // This would need actual comparison logic
            icon: '📈',
        },
        {
            title: 'This Month',
            amount: summary.monthEarnings,
            subtitle: '+8% from last month', // This would need actual comparison logic
            icon: '📅',
        },
        {
            title: 'Total Earnings',
            amount: summary.totalEarnings,
            subtitle: 'All time earnings',
            icon: '💳',
        },
    ];

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
                        onClick={handleRequestPayout}
                        disabled={loading || summary.totalEarnings <= 0}
                    >
                        Request Payout
                    </Button>
                </Stack>
            </Stack>

            {/* Earnings summary cards */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                    <CircularProgress />
                </Box>
            ) : (
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
            )}

            <Divider sx={{ mb: 2 }} />

            {/* Tabs */}
            <TabsNavigation value={tab} onChange={handleTabChange} />

            {/* Tab content */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {tab === 'transactions' && (
                        <Box>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Recent Transactions
                            </Typography>
                            {transactions.length === 0 ? (
                                <Typography color="text.secondary" mt={2}>
                                    No recent transactions available.
                                </Typography>
                            ) : (
                                transactions.map((txn) => (
                                    <TransactionItem key={txn.id} {...txn} />
                                ))
                            )}
                        </Box>
                    )}

                    {tab === 'payouts' && (
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Payout History
                            </Typography>
                            <Typography color="text.secondary" mt={2}>
                                No payout history available yet. (Implement fetching payout history here)
                            </Typography>
                        </Box>
                    )}

                    {tab === 'analytics' && (
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Analytics
                            </Typography>
                            <Typography color="text.secondary" mt={2}>
                                Analytics content will be shown here. (Implement charts/graphs for earnings)
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
