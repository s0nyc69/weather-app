import { useState, useEffect } from 'react'
import { getCurrentWeather, getForecast } from './api/api.js'

import './App.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [city, setCity] = useState('');

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

  console.log(currentWeather);
  console.log(forecast);  

  
  return (


    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        <h1 className="text-3xl font-bold underline">
          Weathever!
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" placeholder="Enter a city name" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>  
    </>
  )
}

export default App
