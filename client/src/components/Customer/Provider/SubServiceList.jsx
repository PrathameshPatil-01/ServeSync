import React from 'react';
import SubServiceCard from './SubServiceCard';
import './SubServiceCard.css';

const SubServiceList = ({ subServices = [], providerId, providerName }) => {
  return (
    <div className="subservice-list">
      {subServices.length === 0 ? (
        <p>No sub-services available for this provider.</p>
      ) : (
        subServices.map((item, idx) => (
          <SubServiceCard
            key={idx}
            subservice={{
              id: item.subServiceId, // Unique subservice id
              name: item.subServiceName,
              description: item.subServiceDescription,
              prepTime: `${item.estimatedDuration} mins`,
              price: item.price,
              perPiece: item.price,
              image: '/images/default-subservice.jpg', // Replace with actual image path
            }}
            providerId={providerId} // Unique provider id
            providerName={providerName}
          />
        ))
      )}
    </div>
  );
};

export default SubServiceList;
