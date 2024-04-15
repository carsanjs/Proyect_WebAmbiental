export interface ForecastData {
    list: {
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: {
        description: string;
        icon: string;
      }[];
    }[];
  }


export interface WeatherData {
    name: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather:  [
      {
        "id": 500,
        "main":"Rain",
        "description": "light rain",
        "icon": "10n"
      }
      ],
  }
  
  
export default interface CardProps {
    loadingData: boolean;
    showData: boolean;
    weather: WeatherData;
    forecast: ForecastData;
  }
