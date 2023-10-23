import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {WEATHER_API_KEY, WEATHER_API_URL} from '../api'
import AirIcon from '@mui/icons-material/Air';

const CurrentWeather = ({city}) => {
  const iconBaseUrl = 'https://openweathermap.org/img/wn/';
  const [weather, setWeather] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);
  const airQuailityState = {
    1: "Good",
    2: "Fair", 
    3: "Moderate", 
    4: "Poor", 
    5: "Very Poor"
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const cityToFetch = city.label;
      try { 
        const weatherResponse = await fetch(`${WEATHER_API_URL}weather?q=${cityToFetch},US&appid=${WEATHER_API_KEY}&units=metric`);
        const airPollutionResponse = await fetch(`${WEATHER_API_URL}air_pollution?lat=${city.latitud}&lon=${city.longitud}&appid=${WEATHER_API_KEY}`)
        setLoading(true);
        Promise.all([weatherResponse, airPollutionResponse])
          .then( async(response) => {
            const weatherData = await response[0]?.json();
            const airPollutionData = await response[1]?.json();
            setAirPollutionData(airPollutionData?.list[0]?.main?.aqi);
            setWeather(weatherData);
            setLoading(false);
          })
          .catch(error => console.error(error))
      } catch (error) {
        console.error(error)
      }
    }
    fetchWeatherData()

  }, [city]);

  return(
    <>
     {weather &&  
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gap: 2,
          textAlign: "center",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          maxWidth: 250,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <Typography variant="h4" >
          {city.label}, {city.capital}
        </Typography>
        <Box
          component="img"
          alt={weather.weather[0].description}
          src={`${iconBaseUrl}${weather.weather[0].icon}@2x.png`}
          sx={{margin: "0 auto"}}
        />
        <Typography variant="h5" component="h3">
          {Math.round(weather.main.temp)} °C
        </Typography>
        <Typography variant="h6" component="h4">
          {weather.weather[0].main}
        </Typography>
        <Typography variant="h6" component="h3">
         <AirIcon/> Air quality:<br/>{airQuailityState[airPollutionData]}
        </Typography>
      </Box>
       }
    </>
  )
}

export default CurrentWeather;