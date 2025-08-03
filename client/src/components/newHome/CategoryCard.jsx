import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ image, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/category/${slug}`);
  };

  return (
    <div className="category-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default CategoryCard;
