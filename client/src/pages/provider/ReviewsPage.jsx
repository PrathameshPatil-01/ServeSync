import { Box, Typography, Paper, Rating, Avatar, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// Dummy data for reviews (replace with real API calls later)
const mockReviews = [
  {
    id: 1,
    customerName: 'Priya Sharma',
    customerAvatar: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=PS',
    rating: 5,
    comment: 'Excellent service! The plumber was very professional and fixed the leak quickly.',
    service: 'Plumbing Repair',
    date: '2023-10-26T10:00:00Z',
  },
  {
    id: 2,
    customerName: 'Rajesh Kumar',
    customerAvatar: 'https://via.placeholder.com/40/3366FF/FFFFFF?text=RK',
    rating: 4,
    comment: 'Good AC repair. Took a bit longer than expected but the issue is resolved.',
    service: 'AC Repair',
    date: '2023-10-25T14:30:00Z',
  },
  {
    id: 3,
    customerName: 'Sneha Patel',
    customerAvatar: 'https://via.placeholder.com/40/33CC33/FFFFFF?text=SP',
    rating: 5,
    comment: 'The home cleaning was thorough and the staff was very polite. Highly recommend!',
    service: 'Home Deep Cleaning',
    date: '2023-10-24T09:15:00Z',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you would dispatch a Redux thunk here
    // to fetch reviews from your backend API.
    // Example: dispatch(fetchProviderReviews(userId));

    // Simulating API call
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        // Replace with actual API call: const response = await axios.get(`/providers/${userId}/reviews`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setReviews(mockReviews); // Use real data from response.data
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []); // Add userId to dependency array in real app

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Loading reviews...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        See what your customers are saying about your services.
      </Typography>

      {reviews.length === 0 ? (
        <Typography>No reviews available yet.</Typography>
      ) : (
        <Stack spacing={3}>
          {reviews.map((review) => (
            <Paper key={review.id} elevation={2} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar src={review.customerAvatar} sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{review.customerName}</Typography>
                  <Rating value={review.rating} precision={0.5} readOnly size="small" />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Service: {review.service}
              </Typography>
              <Typography variant="body1" fontStyle="italic">
                "{review.comment}"
              </Typography>
              <Typography variant="caption" color="text.disabled" mt={1}>
                Reviewed on: {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
