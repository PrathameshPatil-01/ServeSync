import React from "react";
import "./CartItem.css"; // Optional for styling

const CartItem = () => {
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h3>1 items in cart</h3>
        <div className="category-section">
          <strong>Dairy (1)</strong>
        </div>
      </div>

      <hr className="divider" />

      <div className="cart-item">
        <div className="item-details">
          <h4 className="item-name">Amul - Fresh Cream, 1 L</h4>
          <p className="item-quantity">1 ltr</p>
        </div>
        <div className="item-price">¥220.00</div>
      </div>
    </div>
  );
};

export default CartItem;