import { Container, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
