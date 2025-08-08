import React, { useRef } from 'react';
import './AdCardSlider.css';

// Ad image cards (replace these with your real ad images)
import MayoAd from './images/Sofa.jpg';
import FoilAd from './images/Ceiling.jpg';

const adCards = [
  { name: 'Hellmanns Mayo', image: MayoAd },
  { name: 'HomeFoil', image: FoilAd },
  { name: 'HomeFoil', image: "" }, // This will now be safely ignored
];

function AdCardSlider() {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  return (
    <div className="ad-slider-wrapper">
      <h2 className="slider-title">Explore more</h2>

      <div className="arrow-btn left" onClick={scrollLeft}>❮</div>

      <div className="ad-slider" ref={scrollRef}>
        {adCards.map((item, index) => (
          <div key={index} className="ad-card">
            {item.image && <img src={item.image} alt={item.name} />}
            <button className="explore-btn">Explore More</button>
          </div>
        ))}
      </div>

      <div className="arrow-btn right" onClick={scrollRight}>❯</div>
    </div>
  );
}

export default AdCardSlider;
