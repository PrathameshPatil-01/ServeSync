  // src/components/Customer/Provider/ProviderCard.js
  import React from 'react';
  import './ProviderCard.css';

  const ProviderCard = ({ provider }) => {
    if (!provider) return null;

    return (
      <div className="provider-card">
        {/* Left Image */}
        <div className="provider-card__image-wrapper">
          <img
            src={provider.profileImage}
            alt={provider.fullName}
            className="provider-card__image"
          />
        </div>

        {/* Right Details */}
        <div className="provider-card__details">
          <h1 className="provider-card__name">{provider.fullName}</h1>
          <p className="provider-card__skill">{provider.skills}</p>

          <div className="provider-card__info">
            <span>📍 {provider.location}</span>
            <span>🛠 {provider.yearsOfExperience}+ yrs experience</span>
            <span>✅ {provider.completedJobs} jobs done</span>
            <span>⭐ {provider.rating} rating</span>
          </div>

          <div className="provider-card__description">
            <h2>About</h2>
            <p>{provider.description}</p>
          </div>

          <div className="provider-card__action">
            <span className="provider-card__price">₹{provider.chargePerHour}/hr</span>
            <button className="provider-card__book-btn">Book Now</button>
          </div>
        </div>
      </div>
    );
  };

  export default ProviderCard;
