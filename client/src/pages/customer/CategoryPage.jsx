// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/customer/customerProvider/productSlice';

import CategorySidebar from '@/components/Customer/CategoryPage/CategorySidebar';
import ProductCard from '@/components/Customer/CategoryPage/ProductCard';

// Updated import: call correct service function
import { fetchAllUsersWithServices } from '@/services/providrservice1';

const CategoryPage = () => {
  const { slug } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);

      try {
        const data = await fetchAllUsersWithServices();

        const formatted = data.map((provider) => ({
          providerId: provider.providerId,
          name: provider.fullName,
          quantity: provider.serviceName,                 // Used in UI
          price: 0,                                       // Static as no price in DTO
          label: provider.businessName,                  // Business name shown on card
          category: provider.serviceName?.toLowerCase(), // For filtering
          image: '/images/default-profile.png',           // Default image
          estimatedDuration: provider.estimatedDuration,
        }));

        // Deduplicate providers by providerId
        const uniqueProviders = formatted.reduce((acc, provider) => {
          if (!acc.some(p => p.providerId === provider.providerId)) {
            acc.push(provider);
          }
          return acc;
        }, []);

        setProviders(uniqueProviders);
        dispatch(setProducts(uniqueProviders));
      } catch (err) {
        console.error('Error loading providers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [dispatch]);

  // Filter based on the serviceName (slug)
  const filteredProviders =
    slug?.toLowerCase() === 'all'
      ? providers
      : providers.filter(
          (provider) =>
            provider.category &&
            provider.category.includes(slug?.toLowerCase())
        );

  return (
    <div>
      <div className="category-page">
        <CategorySidebar />
        <div className="main-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="product-grid">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <ProductCard
                    key={`${provider.providerId}`} // Unique key by providerId
                    product={{
                      id: provider.providerId, // ✅ used for likes etc.
                      name: provider.name,
                      quantity: provider.quantity,
                      price: provider.price,
                      label: provider.label,
                      category: provider.category,
                      image: provider.image,
                      estimatedDuration: provider.estimatedDuration,
                    }}
                  />
                ))
              ) : (
                <p>No services found for this category.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
