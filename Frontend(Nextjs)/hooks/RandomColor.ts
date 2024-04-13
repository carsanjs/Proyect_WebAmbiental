function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
export default function getRandomLightColor() {
    let color;
    do {
      color = getRandomColor();
      // Convertimos el color hexadecimal a RGB
      const rgb = parseInt(color.substring(1), 16);
      // Extraemos los componentes RGB
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >>  8) & 0xff;
      const b = (rgb >>  0) & 0xff;
      // Calculamos la luminosidad según la fórmula de W3C
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // Si la luminosidad es menor que 0.5, el color es oscuro
      // Así que continuamos generando colores hasta obtener uno claro
      if (luminance < 0.5) continue;
      // Si no, terminamos el bucle
      break;
    } while (true);
    return color;
  }
  