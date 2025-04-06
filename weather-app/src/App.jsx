import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import FiveDayForecast from "./components/FiveDayForecast";
import HourlyForecast from "./components/HourlyForecast";
import Search from "./components/Search";
import "./App.css";
import "./styles/WeatherCard.css";
import "./styles/FiveDayForecast.css";
import "./styles/HourlyForecast.css";
import "./styles/Search.css";

function App() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (err) => {
        console.error("Failed to get location", err);
      }
    );
  }, []);

  const handleCityChange = (newCity) => {
    setCity(newCity);
    setCoords(null);
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  return (
    <div className="App">
      <Search onCityChange={handleCityChange} />
      <div className="toggle-container">
        <p className="toggle-message">
          {isCelsius
            ? "Slide right to see the temperature in Fahrenheit"
            : "Slide left to see the temperature in Celsius"}
        </p>
        <div className="toggle-switch-wrapper">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={!isCelsius}
              onChange={toggleTemperatureUnit}
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">{isCelsius ? "°C" : "°F"}</span>
        </div>
      </div>
      <div className="weather-card-container">
        <WeatherCard city={city} coords={coords} isCelsius={isCelsius} />
      </div>
      {coords || city ? (
        <>
          <div className="five-day-forecast-container">
            <FiveDayForecast city={city} coords={coords} isCelsius={isCelsius} />
          </div>
          <div className="hourly-forecast-container">
            <HourlyForecast city={city} coords={coords} isCelsius={isCelsius} />
          </div>
        </>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

export default App;
