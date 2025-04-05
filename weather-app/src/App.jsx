import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import FiveDayForecast from "./components/FiveDayForecast";
import HourlyForecast from "./components/HourlyForecast";
import "./App.css";
import "./styles/WeatherCard.css";
import "./styles/FiveDayForecast.css";
import "./styles/HourlyForecast.css";

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

  return (
    <div className="App">
      <div className="weather-card-container">
        <WeatherCard city={city} coords={coords} />
      </div>
      {coords && (
        <>
          <div className="five-day-forecast-container">
            <FiveDayForecast latitude={coords.latitude} longitude={coords.longitude} />
          </div>
          <div className="hourly-forecast-container">
            <HourlyForecast latitude={coords.latitude} longitude={coords.longitude} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
