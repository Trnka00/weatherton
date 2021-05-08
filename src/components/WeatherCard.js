import React from 'react';

import cloudsIcon from '../img/stable/cloud.svg';
import humidityIcon from '../img/stable/humidity.svg';
import sunriseIcon from '../img/stable/sunrise.svg';
import sunsetIcon from '../img/stable/sunset.svg';

const WeatherCard = ({ weather, day, getIcon }) => {
  const getTimeFromUTC = function (ms) {
    const d = new Date(ms * 1000);
    return d.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
  };

  return (
    <div className="weather-card">
      <p className="date">{day}</p>
      <figure>
        <img
          className="weather-icon"
          src={getIcon(weather.weather[0].icon)}
          alt="fotka"
        />
        <figcaption className="caption-main">
          {weather.weather[0].description}
        </figcaption>
      </figure>

      <h2 className="temp">
        {day === 'tomorrow'
          ? weather.temp.day.toFixed(1)
          : weather.temp.toFixed(1)}
        °C
      </h2>
      <div className="weather-info">
        <p className="clouds">
          <img className="info-icon" src={cloudsIcon} alt="" /> {weather.clouds}
          %
        </p>
        <p className="humidity">
          <img className="info-icon" src={humidityIcon} alt="" />
          {weather.humidity}%
        </p>
        <p className="sunrise">
          <img className="info-icon" src={sunriseIcon} alt="" />
          {getTimeFromUTC(weather.sunrise)}
        </p>
        <p className="sunset">
          <img className="info-icon" src={sunsetIcon} alt="" />
          {getTimeFromUTC(weather.sunset)}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
