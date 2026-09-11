import useWeatherApi from '../hooks/useWeatherApi.js';
import WeatherIcon from './WeatherIcon.jsx';

export default function WeatherCard({ city }) {
  const { currentWeather, forecasts } = useWeatherApi(city);

  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="box-border flex w-full min-w-0 flex-col items-center rounded-xl bg-white p-4 text-black shadow">
      <WeatherIcon condition={currentWeather.weather[0].main} />
      <h2>{currentWeather.name}</h2>
      <p>{currentWeather.main.temp}°C</p>
    </div>
  );
}