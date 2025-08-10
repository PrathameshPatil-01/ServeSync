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
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
        setCategories([]);
      }
    };

    fetchData();
  }, []);

  // Helper to create consistent slugs
  const slugify = (text) =>
    text.toString().toLowerCase().trim().replace(/\s+/g, '-');

  const handleClick = (title) => {
    if (title.toLowerCase() === 'all') {
      navigate('/customer/category/all');
    } else {
      navigate(`/customer/category/${slugify(title)}`);
    }
  };

  // Check if current slug matches category slug
  const isActiveSlug = (catSlug) => slug === catSlug;

  return (
    <div className="category-sidebar" role="list" aria-label="Category Sidebar">
      {/* Always show All category */}
      <div
        className={`sidebar-item ${slug === 'all' ? 'active' : ''}`}
        onClick={() => handleClick('All')}
        role="listitem"
        tabIndex={0}
        onKeyDown={(e) => { if(e.key === 'Enter') handleClick('All'); }}
        aria-current={slug === 'all' ? 'true' : 'false'}
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
              fontSize: '14px',
            }}
            aria-hidden="true"
          >
            A
          </div>
        </div>
        <span className="category-title">All</span>
      </div>

      {/* Render fetched categories */}
      {categories.map((cat) => {
        const catSlug = slugify(cat.serviceName || '');

        return (
          <div
            key={cat.serviceName}
            className={`sidebar-item ${isActiveSlug(catSlug) ? 'active' : ''}`}
            onClick={() => handleClick(cat.serviceName)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleClick(cat.serviceName);
            }}
            aria-current={isActiveSlug(catSlug) ? 'true' : 'false'}
          >
            <div className="icon-wrapper">
              {cat.imageBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${cat.imageBase64}`}
                  alt={`${cat.serviceName} icon`}
                  className="category-icon"
                />
              ) : (
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#ddd',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#555',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    userSelect: 'none',
                  }}
                  aria-hidden="true"
                >
                  {cat.serviceName ? cat.serviceName.charAt(0).toUpperCase() : '?'}
                </div>
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
