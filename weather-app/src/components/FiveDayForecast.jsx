import React, { useState, useEffect } from "react";

const FiveDayForecast = ({ city, coords }) => {
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiveDayForecast = async (query) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=d52a59194ab1406eb72104832250404&q=${query}&days=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch 5-day forecast");
        }
        const data = await response.json();
        setFiveDayForecast(data.forecast.forecastday);
      } catch (err) {
        setError(err.message);
      }
    };

    if (city) {
      fetchFiveDayForecast(city);
    } else if (coords) {
      fetchFiveDayForecast(`${coords.latitude},${coords.longitude}`);
    }
  }, [city, coords]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fiveDayForecast || fiveDayForecast.length === 0) {
    return <div>Loading 5-day forecast...</div>;
  }

  return (
    <div>
      <h3>5-Day Forecast</h3>
      <ul className="forecast-list">
        {fiveDayForecast.map((day, index) => (
          <li key={index} className="forecast-item">
            <p>Date: {day.date}</p>
            <p>High: {day.day.maxtemp_c}°C</p>
            <p>Low: {day.day.mintemp_c}°C</p>
            <p>
              Condition: {day.day.condition.text}
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                style={{ verticalAlign: "middle", marginLeft: "8px" }}
              />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiveDayForecast;