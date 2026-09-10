import Sun from "../assets/animated/day.svg";
import Cloud from "../assets/animated/cloudy-day-1.svg";
import Rain from "../assets/animated/rainy-7.svg";
import Snow from "../assets/animated/snowy-6.svg";
import Thunderstorm from "../assets/animated/thunder.svg";
import Mist from "../assets/animated/weather.svg";

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case "Clear":
      return <img src={Sun} alt="Clear" />;
    case "Clouds":
      return <img src={Cloud} alt="Clouds" />;
    case "Rain":
      return <img src={Rain} alt="Rain" />;
    case "Snow":
      return <img src={Snow} alt="Snow" />;
    case "Thunderstorm":
      return <img src={Thunderstorm} alt="Thunderstorm" />;
    case "Mist":
      return <img src={Mist} alt="Mist" />;
    default:
      return null;
  }
};
export default WeatherIcon;
