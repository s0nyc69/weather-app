import useWeatherApi from '../hooks/useWeatherApi.js';
import WeatherIcon from './WeatherIcon.jsx';

export default function WeatherCard({ city }) {
  const { currentWeather, forecasts } = useWeatherApi(city);

  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full p-4 m-2 bg-white rounded-xl border-yellow-500 shadow text-black">
      <WeatherIcon condition={currentWeather.weather[0].main} />
      <h2>{currentWeather.name}</h2>
      <p>{currentWeather.main.temp}°C</p>
    </div>
  );
}