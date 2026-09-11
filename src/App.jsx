import { useState, useEffect, useRef } from "react";
import useWeatherApi from "./hooks/useWeatherApi.js";

import WeatherCard from "./components/WeatherCard.jsx";
import ForecastCarousel from "./components/ForecastCarousel.jsx";
import HighlightCarousel from "./components/HighlightCarousel.jsx";

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
      <div className="flex h-screen min-w-0 max-w-full flex-col items-center justify-between overflow-x-hidden bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        {highlightedCities.length > 0 && (
          <HighlightCarousel highlightedCities={highlightedCities} />
        )}
        <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-4 px-4">
          <h1 className="text-3xl font-bold underline">Weathever!</h1>
          <div className="flex flex-col gap-2 w-full max-w-lg items-center">
            <label htmlFor="city">Stadt:</label>
            <input
              className="box-border w-full max-w-md rounded-lg border-1 border-white px-4 py-2 text-white"
              type="text"
              id="city"
              placeholder="Bitte geben Sie eine Stadt ein"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {currentWeather && <WeatherCard city={debouncedCity} />}
          {forecast && <ForecastCarousel forecast={forecast} />}
        </div>
        <footer className="text-end w-full p-4 bg-blue-800 text-white">
          <p>Weather App &copy; 2026</p>
        </footer>
      </div>
    </>
  );
}

export default App;
