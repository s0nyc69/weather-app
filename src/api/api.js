const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`;

const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?`;

const GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/direct?q=`;

// const API_KEY = process.env.API_KEY;
const API_KEY = '96872d6bc14755b00e1e2183d2e4f73b';

const unit = 'metric'; // or 'imperial' for Fahrenheit

const lang = 'de';

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getCoordinates(location) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
    const data = await fetchData(url);

    if (data.length === 0) {
        throw new Error('Location not found');
    }

    const { lat, lon } = data[0];
    return { lat, lon };
}

export async function getCurrentWeather(location) {
    const { lat, lon } = await getCoordinates(location);
    const url = `${WEATHER_URL}&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=${lang}`;
    return fetchData(url);
}

export async function getForecast(location) {
    const { lat, lon } = await getCoordinates(location);
    const url = `${FORECAST_URL}&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=${lang}`;
    return fetchData(url);
}