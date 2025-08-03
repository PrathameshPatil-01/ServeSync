import React from 'react';
import './WorkerCard.css';

const WorkerCard = ({ image, title, subtitle, price }) => {
  return (
    <div className="worker-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>
      <div className="card-footer">
        <span className="price">{price}</span>
        <button className="add-btn">Hire</button>
      </div>
    </div>
  );
};

export default WorkerCard;
