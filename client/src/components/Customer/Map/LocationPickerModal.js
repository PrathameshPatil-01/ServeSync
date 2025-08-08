import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const LocationPickerModal = ({ show, onHide, onLocationSelect }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (show && !mapInitialized) {
      const script = document.createElement('script');
      script.src = `https://apis.mappls.com/advancedmaps/api/172e3873f95691d7b8ac9b6270d04321/map-sdk?layer=vector&v=3.0&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      window.initMap = () => {
        setMapInitialized(true);
        initializeMap();
      };

      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    }
  }, [show]);

  const initializeMap = () => {
    const map = new window.mappls.Map({
      center: [77.2090, 28.6139], // Default: Delhi
      zoom: 12,
      divId: "mapContainer"
    });

    const marker = new window.mappls.Marker({
      position: [77.2090, 28.6139],
      map: map,
      draggable: true
    });

    marker.addListener('dragend', (e) => {
      const [lng, lat] = e.latLng;
      reverseGeocode(lat, lng);
    });
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://apis.mappls.com/advancedmaps/v1/172e3873f95691d7b8ac9b6270d04321/rev_geocode?lat=${lat}&lng=${lng}`
      );
      const data = await response.json();

      if (data?.results?.[0]?.formatted_address) {
        const address = data.results[0].formatted_address;
        setCurrentLocation({
          address,
          coordinates: { lat, lng }
        });
        setError(null);
      } else {
        setCurrentLocation(null);
        setError("Couldn't determine address for this location.");
      }
    } catch (err) {
      console.error("Reverse geocode error:", err);
      setError("Failed to fetch address. Please try again.");
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);

        if (mapInitialized) {
          const map = window.mappls.Map.getMapById("mapContainer");
          map.setCenter([longitude, latitude]);
        }

        setIsLoading(false);
      },
      () => {
        setError("Unable to retrieve your location.");
        setIsLoading(false);
      }
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Your Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Button 
            variant="outline-primary" 
            onClick={handleCurrentLocation}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Detecting Location...
              </>
            ) : (
              "Use My Current Location"
            )}
          </Button>
        </div>

        <div id="mapContainer" style={{ height: '400px', width: '100%' }}></div>

        {currentLocation && (
          <div className="mt-3 p-3 bg-light rounded">
            <h6>Selected Location:</h6>
            <p>{currentLocation.address}</p>
            <Button 
              variant="primary"
              onClick={() => {
                onLocationSelect(currentLocation);
                onHide();
              }}
            >
              Confirm Location
            </Button>
          </div>
        )}

        {error && (
          <div className="text-danger mt-3">
            {error}
            <div className="small text-muted">
              Try dragging the pin slightly or use a different spot.
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LocationPickerModal;
