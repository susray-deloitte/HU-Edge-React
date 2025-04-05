import React, { useState, useEffect } from "react";

const HourlyForecast = ({ latitude, longitude }) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=d52a59194ab1406eb72104832250404&q=${latitude},${longitude}&hours=24`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hourly forecast");
        }
        const data = await response.json();
        console.log(data)
        setHourlyForecast(data.forecast.forecastday[0].hour);
      } catch (err) {
        setError(err.message);
      }
    };

    if (latitude && longitude) {
      fetchHourlyForecast();
    }
  }, [latitude, longitude]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hourlyForecast || hourlyForecast.length === 0) {
    return <div>Loading hourly forecast...</div>;
  }

  return (
    <div>
      <h3>Hourly Forecast</h3>
      <div className="forecast-list">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="forecast-item">
            <p>{hour.time.split(" ")[1]}</p>
            <img src={hour.condition.icon} alt={hour.condition.text} />
            <p>{hour.temp_c}°C</p>
            <p>{hour.condition.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;