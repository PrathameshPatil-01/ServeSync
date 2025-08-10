// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '@/redux/customer/customerProvider/productSlice';
import axios from 'axios'; // <-- axios import

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likedProducts = useSelector((state) => state.products.likedProducts || []);
const liked = likedProducts.some((p) => p.id === product.id);

const toggleLikeIcon = (e) => {
  e.stopPropagation();
  dispatch(toggleLike(product)); // Pass full product object
};

  const handleCardClick = async () => {
    try {
      const providerData = {
        providerId: product.id,
        fullName: product.name,
        profileImage: product.image,
        skills: product.label,
        location: 'Pune, Maharashtra',
        yearsOfExperience: product.yearsOfExperience || 5,
        completedJobs: 150,
        rating: 4.6,
        chargePerHour: product.price,
        description:
          'Experienced provider with a focus on quality service and customer satisfaction.',
        estimatedDuration: product.estimatedDuration,
      };

      // Fetch sub-services for this provider
      const response = await axios.get(
        `http://localhost:8080/api/providers/users/${providerData.providerId}/sub-services`
      );
      const subServices = response.data;
      console.log('Subservices fetched:', subServices);

      // Navigate to provider page with provider and subServices data
      navigate(`/customer/provider/${encodeURIComponent(product.name)}`, {
        state: { provider: providerData, subServices },
      });
    } catch (error) {
      console.error('Error fetching subservices:', error);
      alert('Failed to load subservices. Please try again.');
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="like-icon" onClick={toggleLikeIcon}>
        {liked ? <FaHeart color="red" /> : <FaRegHeart color="grey" />}
      </div>

      <img src={product.image} alt={product.name} />
      <p className="label">{product.label}</p>

      <div className="details">
        <p className="prep-time">
          
        </p>
        <h3>{product.name}</h3>
        <p>{product.quantity}</p>
      </div>

      <div className="price-section">
        {product.price > 0 ? (
          <p className="price">₹{product.price}</p>
        ) : (
          <p className="price">Price not available</p>
        )}
        <button className="add-btn" onClick={(e) => e.stopPropagation()}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
