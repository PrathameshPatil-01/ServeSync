import React, { useState, useEffect } from 'react';
import './PromoSlider.css';

import promo1 from './images/promo1.png';
import promo2 from './images/promo2.jpg';

const slides = [
  {
    image: promo1,
    title: 'Premium cashews for every recipe!',
    description: 'garnish, blend, or sprinkle with SAC’s whole & broken cashews',
    bgColor: '#afb3b5ff',
  },
  {
    image: promo2,
    title: 'Cashews at ₹547/kg',
    description: 'use for gravies, tikkas & more',
    bgColor: '#b7eafeff',
  },
  
];

export default function PromoSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <div className="promo-slider" style={{ backgroundColor: current.bgColor }}>
      <button className="arrow left" onClick={prevSlide}>❮</button>

      <div className="promo-image">
        <img src={current.image} alt="promo" />
      </div>

      <div className="promo-text">
        <h2>{current.title}</h2>
        <p>{current.description}</p>
        <button className="shop-btn">Shop here →</button>
      </div>

      <button className="arrow right" onClick={nextSlide}>❯</button>
    </div>
  );
}
