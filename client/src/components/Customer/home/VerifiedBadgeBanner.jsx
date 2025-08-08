import { Box, Paper, Typography } from '@mui/material';

export default function VerifiedBadgeBanner() {
  return (
    <Paper sx={{ mt: 5, p: 3, textAlign: 'center', backgroundColor: '#e6f7ff' }}>
      <Typography variant="h6">✅ Platform Verified Pros</Typography>
      <Typography variant="body2">We ensure every pro is verified and background checked.</Typography>
    </Paper>
  );
}
