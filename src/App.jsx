import { useState, useEffect, useRef } from "react";
import useWeatherApi from "./hooks/useWeatherApi.js";

import WeatherCard from "./components/WeatherCard.jsx";
import ForecastCarousel from "./components/ForecastCarousel.jsx";

import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  
  const { currentWeather, forecast } = useWeatherApi(debouncedCity);

  const highlightedCities = [
    "Mannheim",
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedCity(city), 500);

    return () => clearTimeout(timeoutId);
  }, [city]);

  

  return (
    <>
      <div className="flex flex-col items-center justify-between h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        <div className="grid grid-cols-5 gap-4 p-4">
          {highlightedCities.map((highlightedCity) => (
            <WeatherCard key={highlightedCity} city={highlightedCity} />
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold underline">Weathever!</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="city">Stadt:</label>
            <input
              className="px-4 py-2 border-1 border-white text-white rounded-lg"
              type="text"
              id="city"
              placeholder="Bitte geben Sie eine Stadt ein"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {currentWeather && <WeatherCard city={debouncedCity} />}
          {forecast && (
            <ForecastCarousel forecast={forecast} />
          )}
        </div>
        <footer className="text-end w-full p-4 bg-blue-800 text-white">
          <p>Weather App &copy; 2026</p>
        </footer>
      </div>
    </>
  );
}

export default App;
