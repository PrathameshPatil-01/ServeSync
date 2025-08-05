import React from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

import CategorySidebar from './../../components/CategoryPage/CategorySidebar';
import FilterBar from './../../components/CategoryPage/FilterBar';
import ProductCard from './../../components/CategoryPage/ProductCard';
import Footer from '../../components/Footer';

const sampleProducts = [
  {
    name: 'Shubham Sakande',
    quantity: 'Per Visit',
    price: 250,
    label: 'Flooring',
    category: 'flooring',
    image: '/images/fan-wiring.png',
  },
  {
    name: 'Light Installation',
    quantity: 'Per Light',
    price: 150,
    label: '',
    category: 'Electrician',
    image: '/images/light-installation.png',
  },
  {
    name: 'Shrirang',
    quantity: 'Per Unit',
    price: 300,
    label: 'Popular',
    category: 'plumbing',
    image: '/images/door-repair.png',
  },
  {
    name: 'Rushikesh',
    quantity: 'Per Sqft',
    price: 45,
    label: '',
    category: 'flooring',
    image: '/images/floor-tiling.png',
  },
  // Add more products with category slugs as needed
];

const CategoryPage = () => {
  const { slug } = useParams();

  const filteredProducts = sampleProducts.filter(
    (product) => product.category === slug
  );

  return (
    <div>
      <div className="category-page">
        <CategorySidebar />
        <div className="main-section">
          
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))
            ) : (
              <p>No services found for this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
