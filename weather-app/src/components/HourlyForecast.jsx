import React, { useState, useEffect } from "react";

const HourlyForecast = ({ city, coords, isCelsius }) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyForecast = async (query) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=${query}&hours=24`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hourly forecast");
        }
        const data = await response.json();
        setHourlyForecast(data.forecast.forecastday[0].hour);
      } catch (err) {
        setError(err.message);
      }
    };

    if (city) {
      fetchHourlyForecast(city);
    } else if (coords) {
      fetchHourlyForecast(`${coords.latitude},${coords.longitude}`);
    }
  }, [city, coords]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hourlyForecast || hourlyForecast.length === 0) {
    return <div>Loading hourly forecast...</div>;
  }

  return (
    <div>
      <h3>Hourly Forecast</h3>
      <ul className="forecast-list">
        {hourlyForecast.map((hour, index) => (
          <li key={index} className="forecast-item">
            <p>Time: {hour.time.split(" ")[1]}</p>
            <p>
              Temperature:{" "}
              {isCelsius ? `${hour.temp_c}°C` : `${hour.temp_f}°F`}
            </p>
            <p>Condition: {hour.condition.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;