// ProviderCards.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ProviderCard from '@/components/Customer/Provider/ProviderCard';
import SubServiceList from '@/components/Customer/Provider/SubServiceList';

function ProviderCards() {
  const navigate = useNavigate();
  const location = useLocation();

  const provider = location.state?.provider || {
    fullName: 'Default Name',
    skills: 'Default Skill',
    description: 'Default Description',
    yearsOfExperience: 0,
    profileImage: '',
    rating: 0,
    completedJobs: 0,
    location: 'Unknown',
    chargePerHour: 0,
  };

  const handleAddToCart = (subservice) => {
    navigate('/cart', {
      state: {
        cartItems: [
          {
            ...subservice,
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <div>
      <ProviderCard provider={provider} />
      <SubServiceList onAddToCart={handleAddToCart} />
    </div>
  );
}

export default ProviderCards;
