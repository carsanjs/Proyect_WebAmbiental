import "./style.css";
// import {formatDate} from "@/components/functions/Convert";
import CardProps from "@/app/validation/Interface/Cards/Cards";
import {formatFechaCards} from "@/components/functions/Convert"

export default function CardsP({ showData, weather, forecast }: CardProps) {
  let url = "";
  let iconUrl = "";

  let iconUrl3 = "";
  let iconUrl6 = "";
  let iconUrl9 = "";

  let forecastDate3 = "";
  let forecastDate6 = "";
  let forecastDate9 = "";

  if (showData) {
    url = "https://openweathermap.org/img/w/";
    iconUrl = url + weather?.weather[0].icon + ".png";

    iconUrl3 = url + forecast.list[1].weather[0].icon + ".png";
    iconUrl6 = url + forecast.list[2].weather[0].icon + ".png";
    iconUrl9 = url + forecast.list[3].weather[0].icon + ".png";
    // iconUrl9 = url + forecast.list[9].weather[0].icon + ".png";
    // iconUrl9 = url + forecast.list[10].weather[0].icon + ".png";
    // iconUrl9 = url + forecast.list[11].weather[0].icon + ".png";
    // iconUrl9 = url + forecast.list[13].weather[0].icon + ".png";
    // iconUrl9 = url + forecast.list[50].weather[0].icon + ".png";
    console.log(iconUrl9)

    forecastDate3 =
      // dia
      forecast.list[1].dt_txt.substring(8, 10) +
      "/" +
      // mes
      forecast.list[1].dt_txt.substring(5, 7) +
      "/" +
      //año
      forecast.list[1].dt_txt.substring(0, 4) +
      " " +
      // dias precipitados
      forecast.list[1].dt_txt.substring(11, 13);
    console.log(forecastDate3)

    forecastDate6 =
      forecast.list[2].dt_txt.substring(8, 10) +
      "/" +
      forecast.list[2].dt_txt.substring(5, 7) +
      "/" +
      forecast.list[2].dt_txt.substring(0, 4) +
      " " +
      forecast.list[2].dt_txt.substring(11, 13);
    forecastDate9 =
      forecast.list[3].dt_txt.substring(8, 10) +
      "/" +
      forecast.list[3].dt_txt.substring(5, 7) +
      "/" +
      forecast.list[3].dt_txt.substring(0, 4) +
      " " +
      forecast.list[3].dt_txt.substring(11, 13);
  }
  return (
    <>
      <li className="active">
        <i className="day-icon">
          <img src={iconUrl3} alt="icon" />
        </i>
        <span className="day-name">{formatFechaCards(forecastDate3)}h</span>
        <span className="day-name">{forecast.list[1].weather[0].description}</span>
        <span className="day-temp">{(forecast.list[1].main.temp - 273.15).toFixed(1)}ºC</span>
      </li>

      <li className="active">
        <i className="day-icon">
          <img src={iconUrl6} alt="icon" />
        </i>
        <span className="day-name">{formatFechaCards(forecastDate6)}h</span>
        <span className="day-name">{forecast.list[2].weather[0].description}</span>
        <span className="day-temp">
          {(forecast.list[2].main.temp - 273.15).toFixed(1)}ºC
        </span>
      </li>

      <li className="active">
        <i className="day-icon">
          <img src={iconUrl9} alt="icon" />
        </i>
        <span className="day-name">{formatFechaCards(forecastDate9)}h</span>
        <span className="day-name">{forecast.list[3].weather[0].description}</span>
        <span className="day-temp">
          {(forecast.list[3].main.temp - 273.15).toFixed(1)}ºC
        </span>
      </li>
    </>
  );
}

// <div className="col">
// <p>{forecastDate3}h</p>
// <p className="description">
//   <img src={iconUrl3} alt="icon" />
//   {forecast.list[1].weather[0].description}
// </p>
// <p className="temp">
//   {(forecast.list[1].main.temp - 273.15).toFixed(1)}ºC
// </p>
// </div>
// <div className="col">
// <p>{forecastDate6}h</p>
// <p className="description">
//   <img src={iconUrl6} alt="icon" />
//   {forecast.list[2].weather[0].description}
// </p>
// <p className="temp">
//   {(forecast.list[2].main.temp - 273.15).toFixed(1)}ºC
// </p>
// </div>
// <div className="col">
// <p>{forecastDate9}h</p>
// <p className="description">
//   <img src={iconUrl9} alt="icon" />
//   {forecast.list[3].weather[0].description}
// </p>
// <p className="temp">
//   {(forecast.list[3].main.temp - 273.15).toFixed(1)}ºC
// </p>
// </div>
