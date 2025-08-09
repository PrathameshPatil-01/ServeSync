import React from 'react';
import './SubServiceCard.css';
import { Heart, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/customer/cartSlice';

const SubServiceCard = ({ subservice, providerId, providerName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  console.log('Checking existence:', {
  cartItems,
  subserviceId: subservice.id,
  providerId,
});
  // Check if item already in cart by subserviceId + providerId
  const exists = cartItems.find(
    (item) =>
      item.subserviceId === subservice.id && item.providerId === providerId
  );

  console.log('Exists:', exists);

  const handleAdd = () => {
    if (exists) {
      alert('This service is already in your cart.');
      return;
    }

    const item = {
      subserviceId: subservice.id,
      name: subservice.name,
      price: subservice.price,
      providerId,
      providerName,
      quantity: 1,
    };

    dispatch(addToCart(item));

    navigate('/customer/cart');
  };

  return (
    <div className="subservice-card">
      <img
        src={subservice.image}
        alt={subservice.name}
        className="subservice-image"
      />

      <button className="wishlist-button" aria-label="Add to wishlist">
        <Heart size={20} />
      </button>

      <div className="subservice-info">
        <div className="prep-time d-flex align-items-center gap-1">
          <Timer size={14} />
          <span>
            {subservice.prepTime || `${subservice.estimatedDuration || 15} mins`}
          </span>
        </div>

        <h3 className="subservice-title">{subservice.name}</h3>
        <p className="subservice-count">{subservice.count || ''} services</p>
      </div>

      <div className="subservice-footer">
        <div className="pricing">
          <p className="price">₹{subservice.price}</p>
          <p className="per-piece">
            at ₹{subservice.perPiece || subservice.price}/service
          </p>
        </div>
        <button
          className={`add-btn ${exists ? 'added' : ''}`}
          onClick={handleAdd}
          disabled={exists} // disables button if item exists
        >
          {exists ? 'Added' : 'ADD +'}
        </button>
      </div>
    </div>
  );
};

export default SubServiceCard;
