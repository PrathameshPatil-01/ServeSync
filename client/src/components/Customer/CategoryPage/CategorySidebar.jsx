// src/components/CategorySidebar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from '@/services/categoryApi';
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
    if (title === 'All') {
      navigate('/customer/category/all');
    } else {
      const newSlug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
      navigate(`/customer/category/${newSlug}`);
    }
  };

  return (
    <div className="category-sidebar">
      {/* 🔹 Add "All" category manually */}
      <div
        className={`sidebar-item ${slug === 'all' ? 'active' : ''}`}
        onClick={() => handleClick('All')}
      >
        <div className="icon-wrapper">
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: '#aaa',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            A
          </div>
        </div>
        <span className="category-title">All</span>
      </div>

      {/* 🔹 Render fetched categories */}
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
