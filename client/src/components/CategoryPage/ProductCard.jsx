import React, { useState } from 'react';
import './ProductCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // heart icons

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="product-card">
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
        <button className="add-btn">ADD</button>
      </div>
    </div>
  );
};

export default ProductCard;
