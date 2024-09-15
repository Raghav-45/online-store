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
            const apiKey = '8bb8c8c3507631f11bb9599e7795a718';
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            );
            const { name: city, zip } = response.data;
            setLocation({ city, postal_code: zip });
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
          <p>City: {location.city}</p>
          <p>Postal Code: {location.postal_code}</p>
        </div>
      )}
    </div>
  );
};

export default LocationButton;
