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

  useEffect(() => {
    // Get user's current location
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
    setCoords(null); // Clear coords when searching for a city
  };

  return (
    <div className="App">
      <div className="search-container">
        <Search onCityChange={handleCityChange} />
      </div>
      <div className="weather-card-container">
        <WeatherCard city={city} coords={coords} />
      </div>
      {coords || city ? (
        <>
          <div className="five-day-forecast-container">
            <FiveDayForecast city={city} coords={coords} />
          </div>
          <div className="hourly-forecast-container">
            <HourlyForecast city={city} coords={coords} />
          </div>
        </>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}

export default App;
