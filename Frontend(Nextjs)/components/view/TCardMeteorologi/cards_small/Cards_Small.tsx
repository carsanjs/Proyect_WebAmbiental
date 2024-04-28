
import "./tooltip.css";
import { BsFillInfoCircleFill } from "react-icons/bs";
import redondearNumero from "@/components/functions/RedondearNumber";
import { obtenerClaseDeEstilo } from "./UmbralesMedicion/umbrales";
import { MEDICIONES } from "./UmbralesMedicion/mediciones";
import { TooltipTitle } from "./Tooltip/Tooltip";
import { sensorComponentes } from "./TableUmbral/ContentUmbral";


interface CardsSmallProps {
  id_sensor: string;
  data: { [key: string]: any };
}
const CardsSmall: React.FC<CardsSmallProps> = ({ id_sensor, data }) => {
  return (
    <section className="cards">
      <article className="cardsmall card--1">
        <div className="card__info">
          <div className="c10001">
            {data && Object.entries(data).length > 0 ? (
              <>
                {Object.entries(data).map(([key, value]) =>
                  key !== "mensaje" && key !== "indice" ? (
                    <tbody className="flex justify-between">
                      <tr className="pr-0.5">
                        <td className="card__author dark:card__author">
                          {key}:
                        </td>
                        <td
                          className={`font-bold ${obtenerClaseDeEstilo(
                            key,
                            value
                          )}`}
                        >
                          {typeof value === "number"
                            ? redondearNumero(value, 2)
                            : value}
                        </td>
                        <td className="__spatgd dark:text-black">
                          {MEDICIONES[key] || ""}
                        </td>
                      </tr>
                      <tr>
                        <td className="_spatgd dark:text-black">
                          {data.indice}
                        </td>
                      </tr>
                    </tbody>
                  ) : null
                )}
                <tbody className="flex justify-start">
                  <tr className="flex justify-end">
                    <td className="_spatgd_ dark:text-black">{data.mensaje}</td>
                    <td className="max-md:hidden">
                    {sensorComponentes.map(({ id, componente }) => (
                        id === id_sensor && (
                          <TooltipTitle
                            key={id}
                            tooltip={[{ id, component: componente }]}
                          >
                            <BsFillInfoCircleFill className="icon-tooltip" />
                          </TooltipTitle>
                        )
                      ))}
                      {/* {
                        <TooltipTitle
                          tooltip={[
                            {
                              id: id_sensor,
                              component: <CO />,
                            },
                          ]}
                        >
                          <BsFillInfoCircleFill className="icon-tooltip" />
                        </TooltipTitle>
                      } */}
                    </td>
                  </tr>
                </tbody>
              </>
            ) : (
              <div>Nah</div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
export default CardsSmall;
