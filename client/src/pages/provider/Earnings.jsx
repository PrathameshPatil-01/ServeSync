import {
  clearEarningError,
  fetchEarningsSummary,
  fetchPayoutHistory,
  fetchTransactions,
  requestPayout,
} from '@/redux/provider/earnings/earningSlice';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const payoutRequestSchema = Yup.object({
  amount: Yup.number()
    .min(0.01, 'Amount must be greater than 0')
    .required('Amount is required'),
});

export default function Earnings() {
  const dispatch = useDispatch();
  const { providerId } = useSelector((state) => state.providerAuth);
  const { summary, transactions, payoutHistory, loading, error } = useSelector((state) => state.earning);

  const [payoutDialogOpen, setPayoutDialogOpen] = useState(false);
  const [transactionPage, setTransactionPage] = useState(0);
  const [payoutPage, setPayoutPage] = useState(0);
  const [transactionFilterStartDate, setTransactionFilterStartDate] = useState('');
  const [transactionFilterEndDate, setTransactionFilterEndDate] = useState('');

  const transactionsPerPage = 5;
  const payoutsPerPage = 5;

  useEffect(() => {
    if (providerId) {
      dispatch(fetchEarningsSummary(providerId));
      dispatch(fetchTransactions({
        providerId,
        startDate: transactionFilterStartDate,
        endDate: transactionFilterEndDate,
        pageable: { page: transactionPage, size: transactionsPerPage }
      }));
      dispatch(fetchPayoutHistory({ providerId, pageable: { page: payoutPage, size: payoutsPerPage } }));
    }
  }, [dispatch, providerId, transactionPage, payoutPage, transactionFilterStartDate, transactionFilterEndDate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearEarningError());
    }
  }, [error, dispatch]);

  const handleRequestPayout = (values, { setSubmitting, resetForm }) => {
    if (!providerId) {
      toast.error("Provider ID not found. Cannot request payout.");
      setSubmitting(false);
      return;
    }
    dispatch(requestPayout({ providerId, amount: values.amount }))
      .unwrap()
      .then(() => {
        setPayoutDialogOpen(false);
        resetForm();
        // Re-fetch summary to update available balance
        dispatch(fetchEarningsSummary(providerId));
      })
      .catch(() => {
        // Error handled by toast in thunk
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleTransactionPageChange = (event, value) => {
    setTransactionPage(value - 1);
  };

  const handlePayoutPageChange = (event, value) => {
    setPayoutPage(value - 1);
  };

  const applyTransactionFilters = () => {
    setTransactionPage(0); // Reset page on filter apply
    dispatch(fetchTransactions({
      providerId,
      startDate: transactionFilterStartDate,
      endDate: transactionFilterEndDate,
      pageable: { page: 0, size: transactionsPerPage }
    }));
  };

  const clearTransactionFilters = () => {
    setTransactionFilterStartDate('');
    setTransactionFilterEndDate('');
    setTransactionPage(0);
    dispatch(fetchTransactions({
      providerId,
      pageable: { page: 0, size: transactionsPerPage }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary.dark">
        Earnings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Track your income and payouts
      </Typography>

      {loading && !summary ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
          <CircularProgress />
        </Box>
      ) : error && !summary ? (
        <Alert severity="error">Error loading earnings summary: {error}</Alert>
      ) : (
        <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>Earnings Summary</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">Today's Earnings: <strong>₹{summary?.todayEarnings?.toFixed(2) || '0.00'}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">This Week: <strong>₹{summary?.thisWeekEarnings?.toFixed(2) || '0.00'}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">This Month: <strong>₹{summary?.thisMonthEarnings?.toFixed(2) || '0.00'}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">Total Earnings: <strong>₹{summary?.totalEarnings?.toFixed(2) || '0.00'}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">Available for Payout: <strong>₹{summary?.availableForPayout?.toFixed(2) || '0.00'}</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1">Pending Payouts: <strong>₹{summary?.pendingPayouts?.toFixed(2) || '0.00'}</strong></Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setPayoutDialogOpen(true)}
            disabled={summary?.availableForPayout <= 0}
          >
            Request Payout
          </Button>
        </Paper>
      )}

      {/* Transaction History */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Transaction History</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Start Date"
            type="date"
            value={transactionFilterStartDate}
            onChange={(e) => setTransactionFilterStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 180 }}
            variant="outlined"
            size="small"
          />
          <TextField
            label="End Date"
            type="date"
            value={transactionFilterEndDate}
            onChange={(e) => setTransactionFilterEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 180 }}
            variant="outlined"
            size="small"
          />
          <Button variant="contained" onClick={applyTransactionFilters}>Apply Filters</Button>
          <Button variant="outlined" onClick={clearTransactionFilters}>Clear Filters</Button>
        </Box>
        {loading && transactions.length === 0 ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : error && transactions.length === 0 ? (
          <Alert severity="error">Error loading transactions: {error}</Alert>
        ) : transactions.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No transactions found.</Typography>
        ) : (
          <>
            <TableContainer>
              <Table size="medium"> {/* Changed to medium size */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} hover> {/* Added hover effect */}
                      <TableCell>{dayjs(tx.transactionDate).format('YYYY-MM-DD HH:mm')}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell align="right">₹{tx.amount?.toFixed(2)}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {transactions.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={Math.ceil(transactions.length / transactionsPerPage)} // This should ideally come from API totalPages
                  page={transactionPage + 1}
                  onChange={handleTransactionPageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Payout History */}
      <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Payout History</Typography>
        {loading && payoutHistory.length === 0 ? (
          <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
        ) : error && payoutHistory.length === 0 ? (
          <Alert severity="error">Error loading payout history: {error}</Alert>
        ) : payoutHistory.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No payout requests found.</Typography>
        ) : (
          <>
            <TableContainer>
              <Table size="medium"> {/* Changed to medium size */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date Requested</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payoutHistory.map((payout) => (
                    <TableRow key={payout.id} hover> {/* Added hover effect */}
                      <TableCell>{dayjs(payout.requestedAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                      <TableCell align="right">₹{payout.amount?.toFixed(2)}</TableCell>
                      <TableCell>{payout.status}</TableCell>
                      <TableCell>{payout.transactionId || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {payoutHistory.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={Math.ceil(payoutHistory.length / payoutsPerPage)} // This should ideally come from API totalPages
                  page={payoutPage + 1}
                  onChange={handlePayoutPageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* Payout Request Dialog */}
      <Dialog open={payoutDialogOpen} onClose={() => setPayoutDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Request Payout</DialogTitle>
        <Formik
          initialValues={{ amount: summary?.availableForPayout || 0 }}
          validationSchema={payoutRequestSchema}
          onSubmit={handleRequestPayout}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
            <Form>
              <DialogContent dividers>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Available for payout: <Typography component="span" fontWeight="bold" color="primary.main">₹{summary?.availableForPayout?.toFixed(2) || '0.00'}</Typography>
                </Typography>
                <TextField
                  name="amount"
                  label="Amount to Payout"
                  type="number"
                  fullWidth
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                  inputProps={{ step: "0.01" }}
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setPayoutDialogOpen(false)} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained" disabled={isSubmitting || values.amount <= 0 || values.amount > (summary?.availableForPayout || 0)}>
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Request'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </motion.div>
  );
}

