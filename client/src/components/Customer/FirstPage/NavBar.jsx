// src/components/Customer/FirstPage/NavBar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import logo from "./images/logo-svg.svg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../CategoryPage/ProductCard';
import useSearchFilter from '../Search/useSearchFilter';
import NotificationSidebar from './NotificationSidebar';

export default function NavBar({ onUserIconClick, onUserNotificationIconClick }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Deccan Gymkhana, Pune");
  const [showMap, setShowMap] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotificationSidebar = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Search-related state
  const {
    searchTerm,
    setSearchTerm,
    filteredResults,
    showSearchModal,
    setShowSearchModal,
    handleSearch,
    handleResultClick
  } = useSearchFilter(navigate);

  // --------------------- LOCATION/MAP HANDLING ---------------------
  const initializeMapPicker = useCallback(() => {
    const map = new window.mappls.Map({
      center: [73.8567, 18.5204],
      zoom: 12,
      divId: "mapPickerContainer"
    });

    const marker = new window.mappls.Marker({
      position: [73.8567, 18.5204],
      map: map,
      draggable: true
    });

    marker.addListener('dragend', async (e) => {
      const [lng, lat] = e.latLng;
      if (lat && lng) {
        await updateAddressFromCoords(lat, lng);
      }
    });

    map.addControl(new window.mappls.SearchControl({
      placeholder: "Search location..."
    }));
  }, []);

  useEffect(() => {
    if (showMap && !mapInitialized) {
      window.initMapplsMap = () => {
        setMapInitialized(true);
        initializeMapPicker();
      };

      const mapScript = document.createElement('script');
      mapScript.src = `https://apis.mappls.com/advancedmaps/api/YOUR_API_KEY/map_sdk?layer=vector&v=3.0&callback=initMapplsMap`;
      mapScript.async = true;
      document.head.appendChild(mapScript);

      const pluginScript = document.createElement('script');
      pluginScript.src = `https://apis.mappls.com/advancedmaps/api/YOUR_API_KEY/map_sdk_plugins?v=3.0`;
      pluginScript.async = true;
      document.head.appendChild(pluginScript);

      return () => {
        document.head.removeChild(mapScript);
        document.head.removeChild(pluginScript);
        delete window.initMapplsMap;
      };
    }
  }, [showMap, mapInitialized, initializeMapPicker]);

  const reverseGeocode = async (lat, lng) => {
    const response = await window.mappls.plugins.rev_geocode({ lat, lng });
    return response?.results?.[0]?.formatted_address || "Unknown location";
  };

  const updateAddressFromCoords = async (lat, lng) => {
    try {
      const address = await reverseGeocode(lat, lng);
      setLocation(address);
      setLocationError(null);
    } catch {
      setLocation("Location not found");
      setLocationError("Couldn't determine address");
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await updateAddressFromCoords(latitude, longitude);

        if (mapInitialized) {
          const map = window.mappls.Map.getMapById("mapPickerContainer");
          map.setCenter([longitude, latitude]);
          const marker = map.getMarkers()[0];
          marker.setPosition([longitude, latitude]);
        }

        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setLocationError("Location access denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleLogoClick = () => navigate('/customer/firstPage');
  const handleHomesClick = () => navigate('/customer/firstPage');

  return (
    <div className="navbar-container">
    <nav className="navbar navbar-expand-lg classy-navbar w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          {/* Left Section - Logo and Categories */}
          <div className="d-flex align-items-center gap-4">
            <div className="navbar-brand d-flex align-items-center" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <img src={logo} alt="ServSync" style={{ width: "150px", height: "auto" }} />
            </div>
            <div className="d-none d-md-flex gap-3 ms-2">
              <a className="nav-link classy-link" href="#">Beauty</a>
              <a className="nav-link classy-link" href="#" onClick={handleHomesClick}>Homes</a>
              <a className="nav-link classy-link" href="#">Native</a>
            </div>
          </div>

          {/* Center Section - Location and Search */}
          <div className="d-flex flex-grow-1 mx-4 gap-3" style={{ maxWidth: '700px' }}>
            <div className="input-group classy-input" style={{ width: "40%" }} onClick={() => setShowMap(true)}>
              <span className="input-group-text classy-icon">📍</span>
              <input
                type="text"
                className="form-control classy-field"
                value={location}
                readOnly
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div className="input-group classy-input flex-grow-1">
              <span className="input-group-text classy-icon">🔍</span>
              <input
                type="text"
                className="form-control classy-field"
                placeholder="Search by name or skill"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim().length > 0 && setShowSearchModal(true)}
              />
              <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
          </div>

          {/* Right Section - Icons */}
          <div className="d-flex align-items-center gap-3 fs-5">
            <span className="classy-icon-btn" onClick={toggleNotificationSidebar}>🔔</span>
            <span className="classy-icon-btn">🛒</span>
            <span className="classy-icon-btn" onClick={onUserIconClick}>👤</span>
          </div>
        </div>
      </nav>

      {/* Map Modal */}
      {showMap && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white p-4" style={{ zIndex: 1050 }}>
          <div className="d-flex justify-content-between mb-3">
            <h5>Select Location</h5>
            <button className="btn btn-sm btn-outline-danger" onClick={() => setShowMap(false)}>Close</button>
          </div>
          <div className="mb-3">
            <button className="btn btn-outline-primary" onClick={handleGetCurrentLocation} disabled={isLocating}>
              {isLocating && <span className="spinner-border spinner-border-sm me-2"></span>}
              {isLocating ? "Detecting..." : "Use My Location"}
            </button>
            {locationError && <div className="text-danger small mt-2">{locationError}</div>}
          </div>
          <div id="mapPickerContainer" style={{ height: '70vh', width: '100%' }}></div>
          <div className="mt-3 text-center">
            <button className="btn btn-primary" onClick={() => setShowMap(false)}>Confirm Location</button>
          </div>
        </div>
      )}

     {/* Search Modal - Shows when typing or clicking search */}
{(showSearchModal || (searchTerm.trim().length > 0 && document.activeElement.className.includes('classy-field'))) && (
  <div
    className="position-fixed start-0 w-100 bg-white overflow-auto p-4"
    style={{
      zIndex: 1051,
      top: '80px',  // height of navbar, adjust if different
      height: 'calc(100vh - 80px)', // full viewport height minus navbar
      borderTop: '1px solid #ccc',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}
  >
    <div className="d-flex justify-content-between mb-3">
      <h4>Search Results</h4>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => {
          
          setShowSearchModal(false);
          setSearchTerm('');
          setFilteredResults([]);
        }}
      >
        Close
      </button>
    </div>
    <div className="row">
      {filteredResults.length > 0 ? (
        filteredResults.map((provider) => (
          <div key={provider.id} className="col-md-4 mb-3">
            <div onClick={() => handleResultClick(customer/provider)} style={{ cursor: 'pointer' }}>
              <ProductCard product={provider} />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted mt-4">
          {searchTerm.trim().length > 0 ? "No results found." : "Start typing to search..."}
        </div>
      )}
    </div>
  </div>
)}
 <NotificationSidebar isOpen={isNotificationOpen} onClose={toggleNotificationSidebar} />
    
    </div>
  );
}
