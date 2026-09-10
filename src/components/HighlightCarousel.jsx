import { useRef } from "react"
import WeatherCard from "./WeatherCard.jsx"

export default function HighlightCarousel({ highlightedCities = [] }) {
    const carouselRef = useRef(null)

    const scroll = (direction) => {
        carouselRef.current?.scrollBy({
            left: direction * carouselRef.current.clientWidth,
            behavior: "smooth",
        })
    }

    return (
        <div className="w-full min-w-0 max-w-full p-4">
          <div
            ref={carouselRef}
            className="flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
          >
            {highlightedCities.map((highlightedCity) => (
              <div
                key={highlightedCity}
                className="min-w-full snap-center md:min-w-0"
              >
                <WeatherCard city={highlightedCity} />
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-center gap-2 md:hidden">
            <button
              type="button"
              aria-label="Previous city"
              onClick={() => scroll(-1)}
              className="rounded-full bg-gray-200 px-3 py-1"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next city"
              onClick={() => scroll(1)}
              className="rounded-full bg-gray-200 px-3 py-1"
            >
              →
            </button>
          </div>
        </div>
    )
}