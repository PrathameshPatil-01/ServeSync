import { fetchReviewsForUser, updateReview } from '@/redux/provider/reviews/reviewSlice'; // Updated import path
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Reviews() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.providerAuth); // Current user's ID (provider's user ID)
  const { reviews, loading, error } = useSelector((state) => state.review);

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    if (userId) {
      // Fetch reviews where the current user is the reviewee (i.e., reviews received by the provider)
      dispatch(fetchReviewsForUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch(clearReviewError()); // Assuming a clear error action in reviewSlice
    }
  }, [error]);

  const handleResponseClick = (review) => {
    setEditingReviewId(review.id);
    setResponseText(review.response || '');
  };

  const handleSaveResponse = (reviewId) => {
    if (!responseText.trim()) {
      toast.error('Response cannot be empty.');
      return;
    }
    dispatch(updateReview({
      reviewId,
      updateData: { response: responseText.trim() } // Only update response
    }))
      .unwrap()
      .then(() => {
        toast.success('Response saved successfully!');
        setEditingReviewId(null);
        setResponseText('');
      })
      .catch(() => {
        // Error handled by toast in thunk
      });
  };

  if (loading && reviews.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error && reviews.length === 0) {
    return <Alert severity="error">Error loading reviews: {error}</Alert>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.dark">
          Customer Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          See what your customers are saying about your services.
        </Typography>

      {reviews.length === 0 && !loading ? (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No reviews received yet.
        </Typography>
      ) : (
        <Paper sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <List>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" component="span" fontWeight="bold">
                          {review.reviewerId ? `Review by User ${review.reviewerId}` : 'Anonymous User'}
                        </Typography>
                        <Rating value={review.providerRating || 0} readOnly precision={0.5} size="small" />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.primary" mb={1}>
                          {review.reviewText}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {dayjs(review.createdAt).format('MMMM D, YYYY [at] h:mm A')}
                        </Typography>
                        {review.response && (
                          <Box sx={{ mt: 2, p: 1.5, bgcolor: 'primary.light', borderRadius: 1, color: 'primary.contrastText' }}>
                            <Typography variant="body2" fontStyle="italic" fontWeight="medium">
                              Your Response:
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {review.response}
                            </Typography>
                          </Box>
                        )}
                        {editingReviewId === review.id ? (
                          <Box sx={{ mt: 2 }}>
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              label="Your Response"
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              variant="outlined"
                              sx={{ mb: 1 }}
                            />
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleSaveResponse(review.id)}
                              sx={{ mr: 1 }}
                            >
                              Save Response
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setEditingReviewId(null)}
                            >
                              Cancel
                            </Button>
                          </Box>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={() => handleResponseClick(review)}
                          >
                            {review.response ? 'Edit Response' : 'Add Response'}
                          </Button>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < reviews.length - 1 && <Divider component="li" sx={{ my: 1 }} />}
              </motion.div>
            ))}
          </List>
        </Paper>
      )}
    </motion.div>
  );
}

