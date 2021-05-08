import React, { useContext } from 'react';

import { WeatherContext } from './contexts/WeatherContext';

import MiniWeatherCard from './components/MiniWeatherCard';
import Navbar from './components/Navbar';
import WeatherCard from './components/WeatherCard';
import './index.css';
import Spinner from './components/Spinner';

function App() {
  const { weather, getIcon } = useContext(WeatherContext);

  if (typeof weather === 'string') {
    return (
      <div className="app">
        <div className="error-ui">
          <p className="error-text">{weather}</p>
        </div>
      </div>
    );
  }
  if (weather === null) {
    return <Spinner />;
  }

  const weatherToday = weather.current;
  const weatherTomorrow = weather.daily[1];

  return (
    <div className="app">
      <Navbar />
      <div className="card-wrapper">
        <WeatherCard weather={weatherToday} day="now" getIcon={getIcon} />
        <WeatherCard
          weather={weatherTomorrow}
          day="tomorrow"
          getIcon={getIcon}
        />
      </div>
      <div className="week-forecast">
        <MiniWeatherCard weather={weather.daily[2]} getIcon={getIcon} />
        <MiniWeatherCard weather={weather.daily[3]} getIcon={getIcon} />
        <MiniWeatherCard weather={weather.daily[4]} getIcon={getIcon} />
        <MiniWeatherCard weather={weather.daily[5]} getIcon={getIcon} />
        <MiniWeatherCard weather={weather.daily[6]} getIcon={getIcon} />
      </div>
    </div>
  );
}

export default App;
