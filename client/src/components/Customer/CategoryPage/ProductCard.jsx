// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '@/redux/customer/customerProvider/productSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const liked = useSelector((state) => state.products.liked.includes(product.id));

  const toggleLikeIcon = (e) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleCardClick = () => {
    // Normalize provider data structure for ProviderCard
    const providerData = {
      fullName: product.name,
      profileImage: product.image,
      skills: product.label,
      location: 'Pune, Maharashtra',      // example or use product.location if available
      yearsOfExperience: 5,               // example static value or from product if exists
      completedJobs: 150,                 // example static or dynamic
      rating: 4.6,                       // example static or dynamic
      chargePerHour: product.price,
      description:
        'Experienced provider with a focus on quality service and customer satisfaction.'
    };

    navigate(`/customer/provider/${encodeURIComponent(product.name)}`, {
      state: { provider: providerData }
    });
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="like-icon" onClick={toggleLikeIcon}>
        {liked ? <FaHeart color="red" /> : <FaRegHeart color="grey" />}
      </div>

      <img src={product.image} alt={product.name} />
      <p className="label">{product.label}</p>

      <div className="details">
        <p className="prep-time"></p>
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
