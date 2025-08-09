import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Update this import to your correct fetch function that calls /all-users-with-services
import { fetchAllUsersWithServices } from '@/services/providrservice1';
import './PeopleCardSlider.css';

const PeopleCardSlider = () => {
  const [people, setPeople] = useState([]);
  const [rawProviders, setRawProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const providers = await fetchAllUsersWithServices();
        console.log('Fetched providers:', providers);

        if (!Array.isArray(providers)) {
          console.error('Expected array but got:', providers);
          setPeople([]);
          return;
        }

        setRawProviders(providers);

        // Group providers by providerId to avoid duplicates and collect services
        const groupedProviders = providers.reduce((acc, curr) => {
          if (!acc[curr.providerId]) {
            acc[curr.providerId] = {
              providerId: curr.providerId,
              fullName: curr.fullName,
              businessName: curr.businessName,
              services: [curr.serviceName],
              estimatedDuration: curr.estimatedDuration,
            };
          } else {
            if (!acc[curr.providerId].services.includes(curr.serviceName)) {
              acc[curr.providerId].services.push(curr.serviceName);
            }
          }
          return acc;
        }, {});

        // Convert grouped object to array
        const formattedData = Object.values(groupedProviders).map((provider) => ({
          id: provider.providerId,
          name: provider.fullName,
          profession: provider.services.join(', '), // show all services joined
          description: provider.businessName || 'No description provided.',
          image: '/images/default-profile.jpg', // no image from API, use default or update accordingly
          bgColor: getRandomColor(),
          estimatedDuration: provider.estimatedDuration,
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
    // Find all entries for this providerId in rawProviders
    const selectedProviderEntries = rawProviders.filter((p) => p.providerId === id);

    if (selectedProviderEntries.length > 0) {
      // Prepare combined provider info to pass in state
      const providerData = {
        providerId: id,
        fullName: selectedProviderEntries[0].fullName,
        businessName: selectedProviderEntries[0].businessName,
        services: [...new Set(selectedProviderEntries.map(p => p.serviceName))], // unique services
        estimatedDuration: selectedProviderEntries[0].estimatedDuration,
      };

      const encodedName = encodeURIComponent(providerData.fullName);
      navigate(`/customer/provider/${encodedName}`, { state: { provider: providerData } });
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
