import { useState, useEffect, useRef } from "react";
import WeatherIcon from "./WeatherIcon.jsx";

export default function ForecastCarousel({ forecast }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const forecastRef = useRef(null);
  const forecastItems = forecast?.list?.slice(0, 5) ?? [];

  useEffect(() => {
    setActiveSlide(0);
  }, [forecast]);

  function goToSlide(index) {
    forecastRef.current?.scrollTo({
      left: index * forecastRef.current.clientWidth,
      behavior: "smooth",
    });
    setActiveSlide(index);
  }

  function handleForecastScroll(event) {
    const slideWidth = event.currentTarget.clientWidth;
    setActiveSlide(Math.round(event.currentTarget.scrollLeft / slideWidth));
  }
  return (
    <div className="w-full max-w-md p-4 m-2 bg-white rounded-xl border-yellow-500 shadow text-black">
      <h3 className="mb-3 text-lg font-semibold">Wetteraussicht:</h3>
      <ul
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
        onScroll={handleForecastScroll}
        ref={forecastRef}
      >
        {forecastItems.map((item, index) => (
          <li
            className="flex min-w-full snap-center flex-col items-center justify-center gap-2 rounded-lg bg-blue-50 p-6 text-center"
            key={index}
          >
            <WeatherIcon condition={item.weather[0].main} />
            <time
              className="font-medium"
              dateTime={new Date(item.dt * 1000).toISOString()}
            >
              {new Date(item.dt * 1000).toLocaleString()}
            </time>
            <span className="text-2xl font-bold">{item.main.temp}°C</span>
            <span className="capitalize">{item.weather[0].description}</span>
          </li>
        ))}
      </ul>
      <nav
        className="mt-4 flex items-center justify-center gap-3"
        aria-label="Forecast pagination"
      >
        <button
          className="rounded px-2 py-1 text-lg font-semibold text-blue-700 disabled:opacity-30"
          type="button"
          onClick={() => goToSlide(Math.max(0, activeSlide - 1))}
          disabled={activeSlide === 0}
          aria-label="Previous forecast"
        >
          &#8592;
        </button>
        <div className="flex gap-2">
          {forecastItems.map((item, index) => (
            <button
              className={`h-2.5 w-2.5 rounded-full ${index === activeSlide ? "bg-blue-700" : "bg-blue-200"}`}
              key={item.dt}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to forecast ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
        <button
          className="rounded px-2 py-1 text-lg font-semibold text-blue-700 disabled:opacity-30"
          type="button"
          onClick={() =>
            goToSlide(Math.min(forecastItems.length - 1, activeSlide + 1))
          }
          disabled={activeSlide === forecastItems.length - 1}
          aria-label="Next forecast"
        >
          &#8594;
        </button>
      </nav>
    </div>
  );
}
