'use client'

import { useState } from 'react';
import axios from 'axios';

const LocationButton = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const apiKey = 'ac1e06607060453c93da63c97edb4844';
            const response = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
            );
            // const data = response.data.features[0].properties;
            // console.log(data)

            const { state, city } = response.data.features[0].properties;
            setLocation({ state, city });
          } catch (err) {
            setError('Failed to fetch location data');
          }
        },
        (error) => {
          setError('Failed to get location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={getLocation}>Use My Location</button>
      {error && <p>{error}</p>}
      {location && (
        <div>
          <p>State: {location.state}</p>
          <p>City: {location.city}</p>
        </div>
      )}
    </div>
  );
};

export default LocationButton;
