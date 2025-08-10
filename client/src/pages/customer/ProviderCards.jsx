import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import ProviderCard from '@/components/Customer/Provider/ProviderCard';
import SubServiceList from '@/components/Customer/Provider/SubServiceList';

function ProviderCards() {
  const navigate = useNavigate();
  const location = useLocation();

  const provider = location.state?.provider || {
    providerId: 0,
    fullName: 'Default Name',
    skills: 'Default Skill',
    description: 'Default Description',
    yearsOfExperience: 0,
    profileImage: '',
    rating: 0,
    completedJobs: 0,
    location: 'Unknown',
    chargePerHour: 0,
    estimatedDuration: 0,
  };

  console.log('Provider data:', provider);

  const [subServices, setSubServices] = useState([]);
  console.log('SubServices:', subServices);

  useEffect(() => {
    const fetchSubServices = async () => {
      if (!provider.providerId) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/service-providers/users/${provider.providerId}/sub-services`
        );
        setSubServices(response.data);
      } catch (error) {
        console.error('Failed to fetch sub-services:', error);
      }
    };

    fetchSubServices();
  }, [provider.providerId]);

  const handleAddToCart = (subservice) => {
    navigate('/cart', {
      state: {
        cartItems: [
          {
            ...subservice,
            providerId: provider.providerId,
            providerName: provider.fullName,
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <div>
      <ProviderCard provider={provider} />
      <SubServiceList
        subServices={subServices}
        onAddToCart={handleAddToCart}
        providerId={provider.providerId}
        providerName={provider.fullName}
      />
    </div>
  );
}

export default ProviderCards;
