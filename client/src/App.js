import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';


export const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY
export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY


function App() {

  const [currentWeather, setCurrenWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&lang=sp&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&lang=sp&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setCurrenWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="container">
      <div className="content-wrap">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
      <div className="footer">
        <hr/>
        <p>Matias Emmanuel Demarchi</p>
        <p>2023</p>
      </div>
    </div>
  );
}

export default App;
