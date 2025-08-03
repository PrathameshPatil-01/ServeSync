import React from 'react';
import './FilterBar.css';

const filters = ['Brand', 'Brownie', 'Cheese Snacks', 'Fried Chicken Snacks', 'Chutney', 'Type'];

const FilterBar = () => {
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button key={filter} className="filter-button">
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
