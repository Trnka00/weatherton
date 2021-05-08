import React from 'react';

const MiniWeatherCard = ({ weather, getIcon }) => {
  const getWeekDay = function (n) {
    let t = '';
    switch (n) {
      case 0:
        t = 'SUN';
        break;
      case 1:
        t = 'MON';
        break;
      case 2:
        t = 'TUE';
        break;
      case 3:
        t = 'WED';
        break;
      case 4:
        t = 'THU';
        break;
      case 5:
        t = 'FRI';
        break;
      case 6:
        t = 'SAT';
        break;
      default:
        break;
    }
    return t;
  };

  const getDateFromUTC = function (ms) {
    const d = new Date(ms * 1000);
    return `${getWeekDay(d.getDay())} ${d.getDate()}.${d.getMonth() + 1}.`;
  };

  return (
    <div className="mini-weather-card">
      <p className="mini-date">{getDateFromUTC(weather.dt)}</p>
      <p className="mini-temp">{weather.temp.day.toFixed(1)}°C</p>
      <img
        className="mini-icon"
        src={getIcon(weather.weather[0].icon)}
        alt=""
      />
    </div>
  );
};

export default MiniWeatherCard;
