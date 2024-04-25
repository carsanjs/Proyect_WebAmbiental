export const obtenerClaseDeEstilo = (sensor: string, valor: any): string => {
  switch (sensor) {
    case "Temperatura":
      if (valor < 10) {
        return "blue-dark";
      } else if (valor >= 10 && valor < 20) {
        return "blue-light";
      } else if (valor >= 20 && valor < 30) {
        return "yellow-light";
      } else if (valor >= 30 && valor < 37) {
        return "orange";
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
      } else if (valor >= 60 && valor <= 80) {
        return "yellow-light";
      } else {
        return "yellow-dark";
      }

      // const int rangoligero = 20; //20
      // const int rangosin = 200;
      // const int rangomasin = 400;
      // const int rangomasmasin = 700;
      // const int rangosinfuer = 1100;
      // const int rangosinpel = 1600;
      // //const int rangosinfat = 2000;
    case "CO":
      if (valor > 20 && valor <200) {
        return "green-light";
      } else if (valor >= 200 && valor < 400) {
        return "yellow-light";
      } else if (valor >= 400 && valor < 700) {
        return "orange-light";
      } else if (valor >= 700 && valor <= 1100) {
        return "orange";
      }else if (valor >= 1100 && valor <= 1600) {
        return "red";
      } else {
        return "red-dark";
      }

//       const int rangoindice = 350; //350
// const int rango2 = 1600;
// const int rango3 = 3100;
// const int rango4 = 4600;
// const int rango5 = 7600;
// const int rango6 = 1000;

    case "CO2":
      if (valor < 20) {
        return "blue-dark";
      } else if (valor >= 20 && valor < 40) {
        return "blue-light";
      } else if (valor >= 40 && valor < 60) {
        return "green-light";
      } else if (valor >= 60 && valor <= 80) {
        return "yellow";
      } else {
        return "yellow-dark";
      }

    case "CO":
      if (valor < 30) {
        return "blue";
      } else if (valor < 60) {
        return "green";
      } else if (valor < 80) {
        return "orange";
      } else {
        return "red";
      }
    case "Calidad del aire":
      if (valor < 30) {
        return "blue";
      } else if (valor < 60) {
        return "green";
      } else if (valor < 80) {
        return "orange";
      } else {
        return "red";
      }
    case "Precipitación":
      if (valor < 30) {
        return "blue";
      } else if (valor < 60) {
        return "green";
      } else if (valor < 80) {
        return "orange";
      } else {
        return "red";
      }
    case "Radiación UV":
      if (valor < 30) {
        return "blue";
      } else if (valor < 60) {
        return "green";
      } else if (valor < 80) {
        return "orange";
      } else {
        return "red";
      }

    default:
      return "";
  }
};
