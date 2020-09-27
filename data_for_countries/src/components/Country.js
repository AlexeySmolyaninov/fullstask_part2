import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherInfo = ({weatherInfo}) => {
  return(
    <div id="weather-info">
      <h3>{weatherInfo.location.name}</h3>
      <p><b>temperature:</b> {weatherInfo.current.temperature} Celcius</p>
      {weatherInfo.current.weather_icons.map((icon,idx) => 
        <img key={icon} src={icon} alt="showing weather"></img>)
      }
      <p><b>wind:</b> {weatherInfo.current.wind_speed} mph direction {weatherInfo.current.wind_dir}</p>
    </div>
  )
}

const GeneralInfo = ({country}) => (
  <>
  <h2>{country.name}</h2>
  <p>capital {country.capital}</p>
  <p>population {country.population}</p>
  <h3>languages</h3>
  <ul>
    {country.languages.map(langObj =>
      <li key={langObj.iso639_1}>{langObj.name}</li>)
    }
  </ul>
  <img src={country.flag} alt={`pictures of ${country.name}`}></img>
  </>
)

const Country = ({country}) => {
  const [weatherInfo, setWeatherInfo] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY

  const uriCountry = country.name.replace(' ', '%20')
  
  useEffect(()=> {
    const URLcurrentCountryWeather = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${uriCountry}`
    axios
      .get(URLcurrentCountryWeather)
      .then(response => setWeatherInfo(response.data))
      .catch(() => console.log('could not retrieve the weather data'))
  }, [])

  return(
    <div id="country-info">
      <GeneralInfo country={country} />

      

      {
        JSON.stringify(weatherInfo) !== JSON.stringify({}) &&
          <WeatherInfo weatherInfo={weatherInfo} />
        
      }
      
    </div>
  )
}

export default Country