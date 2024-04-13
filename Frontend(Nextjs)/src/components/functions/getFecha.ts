// Función para obtener el día de la semana
export function obtenerDiaSemana(): string {
    const diasSemana: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const f: Date = new Date();
    return diasSemana[f.getDay()];
  }
  
  // Función para obtener el día del mes y el mes
  export function obtenerDiaMesYMes(): string {
    const meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const f: Date = new Date();
    return f.getDate() + " de " + meses[f.getMonth()];
  }
  
  // Función para obtener la hora actual
  export function obtenerHora(): string {
    const f: Date = new Date();
    const hora: string = f.getHours().toString().padStart(2, '0');
    const minuto: string = f.getMinutes().toString().padStart(2, '0');
    const segundo: string = f.getSeconds().toString().padStart(2, '0');
    return hora + ":" + minuto + ":" + segundo;
  }
  