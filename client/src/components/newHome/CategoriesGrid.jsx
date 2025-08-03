import React from 'react';
import CategoryCard from './CategoryCard';
import './CategoriesGrid.css';
import Electrician from '../FirstPage/images/Electrician.jpg';
import BuildingConstruction from '../FirstPage/images/building-construction.jpg';
import Carpentry from '../FirstPage/images/Carpentry.jpg';
import Ceilings from '../FirstPage/images/ceilings.jpg';
import Flooring from '../FirstPage/images/flooring.jpg';
import Plumbing from '../FirstPage/images/plumbing.jpg';
import Cleaning from '../FirstPage/images/cleaning.jpg';
import Appliance from '../FirstPage/images/appliance.jpg';




const categories = [
  { image: Electrician, title: 'Electricians' },
  { image: BuildingConstruction, title: 'building-construction' },
  { image: Carpentry, title: 'Carpentry' },
  { image: Ceilings, title: 'ceilings' },
  { image: Flooring, title: 'Flooring' },
  { image: Plumbing, title: 'Plumbing' },
  { image: Cleaning, title: 'Cleaning' },
  { image: Appliance, title: 'Appliance Repair' },
  // ...add more as needed
];

const CategoriesGrid = () => {
  return (
    <section className="categories-section">
      <div className="categories-title-wrapper">
        <div className="categories-title-line"></div>
        <h2 className="categories-title">Our Categories</h2>
        <div className="categories-title-line"></div>
      </div>
      <div className="categories-grid">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} image={cat.image} title={cat.title} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;
