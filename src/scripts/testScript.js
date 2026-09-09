import { getCurrentWeather, getForecast } from "../api/api.js";

async function getWeatherData(city) {
    const currentWeather = await getCurrentWeather(city);
    console.log(currentWeather);

    console.log("----------------------------------------------------------------------");

    const forecast = await getForecast(city);
    console.log(forecast);
}

getWeatherData("Mannheim");