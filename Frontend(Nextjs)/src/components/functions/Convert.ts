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
  const names = fullName.split(" "); // Dividir el nombre completo en partes por los espacios
  const firstName = names[0]; // Obtener el primer nombre
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
