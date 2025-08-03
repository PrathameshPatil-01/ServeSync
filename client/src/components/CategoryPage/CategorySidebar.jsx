import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategorySidebar.css';

import Electrician from './images/Electrician.jpg';
import BuildingConstruction from './images/building-construction.jpg';
import Carpentry from './images/Carpentry.jpg';
import Ceilings from './images/ceilings.jpg';
import Flooring from './images/Flooring.jpg';
import Plumbing from './images/Plumbing.jpg';
import Cleaning from './images/Cleaning.jpg';

const categories = [
  { title: 'Electricians', image: Electrician },
  { title: 'Building Construction', image: BuildingConstruction },
  { title: 'Carpentry', image: Carpentry },
  { title: 'Ceilings', image: Ceilings },
  { title: 'Flooring', image: Flooring },
  { title: 'Plumbing', image: Plumbing },
  { title: 'Cleaning', image: Cleaning },
  { title: 'Appliance Repair', image: '' }, // no image
];

const CategorySidebar = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // comes from /category/:slug

  const handleClick = (title) => {
    const newSlug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/category/${newSlug}`);
  };

  return (
    <div className="category-sidebar">
      {categories.map((cat, index) => {
        const catSlug = cat.title.toLowerCase().replace(/\s+/g, '-');
        const isActive = slug === catSlug;

        return (
          <div
            key={cat.title}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(cat.title)}
          >
            <div className="icon-wrapper">
              {cat.image ? (
                <img src={cat.image} alt={cat.title} className="category-icon" />
              ) : (
                <div style={{ width: '30px', height: '30px', backgroundColor: '#ddd', borderRadius: '50%' }} />
              )}
            </div>
            <span className="category-title">{cat.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySidebar;
