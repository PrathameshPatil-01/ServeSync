// src/components/MapModal.jsx
import React, { useEffect, useRef } from 'react';

const MapModal = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.mappls && window.mappls.Map) {
        clearInterval(interval);
        const map = new window.mappls.Map(mapRef.current, {
          center: [19.076, 72.8777],
          zoom: 10
        });

        new window.mappls.Marker({
          map,
          position: { lat: 19.076, lng: 72.8777 },
          draggable: true
        });
      } else {
        console.log("⏳ Waiting for MapMyIndia SDK...");
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        border: '2px solid black',
        borderRadius: '8px'
      }}
    >
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapModal;
