import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/customer/cartSlice';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // Group items by providerId and keep providerName as well
  const groupedByProvider = items.reduce((groups, item) => {
    const key = item.providerId || item.provider; // prefer providerId
    if (!groups[key]) {
      groups[key] = { providerName: item.providerName, items: [] };
    }
    groups[key].items.push(item);
    return groups;
  }, {});

  const handleRemove = (subserviceId, providerId) => {
    dispatch(removeFromCart({ subserviceId, providerId }));
  };

  const handleCheckout = (providerName) => {
    alert(`Checkout for provider: ${providerName}`);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}

      {Object.entries(groupedByProvider).map(([providerId, group]) => {
        const { providerName, items } = group;
        const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

        return (
          <div key={providerId} className="provider-cart-card">
            <h3>Provider: {providerName}</h3>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.subserviceId} className="cart-item">
                  <div><strong>{item.name}</strong></div>
                  <div>Price: ₹{item.price.toFixed(2)}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Total: ₹{item.totalPrice.toFixed(2)}</div>

                  <button
                    className="delete-btn"
                    onClick={() => handleRemove(item.subserviceId, item.providerId)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <div className="provider-total" style={{ fontWeight: '700', marginTop: '10px' }}>
              Total Price: ₹{totalPrice.toFixed(2)}
            </div>

            <button
              className="checkout-btn"
              onClick={() => handleCheckout(providerName)}
            >
              Checkout
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartPage;
