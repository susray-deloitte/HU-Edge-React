import React, { useState, useEffect } from "react";

const WeatherCard = ({ city, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=d52a59194ab1406eb72104832250404&q=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    } else if (coords) {
      fetchWeatherData(`${coords.latitude},${coords.longitude}`);
    }
  }, [city, coords]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { temp_c, condition, last_updated } = weatherData.current;
  const { text, icon } = condition;
  const { name, region, country } = weatherData.location;

  return (
    <div>
      <div className="weather-info">
        <div className="weather-icon-text" style={{ display: "flex", alignItems: "center" }}>
          <img src={`https:${icon}`} alt={text} style={{ marginRight: "10px" }} />
          <p>{text}</p>
        </div>
        <h3>
          {name}, {region}, {country}
        </h3>
        <p>Last Updated: {last_updated}</p>
        <p>Temperature: {temp_c}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;