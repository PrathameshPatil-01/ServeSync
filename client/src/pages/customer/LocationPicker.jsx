import React, { useState } from 'react';
import MapModal from '../../components/Map/MapModal';

const LocationPicker = () => {
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Select a Location</h2>
      <p><strong>Selected:</strong> {location}</p>
      <button onClick={() => setShowMap(true)}>📍 Open Map</button>

      <MapModal
        show={showMap}
        onClose={() => setShowMap(false)}
        onLocationSelect={(loc) => {
          setLocation(loc);
          setShowMap(false);
        }}
      />
    </div>
  );
};

export default LocationPicker;
