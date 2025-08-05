// SubServiceList.js

import React from 'react';
import SubServiceCard from './SubServiceCard';
import './SubServiceCard'; // or wherever your CSS file is


const SubServiceList = ({ onAddToCart }) => {
  const subservices = [
    {
      name: 'Tap Installation',
      image: 'https://example.com/tap.jpg',
      prepTime: '15 mins',
      count: 12,
      price: 250,
      perPiece: 250,
    },
    // ... other items
     {
      name: 'Tap Installation',
      image: 'https://example.com/tap.jpg',
      prepTime: '15 mins',
      count: 12,
      price: 250,
      perPiece: 250,
    },
     {
      name: 'Tap Installation',
      image: 'https://example.com/tap.jpg',
      prepTime: '15 mins',
      count: 12,
      price: 250,
      perPiece: 250,
    },
  ];

  return (
    <div className="subservice-list">
      {subservices.map((item, idx) => (
        <SubServiceCard key={idx} subservice={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default SubServiceList;
