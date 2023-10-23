import { useEffect, useState } from "react";
import { Autocomplete, Container, TextField } from '@mui/material'
import CurrentWeather from './CurrentWeather.jsx';
import Forecast from "./Forecast.jsx";
import { GEO_API_URL } from '../api.js';

const Search = () => {
  const [cities, setCities] = useState([]);
  const [citySelected, setCitySelected] = useState('')
  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const citiesResponse = await fetch(GEO_API_URL);
        if (citiesResponse.ok) {
          const citiesData = await citiesResponse?.json();
          const cities = citiesData?.geonames;
          const citiesInfo = cities.map(({ adminName1, toponymName, lat, lng }) => {
            return {
              label: adminName1,
              capital: toponymName,
              latitud: lat,
              longitud: lng
            }
          }).sort((a, b) => {
            const nameA = a.label;
            const nameB = b.label;
            if(nameA < nameB) {
              return -1
            }
            if(nameA > nameB) {
              return 1;
            }
            return 0;
          });
          setCities(citiesInfo);
        }
        else {
          console.error('Error to get data')
        }
      } catch (error) {

      }
    }
    fetchCitiesData()

  }, []);


  return (
    <>
      {cities &&
        <Autocomplete
          id="country-select-demo"
          maxWidth="md"
          options={cities}
          autoHighlight
          renderInput={(params) => (
            <TextField {...params} label="Choose a city" variant="outlined" />
          )}
          value={citySelected}
          onChange={(ev, newValue) => setCitySelected(newValue)}
        />}
      {citySelected &&
        <Container maxWidth="md">
          <CurrentWeather city={citySelected} />
          <Forecast city={citySelected} />
        </Container>
      }

    </>
  )


}

export default Search;