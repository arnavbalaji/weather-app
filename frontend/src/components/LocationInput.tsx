import { useState } from "react";
import "./LocationInput.css";

const LocationInput = ({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; lat: number; lon: number }[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Fetch autocomplete suggestions from Python backend
  const fetchSuggestions = async (input: string) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }
    const response = await fetch(`http://127.0.0.1:5000/autocomplete?query=${input}`);
    const data = await response.json();
    setSuggestions(data);
    setActiveIndex(-1);
  };

  // Fetch weather using lat/lon
  const fetchWeather = async (lat: number, lon: number) => {
    const response = await fetch(`http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`);
    const data = await response.json();
    setWeather(data);
  };

  // Get user's current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLoadingLocation(false);
        onLocationSelect(latitude, longitude);
        fetchWeather(latitude, longitude);
      },
      (error) => {
        setLoadingLocation(false);
        alert("Unable to retrieve location. Please allow location access.");
        console.error(error);
      }
    );
  };

  // So that it only suggests when user pauses from typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to fetch suggestions after 500ms
    setTypingTimeout(setTimeout(() => fetchSuggestions(e.target.value), 500));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev)); // Move down
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev)); // Move up
    } else if (e.key === "Enter" && activeIndex >= 0) {
      // Select suggestion on Enter
      const selected = suggestions[activeIndex];
      onLocationSelect(selected.lat, selected.lon);
      setQuery(selected.name);
      setSuggestions([]);
      fetchWeather(selected.lat, selected.lon);
    }
  };

  return (
    <div className="location-container">
      <input
        type="text"
        className="location-input"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a city, ZIP, or landmark..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, index) => (
            <li
              key={index}
              className={`suggestion-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                onLocationSelect(s.lat, s.lon);
                setQuery(s.name);
                setSuggestions([]);
                fetchWeather(s.lat, s.lon);
              }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}

      <button className="location-button" onClick={handleGetCurrentLocation} disabled={loadingLocation}>
        {loadingLocation ? "Fetching Location..." : "Use My Location"}
      </button>

      {weather && (
        <div className="weather-report">
          <h3>Weather for {weather.name}</h3>
          <p>Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Condition: {weather.current.condition}</p>

          <h3>5-Day Forecast</h3>
          <ul className="forecast-list">
            {Object.entries(weather.forecast).map(([date, details]: any) => (
              <li key={date} className="forecast-item">
                <strong>{date}</strong>: {details.temp_c}°C / {details.temp_f}°F, {details.condition}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationInput;






