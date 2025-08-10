import AddEditServiceDialog from '@/components/provider/services/AddEditServiceDialog';
import ServiceItem from '@/components/provider/services/ServiceItem';
import { clearServiceOfferError } from '@/redux/provider/services/providerServiceOfferSlice';
import {
  addProviderServiceOffer,
  deleteProviderServiceOffer,
  fetchProviderServiceOffers,
  updateProviderServiceOffer,
} from '@/redux/provider/services/providerServiceOfferThunks';

import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Services() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.providerAuth);
  const { offers, loading, error } = useSelector((state) => state.providerServiceOffer);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  useEffect(() => {
    if (user?.providerId) {
      dispatch(fetchProviderServiceOffers(user.providerId));
    }
  }, [dispatch, user?.providerId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearServiceOfferError());
    }
  }, [error, dispatch]);

  const handleAddServiceClick = () => {
    setServiceToEdit(null);
    setDialogOpen(true);
  };

  const handleEditServiceClick = (service) => {
    setServiceToEdit(service);
    setDialogOpen(true);
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service offer?')) {
      dispatch(deleteProviderServiceOffer(serviceId))
        .unwrap()
        .then(() => toast.success('Service offer deleted successfully!'))
        .catch(() => {}); // Error handled globally
    }
  };

  const handleSaveService = (values) => {
    if (!user?.providerId) {
      toast.error('Provider ID not found. Cannot save service offer.');
      return;
    }

    if (serviceToEdit) {
      dispatch(updateProviderServiceOffer({ offerId: serviceToEdit.id, updateData: values }))
        .unwrap()
        .then(() => {
          toast.success('Service offer updated successfully!');
          setDialogOpen(false);
        })
        .catch(() => {}); // Error handled globally
    } else {
      dispatch(addProviderServiceOffer({ providerId: user.providerId, offerData: values }))
        .unwrap()
        .then(() => {
          toast.success('Service offer added successfully!');
          setDialogOpen(false);
        })
        .catch(() => {}); // Error handled globally
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.dark">
          Your Services
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Add, edit, or remove the services you offer to customers.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddServiceClick}
          sx={{ mb: 3, py: 1.2, fontSize: '1rem', borderRadius: 2 }}
        >
          Add New Service Offer
        </Button>

        {loading && offers.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="primary" />
          </Box>
        ) : error && offers.length === 0 ? (
          <Alert severity="error">{error}</Alert>
        ) : offers.length === 0 ? (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            You haven't added any service offers yet. Click "Add New Service Offer" to get started!
          </Typography>
        ) : (
          <Box>
            {offers.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                onEdit={handleEditServiceClick}
                onDelete={handleDeleteService}
              />
            ))}
          </Box>
        )}

        <AddEditServiceDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          serviceToEdit={serviceToEdit}
          onSave={handleSaveService}
          loading={loading}
        />
      </Box>
    </motion.div>
  );
}
