import React from "react";
import Spinner from "../Spinner/Spinner";
import { useState, useEffect } from "react";
import "./card.css";
import { BsFillGeoAltFill } from "react-icons/bs";
import {
  obtenerDiaSemana,
  obtenerDiaMesYMes,
  obtenerHora,
} from "@/components/functions/getFecha";

import CardProps from "@/app/validation/Interface/Cards/Cards";
import CardsP from "../CardsPrecipatacion/CardsP";

const Card: React.FC<CardProps> = ({
  loadingData,
  showData,
  weather,
  forecast,
}) => {
  const dia: string = obtenerDiaSemana();
  const semana: string = obtenerDiaMesYMes();
  const [hora, setHora] = useState(obtenerHora());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHora(obtenerHora());
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  let url = "https://openweathermap.org/img/w/";
  let iconUrl = url + weather?.weather[0].icon + ".png";

  if (loadingData) {
    return <Spinner />;
  }

  return (
    <div className="flex mx-auto bg-dark text-light relative justify-center justify-items-center h-5/6 contacolor">
      {showData === true ? (
        <>
          <div className="flex-1 cont-date-title w-full _infimgg">
            <div className="on-z">
              <div className="conte-flex1">
                <h3 className="card-title">{weather.name}</h3>
                <i className="icons-bsf">
                  <BsFillGeoAltFill className="bsfillgeoaltfill" />
                </i>
              </div>

              <div className="text-left">
                <span className="card-date">
                  {dia} - {semana}
                </span>
              </div>
              <div className="text-left">
                <span className="card-date">{hora}</span>
              </div>
            </div>

            <div className="on-zz">
              <div className="flex h-3/6">
                <div className="flex-1">
                  {" "}
                  <h1 className="card-temp">
                    {(weather.main.temp - 273.15).toFixed(1)}ºC
                  </h1>
                </div>

                <div className="flex-1">
                  <p className="card-desc">
                    <img src={iconUrl} alt="icon" />
                    <span className="descripiconurl">
                      {weather.weather[0].description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full dwgrid">
            <div className="py-5">
              <div className="flex">
                <h5 className="flex-1 card-text">Temperatura máxima: </h5>
                <span className="flex-1 card-text-value">
                  {" "}
                  {(weather.main.temp_max - 273.15).toFixed(1)} ºC
                </span>
              </div>
              <div className="flex">
                <h5 className="flex-1 card-text">Temperatura mínima: </h5>
                <span className="flex-1 card-text-value">
                  {" "}
                  {(weather.main.temp_min - 273.15).toFixed(1)} ºC
                </span>
              </div>
              <div className="flex">
                <h5 className="flex-1 card-text">sensación térmica:</h5>
                <span className="flex-1 card-text-value">
                  {(weather.main.feels_like - 273.15).toFixed(1)} ºC
                </span>
              </div>
              <div className="flex">
                <h5 className="flex-1 card-text">Humedad:</h5>
                <span className="flex-1 card-text-value">
                  {weather.main.humidity} %
                </span>
              </div>
              <div className="flex">
                <h5 className="flex-1 card-text">Velocidad del viento:</h5>
                <span className="flex-1 card-text-value">
                  {weather.wind.speed} m/s
                </span>
              </div>
            </div>
            <div>
              <hr className="py-2" />
            </div>
            <div className="ctl">
              <ul className="week-list">
                <CardsP
                  loadingData={loadingData}
                  forecast={forecast}
                  showData={showData}
                  weather={weather}
                />
              </ul>
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-light">Sin datos</h2>
      )}
    </div>
  );
};
export default Card;
