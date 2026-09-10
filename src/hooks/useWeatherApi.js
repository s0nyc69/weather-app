import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../api/api.js'

export default function useWeatherApi(city) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (city) {
      getCurrentWeather(city)
        .then(data => setCurrentWeather(data))
        .catch(error => console.error('Error fetching current weather:', error));

      getForecast(city)
        .then(data => setForecast(data))
        .catch(error => console.error('Error fetching forecast:', error));
    }
  }, [city]);

  return { currentWeather, forecast };
}