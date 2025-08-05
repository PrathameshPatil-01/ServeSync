import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from '../../api/categoryApi'; // Adjust path
import './CategorySidebar.css';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchData();
  }, []);

  const handleClick = (title) => {
    const newSlug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/category/${newSlug}`);
  };

  return (
    <div className="category-sidebar">
      {categories.map((cat) => {
        const catSlug = cat.serviceName.toLowerCase().replace(/\s+/g, '-');
        const isActive = slug === catSlug;

        return (
          <div
            key={cat.serviceName}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(cat.serviceName)}
          >
            <div className="icon-wrapper">
              {cat.imageBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${cat.imageBase64}`}
                  alt={cat.serviceName}
                  className="category-icon"
                />
              ) : (
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#ddd',
                    borderRadius: '50%',
                  }}
                />
              )}
            </div>
            <span className="category-title">{cat.serviceName}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySidebar;
