import React from 'react';
import './ScrollingCardRow.css';

const logos = [
  '/images/Electrican.png',
  '/images/logo2.png',
  '/images/logo3.png',
  '/images/logo4.png',
  '/images/logo5.png',
  '/images/logo6.png',
  '/images/logo7.png',
  '/images/logo8.png',
  '/images/logo9.png',
  '/images/logo10.png',
];

const ScrollingCardRow = () => {
  return (
    <div className="scrolling-card-row-container">
      <div className="scrolling-track">
        {logos.concat(logos).map((logo, index) => (
          <div className="card-item" key={index}>
            <img src={logo} alt={`logo-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingCardRow;
