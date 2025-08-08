import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';
import img1 from '../images/plumber1.jpg';
import img2 from '../images/electriclogo.jpg';
import img3 from '../images/elec.jpg';

const images = [img1, img2, img3];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <img src={images[currentIndex]} alt="carousel" className="carousel-image" />
      <button className="arrow left" onClick={prevSlide}>&lt;</button>
      <button className="arrow right" onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default ImageCarousel;
