import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({
  countryName,
  capital,
  area,
  languages,
  flag,
  alt,
  lat,
  lng,
  api_key
}) => {
  const countryDetailsStyles = {
    margin: '0px',
    padding: '0px'
  }

  const [weather, setWeather] = useState([])

  useEffect(() => {
    console.log('fetching weather info...')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
        console.log('weather info succesfully fetched')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('weather =', weather)
  console.log('weather length = ', weather.length)

  return (
    <div style={countryDetailsStyles}>
      <h1 className="countryDetails">{countryName}</h1>
      <p style={countryDetailsStyles}>capital {capital}</p>
      <p style={countryDetailsStyles}>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={alt}></img>
      <h2>Weather in {capital}</h2>
      {weather.length !== 0 ? (
        <div>
          <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={'Icon of the current weather condition'}></img>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        console.log('weather data not jet fetched')
      )}
    </div>
  )
}

export default CountryDetails
