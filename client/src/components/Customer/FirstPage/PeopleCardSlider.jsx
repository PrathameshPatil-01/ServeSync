import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllProviders } from '@/services/providrservice1';
import './PeopleCardSlider.css';

const PeopleCardSlider = () => {
  const [people, setPeople] = useState([]);
  const [rawProviders, setRawProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const providers = await fetchAllProviders();
        console.log('Fetched providers:', providers);

        if (!Array.isArray(providers)) {
          console.error('Expected array but got:', providers);
          setPeople([]);
          return;
        }

        // Save raw data for later navigation
        setRawProviders(providers);

        const formattedData = providers.map(provider => ({
          id: provider.id,
          name: provider.fullName,
          profession: provider.skills || 'Professional',
          description: provider.description || 'No description provided.',
          image: provider.profileImage
            ? `data:image/jpeg;base64,${provider.profileImage}`
            : '/images/default-profile.jpg',
          bgColor: getRandomColor(),
        }));

        setPeople(formattedData);
      } catch (error) {
        console.error('Failed to load providers:', error);
        setPeople([]);
      }
    };

    getData();
  }, []);

  const getRandomColor = () => {
    const colors = ['#B4D4FF', '#FAD9E6', '#D0F0E8', '#FFF1AC', '#E4DBF5'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleCardClick = (id) => {
    const selectedProvider = rawProviders.find((p) => p.id === id);
    if (selectedProvider) {
      const encodedName = encodeURIComponent(selectedProvider.fullName);
      navigate(`/customer/provider/${encodedName}`, { state: { provider: selectedProvider } });
    }
  };

  return (
    <div className="people-slider-wrapper">
      <h2 className="people-title">Our Top Professionals</h2>
      <div className="people-card-container">
        {people.map((person, index) => (
          <div
            className="people-card"
            key={index}
            style={{ backgroundColor: person.bgColor, cursor: 'pointer' }}
            onClick={() => handleCardClick(person.id)}
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
