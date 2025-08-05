import React, { useEffect, useState } from 'react';
import { fetchAllProviders } from '../../api/providerService';
import './PeopleCardSlider.css';

const PeopleCardSlider = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const providers = await fetchAllProviders();

        const formattedData = providers.map(provider => ({
          name: provider.fullName,
          profession: provider.skills || 'Professional',
          description: provider.description || 'No description provided.',
          image: provider.profileImage
            ? `data:image/jpeg;base64,${provider.profileImage}`
            : '/images/default-profile.jpg', // fallback if image is missing
          bgColor: getRandomColor(),
        }));

        setPeople(formattedData);
      } catch (error) {
        console.error('Failed to load providers:', error);
      }
    };

    getData();
  }, []);

  const getRandomColor = () => {
    const colors = ['#B4D4FF', '#FAD9E6', '#D0F0E8', '#FFF1AC', '#E4DBF5'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="people-slider-wrapper">
      <h2 className="people-title">Our Top Professionals</h2>
      <div className="people-card-container">
        {people.map((person, index) => (
          <div
            className="people-card"
            key={index}
            style={{ backgroundColor: person.bgColor }}
          >
            <div className="person-image-wrapper">
              <img src={person.image} alt={person.name} />
            </div>
            <h3>{person.name}</h3>
            <p className="profession">{person.profession}</p>
            <p className="description">{person.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleCardSlider;
