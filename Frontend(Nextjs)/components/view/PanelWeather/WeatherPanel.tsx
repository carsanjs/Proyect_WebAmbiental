import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import axios from 'axios';
import {WeatherData,ForecastData} from "@/app/validation/Interface/Cards/Cards"

interface WeatherPanelProps {
  city: string;
}

const WeatherPanel: React.FC<WeatherPanelProps> = ({ city }) => {
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cdacbacca12c37a4db9b686b65a5b1e1&lang=es`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=cdacbacca12c37a4db9b686b65a5b1e1&lang=es`;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => { 
    setLoading(true);

    try {
    const responseWeather = await axios.get(urlWeather);
    const dataWeather = responseWeather.data;
    setWeather(dataWeather);

    const responseForecast = await axios.get(urlForecast);
    const dataForecast = responseForecast.data;
    setForecast(dataForecast);
   
   setShow(true);
    } catch (error) {
    console.error('Error al obtener datos:', error);
    } finally {
    setLoading(false);
    }
    };
   
   fetchData();
   }, [city]);

  return (
    <React.Fragment>
      {weather && forecast && 
      <Card loadingData={loading} showData={show} weather={weather} forecast={forecast} />}
      </React.Fragment>
  );
};

export default WeatherPanel;
