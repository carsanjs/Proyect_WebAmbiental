import "./style.css";
import "./tooltip.css";
import redondearNumero from "@/components/functions/RedondearNumber";
import { obtenerClaseDeEstilo } from "./umbrales";
import { MEDICIONES } from "./mediciones";
// export interface Sensor {
//   id_sensor: string;
//   name_sensor: string;
//   device_id: string;
//   description: string;
// }

interface CardsSmallProps {
  id_sensor: string;
  data: { [key: string]: any };
  // onClick: (sensor: Omit<Sensor, 'id_sensor' | 'description'>) => void;
}
// interface Umbral {
//   temperatura: number;
//   humedad: number;
//   Uv: number;
//   CO2: number;
//   CO:number;
// }
// function obtenerColorFondo({temperatura,Uv, CO2, CO}:Umbral) {
//   // Lógica para determinar el color de fondo basado en los valores de los sensores
//   // Puedes ajustar esta lógica según tus necesidades
//   if (temperatura > 30  || Uv > 10 || CO2 > 1000 || CO > 50) {
//     return "#FF6347"; // Rojo si alguno de los valores está por encima del umbral
//   } else {
//     return "#00FF7F"; // Verde si todos los valores están por debajo del umbral
//   }
// }

const CardsSmall: React.FC<CardsSmallProps> = ({ id_sensor, data }) => {
  return (
    <section className="cards">
      <article className="cardsmall card--1">
        <div className="card__info">
          {/* <div className="flex px-2">
            <span className="flex-1 w-20 card__category dark:text-black">Sensor</span>
            <span className={`flex-initial absolute h-3 w-3 rounded-full border-2 text-white ${is_active ? "bg-green-500" : "bg-red-500"}`}></span>
            <strong className="flex-1 w-25 card__title dark:text-black">{name_sensor}</strong>
          </div> */}

          <div className="c10001">
            {data && Object.entries(data).length > 0 ? (
              <>
              
                {Object.entries(data).map(([key, value]) =>
                
                  key !== "mensaje" && key !== "indice" ? (
                    <tbody className="flex justify-between" >
                    <tr className="pr-0.5">
                      <td className="card__author dark:card__author">{key}:</td>
                      <td className={`_spatgd dark:text-black ${obtenerClaseDeEstilo(key, value)}`}>
                        {typeof value === "number"
                          ? redondearNumero(value, 2)
                          : value}
                      </td>
                      <td className="_spatgd dark:text-black">
                        {MEDICIONES[key] || ""}
                      </td>     
                    </tr>
                    <tr>
                    <td className="_spatgd dark:text-black">{data.indice}</td>
                    </tr>
                    </tbody>
                  ) : null
               
              
            )}
              <tbody className="flex justify-start">
              <tr>
                  <td className="_spatgd dark:text-black">{data.mensaje}</td>
                </tr>
                </tbody>
              </>
            ) : (
              <div>Nah</div>
            )}
            {/* {data && Object.entries(data).length > 0 ? (
              Object.entries(data).map(([key, value]) =>
                  key !== "sensor_id" && (
                    <tbody className="grid grid-flow-col start" key={id_sensor}>
                      <tr className="">
                        <td className="card__author dark:card__author">{key}</td>
                      </tr>
                      <tr className="">
                        <td className="_spatgd dark:text-black">
                        {typeof value === 'number' ? redondearNumero(value, 2) : value}
                          </td>
                      </tr>
                    </tbody>
                  )
              )
            ) : (
              <div>Nah</div>
            )} */}
          </div>

          {/* <table className="table w-full"> */}
          {/* {data && Object.entries(data).length > 0 ? (
              Object.entries(data).map(([key, value]) =>
                  key !== "sensor_id" && (
                    <tbody className="grid grid-flow-col justify-between" key={id_sensor}>
                      <tr className="">
                        <td className="card__author dark:card__author">{key}</td>
                      </tr>
                      <tr className="">
                        <td className="_spatgd dark:text-black">
                        {typeof value === 'number' ? redondearNumero(value, 2) : value}
                          </td>
                      </tr>
                    </tbody>
                  )
              )
            ) : (
              <div>Nah</div>
            )} */}
          {/* </table> */}
        </div>
      </article>
    </section>
  );
};
export default CardsSmall;
