// import "./style.css"

export const obtenerClaseDeEstilo = (sensor: string, valor: any): string => {
  switch (sensor) {
    case "Temperatura":
      if (valor < 10) {
        return "blue-dark";
      } else if (valor >= 10 && valor < 20) {
        return "blue-light";
      } else if (valor >= 20 && valor < 30) {
        return "green-light";
      } else if (valor >= 30 && valor < 37) {
        return "yellow-dark";
      } else {
        return "red";
      }
    case "Humedad":
      if (valor < 10) {
        return "red";
      } else if (valor >= 10 && valor < 20) {
        return "orange";
      } else if (valor >= 20 && valor < 30) {
        return "yellow-light";
      } else if (valor >= 30 && valor <= 37) {
        return "blue-light";
      } else {
        return "blue-dark";
      }
    case "Luminosidad":
      if (valor < 20) {
        return "blue-dark";
      } else if (valor >= 20 && valor < 40) {
        return "blue-light";
      } else if (valor >= 40 && valor < 60) {
        return "green-light";
      } else if (valor >= 60 && valor < 80) {
        return "orange-light";
      } else if (valor >= 80 && valor <= 100) {
        return "yellow-dark";
      }
    
    case "CO":
      if (valor >=20 && valor <200) {
          return "green-light";
      } else if (valor >=200 && valor <400) {
          return "yellow-lightD";
      } else if (valor >=400 && valor <700) {
          return "yellow-dark";
      } else if (valor >=700 && valor <1100) {
          return "orange-light";
      }else if (valor >=1100 && valor <1600) {
          return "orange-dark";
      }
      else if (valor >=1600 && valor <=2000) {
          return "red-dark";
      }
    case "CO2":
      if (valor >= 350 && valor < 1600) {
        return "green-light";
      } else if (valor >= 1600 && valor < 3100) {
        return "yellow-light";
      } else if (valor >= 3100 && valor < 4600) {
        return "orange-light";
      } else if (valor >= 4600 && valor < 7600) {
        return "orange-dark";
      } else if (valor >= 7600 && valor <= 1000) {
        return "red-dark";
      } 

    case "Calidad del aire":
      if (valor >=0 && valor <60) {
        return "green-light";
      } else if (valor >=60 && valor <120) {
        return "green-dark";
      } else if (valor >=120 && valor <160) {
        return "yellow-dark";
      } else if (valor >=160 && valor <210) {
        return "orange-light";
      }else if (valor >=210 && valor <310) {
        return "orange-dark";
      }
      else if (valor >=310 && valor <=1000) {
        return "red-dark";
      }
    case "Precipitación":
      if (valor === 0) {
        return "blue-light";
      } else if (valor === 1) {
        return "yellow-light";
      }
    case "Radiación UV":
      if (valor >=0 && valor <2.9) {
        return "green-light";
      } else if (valor >=3.0 && valor <5.9) {
        return "yellow-dark";
      } else if (valor >=6.0 && valor <7.9) {
        return "orange-light";
      } else if (valor >=8.0 && valor <10.9) {
        return "red";
      }else if (valor >= 11) {
        return "pink";
      }

    default:
      return "";
  }
};
