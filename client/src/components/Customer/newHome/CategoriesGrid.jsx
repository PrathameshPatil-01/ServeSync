import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import './CategoriesGrid.css';

import { getAllCategories } from './../../../services/categoryApi';

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="categories-section">
      <div className="categories-title-wrapper">
        <div className="categories-title-line"></div>
        <h2 className="categories-title">Our Categories</h2>
        <div className="categories-title-line"></div>
      </div>
      <div className="categories-grid">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={idx}
            image={
              cat.imageBase64
                ? `data:image/jpeg;base64,${cat.imageBase64}`
                : '/default-category.jpg' // 👈 Add a default image in public folder
            }
            title={cat.serviceName}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
