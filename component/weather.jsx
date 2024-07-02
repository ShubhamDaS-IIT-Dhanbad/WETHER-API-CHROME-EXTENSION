import React, { useState } from 'react';

const Weather = () => {
  const [cityInput, setCityInput] = useState('');
  const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  const apiid = "54a4f4ddca166ee037d974b18c188b5e";

  const handleSearchByCity = async () => {
    try {
      const response = await fetch(`${apiurl}&appid=${apiid}&q=${cityInput}`);
      if (!response.ok) {
        throw new Error('City not found or weather data unavailable');
      }
      const data = await response.json();
      updateWeatherUI(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Please enter a valid city name.');
    }
  };

  const updateWeatherUI = (data) => {
    document.querySelector(".ctemp").innerHTML = Math.round(data.main.temp) + `°c`;
    document.querySelector(".ccity").innerHTML = cityInput;
    document.querySelector("#humiditydata").innerHTML = Math.round(data.main.humidity) + `%`;
    document.querySelector("#windspeeddata").innerHTML = Math.round(data.wind.speed) + `km/hr`;

    switch (data.weather[0].main) {
      case 'Clear':
        document.querySelector(".weather_logo").src = "clear.png";
        break;
      case 'Mist':
      case 'Smoke':
        document.querySelector(".weather_logo").src = "mist.png";
        break;
      case 'Clouds':
        document.querySelector(".weather_logo").src = "clouds.png";
        break;
      case 'Rain':
        document.querySelector(".weather_logo").src = "rain.png";
        break;
      case 'Drizzle':
        document.querySelector(".weather_logo").src = "drizzle.png";
        break;
      case 'Snow':
        document.querySelector(".weather_logo").src = "snow.png";
        break;
      default:
        // Handle other conditions or no image
        break;
    }

    document.querySelector(".card").style.height = "100%";
    document.querySelector(".content").style.display = "flex";
  };

  const handleInputChange = (event) => {
    setCityInput(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchByCity}>Search</button>
      </div>

      <div className="content" style={{ display: 'none' }}>
        <div className="card">
          <h2>Weather Forecast</h2>
          <div>Location: <span className="ccity"></span></div>
          <div>Temperature: <span className="ctemp"></span></div>
          <div>Conditions: <span id="weatherdata"></span></div>
          <div>Humidity: <span id="humiditydata"></span></div>
          <div>Wind Speed: <span id="windspeeddata"></span></div>
          <img className="weather_logo" src="" alt="Weather Icon" />
        </div>
      </div>
    </div>
  );
};

export default Weather;
