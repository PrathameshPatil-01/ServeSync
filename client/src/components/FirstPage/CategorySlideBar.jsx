import React from 'react';
import './CategorySlideBar.css';

import Electrician from './images/Electrician.jpg';
import BuildingConstruction from './images/building-construction.jpg';
import Carpentry from './images/Carpentry.jpg';
import Ceilings from './images/ceilings.jpg';
import Flooring from './images/Flooring.jpg';
import Plumbing from './images/Plumbing.jpg';
import Cleaning from './images/Cleaning.jpg';
import ApplianceRepair from './images/ApplianceRepair.jpg';

const categories = [
  { name: 'Electricians', image: Electrician },
  { name: 'Building Construction', image: BuildingConstruction },
  { name: 'Carpentry', image: Carpentry },
  { name: 'Ceilings', image: Ceilings },
  { name: 'Flooring', image: Flooring },
  { name: 'Plumbing', image: Plumbing },
  { name: 'Cleaning', image: Cleaning },
  { name: 'Appliance Repair', image: ApplianceRepair },
];

function CategorySlideBar() {
  return (
    <div className="category-section">
      <h2 className="category-title">OUR CATEGORIES</h2>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div key={index} className="category-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySlideBar;
