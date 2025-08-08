import ProfileForm from '@/components/provider/profile/ProfileForm'; // Updated import path
import { Typography } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <ProfileForm />
    </motion.div>
  );
}

