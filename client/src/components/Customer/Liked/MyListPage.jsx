import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../CategoryPage/ProductCard';
import './MyListPage.css';

const MyListPage = () => {
  const likedProducts = useSelector(state => state.products.likedProducts);

  return (
    <div className="liked-page-wrapper">
      <div className="liked-header">
        <h2>❤️ My Liked Providers</h2>
        <p>{likedProducts.length} provider{likedProducts.length !== 1 && 's'} liked</p>
      </div>

      {likedProducts.length === 0 ? (
        <div className="empty-message">
          <p>You haven’t liked any providers yet.</p>
        </div>
      ) : (
        <div className="liked-card-grid">
          {likedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListPage;
