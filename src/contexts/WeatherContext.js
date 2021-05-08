import React, { createContext, useState, useEffect } from 'react';

//All of the icons
import sunnyIcon from '../img/conditions/01d.svg';
import sunCloudIcon from '../img/conditions/02d.svg';
import cloudIcon from '../img/conditions/03d.svg';
import scatteredCloudsIcon from '../img/conditions/04d.svg';
import rainIcon from '../img/conditions/09d.svg';
import lightRainIcon from '../img/conditions/10d.svg';
import thunderIcon from '../img/conditions/11d.svg';
import snowIcon from '../img/conditions/13d.svg';
import fogIcon from '../img/conditions/50d.svg';

export const WeatherContext = createContext();

const WeatherContextProvider = props => {
  // setting up state to be used as a context where needed
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('Brno');

  //function updating weather location with default parameter of "Brno"
  const updateWeather = async (city = 'Brno') => {
    setWeather(null);

    //At first fetching geolocation data from google geolocation API
    try {
      const geoResponse = await fetch(
        // securing API key via Netlify
        `/.netlify/functions/fetch-location?locationName=${city}`
      );
      const geoData = await geoResponse.json();
      //destructuring coordinates from response data
      setLocation(`${geoData.results[0].formatted_address}`);
      const { lat, lng } = geoData.results[0].geometry.location;

      //Second api call to get weather data for selected location
      // using lat and lng  (Openweather map API)
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=d2e712f8cad6afc490b3c549997bd424
        `
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (err) {
      setWeather(`Something went wrong! 💥💥💥
      ERROR MESSAGE: ${err.message}`);
    }
  };

  // useEffect which runs only when the page first loads
  useEffect(() => {
    updateWeather();
  }, []);
  // function deciding which icon to show in a component
  const getIcon = weatherIcon => {
    let icon = weatherIcon.split('');
    icon[2] = 'd';
    icon = icon.join('');

    switch (icon) {
      case '01d':
        return sunnyIcon;
      case '02d':
        return sunCloudIcon;
      case '03d':
        return scatteredCloudsIcon;
      case '04d':
        return cloudIcon;
      case '09d':
        return rainIcon;
      case '10d':
        return lightRainIcon;
      case '11d':
        return thunderIcon;
      case '13d':
        return snowIcon;
      case '50d':
        return fogIcon;
      default:
        break;
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weather, location, updateWeather, getIcon }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
