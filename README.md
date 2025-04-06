# HU-Edge-React

## Overview
HU-Edge-React is a weather application built using React. It provides the following features:
- Displays the current weather for a selected city or the user's current location.
- Shows an hourly weather forecast.
- Displays a 5-day weather forecast.
- Allows users to toggle between Celsius and Fahrenheit for temperature display.

## Features
1. **Current Weather**:
   - Displays the current temperature, weather condition, and location details.
   - Users can toggle between Celsius and Fahrenheit.

2. **Hourly Forecast**:
   - Provides hourly weather updates for the selected city or current location.
   - Displays temperature, time, and weather conditions.

3. **5-Day Forecast**:
   - Shows a 5-day weather forecast with high and low temperatures and weather conditions.

4. **Toggle Button**:
   - A toggle switch allows users to switch between Celsius and Fahrenheit.
   - The toggle button and message have an Aero Glass style for a modern UI.

## Technologies Used
- **React**: For building the user interface.
- **WeatherAPI**: For fetching weather data (current, hourly, and 5-day forecasts).
- **CSS**: For styling, including Aero Glass effects for modern UI components.

## Required Modules and Packages
To run this application, the following modules and packages are required:
1. **React**: The core library for building the user interface.
2. **react-icons**: For adding icons (e.g., the search icon).
   - Install using:
     ```bash
     npm install react-icons
     ```
3. **WeatherAPI**: For fetching weather data.
   - Requires an API key from [WeatherAPI](https://www.weatherapi.com/).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/HU-Edge-React.git
   cd weather-app
   npm run dev