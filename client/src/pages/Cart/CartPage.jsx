// CartPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  return (
    <div className="cart-page">
      <h2 className="cart-heading">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">No items in the cart.</div>
      ) : (
        cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-details">
              <div className="cart-name">{item.name}</div>
              <div className="cart-prep">Prep time: {item.prepTime}</div>
              <div className="cart-price">₹{item.price}</div>
            </div>
            <div className="qty-controls">
              <button className="qty-btn">-</button>
              <span className="qty-number">{item.quantity}</span>
              <button className="qty-btn">+</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
