export default function redondearNumero(numero: number, decimales: number): number {
    const numeroRedondeado = Math.round(numero * Math.pow(10, decimales)) / Math.pow(10, decimales)
    return numeroRedondeado 
}
