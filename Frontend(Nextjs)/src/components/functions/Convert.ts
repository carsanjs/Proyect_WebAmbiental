
export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", options);
}

export function formatName(fullName: string) {
  const names = fullName.split(" "); // se Divide el nombre completo en partes por los espacios
  const firstName = names[0]; // Obtiene el primer nombre
  const middleInitial = names.length > 1 ? `${names[1].charAt(0)}.` : ""; // Obtener la inicial del segundo nombre si existe
  return `${firstName} ${middleInitial}`; // Retornar el primer nombre seguido de la inicial del segundo nombre (si existe)
}

export function formatCarrera(carrera: string) {
  const words = carrera.split(" "); // Dividir la carrera en palabras
  const abbreviatedCarrera = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalizar la primera letra de la primera palabra
    } else {
      return word.charAt(0).toLowerCase(); // Obtener solo la primera letra de las palabras restantes
    }
  });
  return abbreviatedCarrera.join(" "); // Unir las palabras abreviadas en una cadena nuevamente
}

export const formatFechaCards = (fechaString:string) => {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const partesFechaHora = fechaString.split(' '); // Dividir la cadena de fecha y hora
  const partesFecha = partesFechaHora[0].split('/'); // Dividir la cadena de fecha por "/"
  const dia = parseInt(partesFecha[0], 10); // Obtener el día como entero
  const mes = parseInt(partesFecha[1], 10) - 1; // Obtener el mes como entero (restamos 1 porque los meses en JavaScript van de 0 a 11)
  const anio = parseInt(partesFecha[2], 10); // Obtener el año como entero
  const fecha = new Date(anio, mes, dia); // Crear un objeto Date con el día, mes y año
  const diaSemana = diasSemana[fecha.getDay()]; // Obtener el día de la semana
  const hora = partesFechaHora[1]; // Obtener la hora
  return `${diaSemana} ${hora}`;
};