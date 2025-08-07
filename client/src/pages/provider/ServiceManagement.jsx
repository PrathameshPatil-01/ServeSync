import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, createService, updateService, deleteService } from '@/redux/services/serviceThunks';
import { clearServiceError } from '@/redux/services/serviceSlice';
import { toast } from 'react-toastify';
import ServiceItem from '@/components/provider/services/ServiceItem';
import AddEditServiceDialog from '@/components/provider/services/AddEditServiceDialog';

export default function ServiceManagement() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.providerAuth);
  const { services, loading, error } = useSelector((state) => state.providerServices); // Using providerServices slice

  const [dialogOpen, setDialogOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchServices(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearServiceError());
    }
  }, [error, dispatch]);

  const handleAddService = () => {
    setServiceToEdit(null);
    setDialogOpen(true);
  };

  const handleEditService = (service) => {
    setServiceToEdit(service);
    setDialogOpen(true);
  };

  const handleSaveService = (serviceData) => {
    if (serviceToEdit) {
      // Update existing service
      dispatch(updateService({ serviceId: serviceToEdit.id, updateData: serviceData }))
        .unwrap()
        .then(() => toast.success('Service updated successfully!'))
        .catch(() => {}); // Error handled by useEffect
    } else {
      // Create new service
      dispatch(createService({ providerId: userId, serviceData }))
        .unwrap()
        .then(() => toast.success('Service added successfully!'))
        .catch(() => {}); // Error handled by useEffect
    }
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      dispatch(deleteService(serviceId))
        .unwrap()
        .then(() => toast.success('Service deleted successfully!'))
        .catch(() => {}); // Error handled by useEffect
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Service Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add, edit, or remove the services you offer.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddService}>
          Add New Service
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : services.length === 0 ? (
        <Typography mt={3}>You haven't added any services yet. Click "Add New Service" to get started!</Typography>
      ) : (
        <Box mt={3}>
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              onEdit={handleEditService}
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
      />
    </Box>
  );
}
