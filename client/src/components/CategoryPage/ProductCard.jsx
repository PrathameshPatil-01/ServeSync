// ProductCard.js
import React, { useState } from 'react';
import './ProductCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const toggleLike = (e) => {
    e.stopPropagation(); // prevent click propagation to card
    setLiked(!liked);
  };

  const handleCardClick = () => {
    navigate('/provider', {
      state: {
        provider: {
          fullName: product.name,
          profileImage: product.image,
          skills: product.label,
          location: 'Pune, Maharashtra',
          yearsOfExperience: 5,
          completedJobs: 150,
          rating: 4.6,
          chargePerHour: product.price,
          description:
            'Experienced provider with a focus on quality service and customer satisfaction.'
        }
      }
    });
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="like-icon" onClick={toggleLike}>
        {liked ? <FaHeart color="red" /> : <FaRegHeart color="grey" />}
      </div>

      <img src={product.image} alt={product.name} />

      <p className="label">{product.label}</p>

      <div className="details">
        <p className="prep-time">Prep time: 1 minute</p>
        <h3>{product.name}</h3>
        <p>{product.quantity}</p>
      </div>

      <div className="price-section">
        <p className="price">₹{product.price}</p>
        <button className="add-btn" onClick={(e) => e.stopPropagation()}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
