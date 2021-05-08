import React, { useState, useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

import mapPin from '../img/stable/map-pin.svg';
const Navbar = () => {
  const [term, setTerm] = useState('');
  const { updateWeather, location } = useContext(WeatherContext);

  const searchLocation = e => {
    e.preventDefault();
    updateWeather(term);
  };
  return (
    <div className="navbar">
      <h1 className="logo">WEATHERTON</h1>
      <div>
        <p className="location">
          <img className="map-pin" src={mapPin} alt="geopin" />
          {location}
        </p>
        <form onSubmit={searchLocation} className="form">
          <input
            type="text"
            required
            placeholder="search for a location"
            className="form-input"
            onChange={e => setTerm(e.target.value)}
          />
          <input className="form-btn" type="submit" value="search" />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
