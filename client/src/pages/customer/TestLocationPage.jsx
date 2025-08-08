import React, { useState } from 'react';
import MapModal from '../components/MapModal';

export default function TestLocationPage() {
  const [showMap, setShowMap] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  return (
    <div>
      <h2>Select Address</h2>
      <button onClick={() => setShowMap(true)}>Select Location</button>
      {selectedAddress && <p>Selected: {selectedAddress}</p>}
      <MapModal
        show={showMap}
        onClose={() => setShowMap(false)}
        onLocationSelect={(address) => setSelectedAddress(address)}
      />
    </div>
  );
}
