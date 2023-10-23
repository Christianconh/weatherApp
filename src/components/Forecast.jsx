import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { WEATHER_API_KEY, WEATHER_API_URL } from '../api'
import CardForecast from './CardForecast.jsx';

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null)
  useEffect(() => {
    const fetchForecastData = async () => {
      const cityToFetch = city.label;
      try {
        const forecastResponse = await fetch(`${WEATHER_API_URL}forecast?q=${cityToFetch},US&appid=${WEATHER_API_KEY}&units=metric`);
        if (forecastResponse.ok) {
          const forecastData = await forecastResponse?.json();
          const dataList = forecastData?.list.filter((item) => {
            const date = new Date(item.dt * 1000);
            return date.getUTCHours() === 12;
          });
          const dailyForecast = dataList.map(item => {
            return {
              date: item.dt_txt,
              tempMax: item.main.temp_max,
              tempMin: item.main.temp_min,
              icon: item.weather[0].icon,
              description: item.weather[0].description
            }
          })
          setForecastData(dailyForecast);
        } else {
          console.error('Error to get data')
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchForecastData();
  }, [city]);

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{mt:2}}
        gutterBottom>
        Daily Forecast
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 16 }}>
        {forecastData && forecastData.map((item, index) => {
          return (
            <CardForecast data={item} key={index} />
          )
        })}
      </div>
    </>
  )
}

export default Forecast;