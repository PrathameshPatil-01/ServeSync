import { Box, Typography } from '@mui/material';
import SearchBar from '../../components/home/SearchBar';
import LocationSelector from '../../components/home/LocationSelector';
import CategoryGrid from '../../components/home/CategoryGrid';
import TopProvidersCarousel from '../../components/home/TopProvidersCarousel';
import VerifiedBadgeBanner from '../../components/home/VerifiedBadgeBanner';
import TestimonialsSection from '../../components/home/TestimonialsSection';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          What service are you looking for?
        </Typography>
        <SearchBar />
        <LocationSelector />
      </Box>

      <CategoryGrid />
      <TopProvidersCarousel />
      <VerifiedBadgeBanner />
      <TestimonialsSection />
    </Box>
  );
}
