// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/customer/customerProvider/productSlice';

import CategorySidebar from '@/components/Customer/CategoryPage/CategorySidebar';
import ProductCard from '@/components/Customer/CategoryPage/ProductCard';
import Footer from '@/components/Footer';
import { fetchAllProviders } from '@/services/providrservice1';

const CategoryPage = () => {
  const { slug } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);

      try {
        const data = await fetchAllProviders();
        setProviders(data);

        // Map to ProductCard + Search format (include `id` and `name`)
        const formatted = data.map((provider) => ({
          id: provider.id, // 🔥 Important for Redux list and search
          name: provider.fullName,
          quantity: `${provider.yearsOfExperience} yrs exp`,
          price: provider.chargePerHour || 0,
          label: provider.skills,
          category: provider.skills?.toLowerCase(),
          image: provider.profileImage
            ? `data:image/jpeg;base64,${provider.profileImage}`
            : '/images/default-profile.png',
        }));

        dispatch(setProducts(formatted)); // ✅ Update Redux
      } catch (err) {
        console.error('Error loading providers:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [dispatch]);

  const filteredProviders =
  slug?.toLowerCase() === 'all'
    ? providers
    : providers.filter(
        (provider) =>
          provider.skills &&
          provider.skills.toLowerCase().includes(slug?.toLowerCase())
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
                filteredProviders.map((provider, idx) => (
                  <ProductCard
                    key={provider.id}
                    product={{
                      id: provider.id, // 🔥 Also needed for Like/Search
                      name: provider.fullName,
                      quantity: `${provider.yearsOfExperience} yrs exp`,
                      price: provider.chargePerHour || 0,
                      label: provider.skills,
                      category: provider.skills?.toLowerCase(),
                      image: provider.profileImage
                        ? `data:image/jpeg;base64,${provider.profileImage}`
                        : '/images/default-profile.png',
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
      <Footer />
    </div>
  );
};

export default CategoryPage;
