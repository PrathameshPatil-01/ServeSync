// SubServiceCard.js

import React from 'react';
import './SubServiceCard.css';
import { Heart, Timer } from 'lucide-react';

const SubServiceCard = ({ subservice, onAddToCart }) => {
  return (
    <div className="subservice-card">
      {/* Service Image */}
      <img src={subservice.image} alt={subservice.name} className="subservice-image" />

      {/* Wishlist Icon */}
      <button className="wishlist-button" aria-label="Add to wishlist">
        <Heart size={20} />
      </button>

      {/* Info Section */}
      <div className="subservice-info">
        <div className="prep-time">
          <Timer size={14} />
          
        </div>

        <h3 className="subservice-title">{subservice.name}</h3>
        <p className="subservice-count">{subservice.count} services</p>
      </div>

      {/* Footer with Price and Add Button */}
      <div className="subservice-footer">
        <div className="pricing">
          <p className="price">₹{subservice.price}</p>
          <p className="per-piece">at ₹{subservice.perPiece}/service</p>
        </div>
        <button className="add-btn" onClick={() => onAddToCart(subservice)}>ADD +</button>
      </div>
    </div>
  );
};

export default SubServiceCard;
