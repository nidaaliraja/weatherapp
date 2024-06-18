import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (city.trim() === "") {
      console.log("City name is empty. Skipping fetch.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7491605b8d93101616bf6044d95fed28`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
      console.log(data); // You can see all the weather data in console log
    } catch (error) {
      console.error(error);
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading ? (
        <p className="loading">Loading weather data...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : weatherData && weatherData.main && weatherData.weather ? (
        <div className="card">
          <div className="weather-icon">
            {/* You can use a weather icon based on the description */}
            {weatherData.weather[0].main === "Clear" ? "☀️" : "☁️"}
          </div>
          <h2>{weatherData.name}</h2>
          <p className="temperature">{weatherData.main.temp}°C</p>
          <p className="description">{weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
        </div>
      ) : (
        <p>Enter a city name to get weather data</p>
      )}
    </div>
  );
};

export default Weather;
