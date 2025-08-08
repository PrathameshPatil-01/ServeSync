import React from 'react';
import WorkerCard from './WorkerCard';
import './WorkerSection.css';

const workers = [
  { image: '/images/worker1.png', title: 'John Doe', subtitle: 'Plumber', price: '₹500/day' },
  { image: '/images/worker2.png', title: 'Anita Rao', subtitle: 'Chef', price: '₹700/day' },
  { image: '/images/worker3.png', title: 'Ravi Kumar', subtitle: 'Electrician', price: '₹600/day' },
  { image: '/images/worker4.png', title: 'Sneha Jain', subtitle: 'Cleaner', price: '₹400/day' },
  { image: '/images/worker4.png', title: 'Sneha Jain', subtitle: 'Cleaner', price: '₹400/day' }
  
  // add more workers as needed
];

const WorkerSection = () => {
  return (
    <div className="worker-section-outer">
      <section className="worker-section">
        <div className="worker-header">
          <div className="worker-heading">
            
            <div>
              <h2>Your Workforce</h2>
              <p>Skilled professionals at your service</p>
            </div>
          </div>
          <a className="see-all" href="/workers">See all</a>
        </div>

        <div className="worker-cards">
          {workers.map((worker, idx) => (
            <WorkerCard
              key={idx}
              image={worker.image}
              title={worker.title}
              subtitle={worker.subtitle}
              price={worker.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkerSection;
