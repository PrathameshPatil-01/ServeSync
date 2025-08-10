import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ image, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title) {
      const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
      navigate(`/customer/category/${slug}`);
    } else {
      console.error('Category title is undefined');
    }
  };

  return (
    <div
      className="category-card"
      onClick={title ? handleClick : null}
      style={{
        cursor: title ? 'pointer' : 'default',
        opacity: title ? 1 : 0.6,
      }}
    >
      <img src={image || '/placeholder.jpg'} alt={title || 'No Title'} />
      <p>{title || 'Untitled'}</p>
    </div>
  );
};

export default CategoryCard;
