import "./style.css";
import redondearNumero from "@/components/functions/RedondearNumber"
export interface Sensor {
  id_sensor: string;
  name_sensor: string;
  device_id: string;
  description: string;
}

interface CardsSmallProps {
  is_active: boolean;
  name_sensor: string;
  data: { [key: string]: any };
  // onClick: (sensor: Omit<Sensor, 'id_sensor' | 'description'>) => void;
}

const CardsSmall: React.FC<CardsSmallProps> = ({
  name_sensor,
  is_active,
  data,
}) => {
  // const handleClick = () => {
  //   onClick({ name_sensor: name_sensor, is_active: true, device_id: 'mockDeviceId', data: data });
  // };

  return (
    <section className="cards">
      <article className="cardsmall card--1 ">
        <div className="card__info">
          <div className="flex px-2">
            <span className="flex-1 w-20 card__category dark:text-black">Sensor</span>
            <span className={`flex-initial absolute h-3 w-3 rounded-full border-2 text-white ${is_active ? "bg-green-500" : "bg-red-500"}`}></span>
            <strong className="flex-1 w-25 card__title dark:text-black">{name_sensor}</strong>
          </div>

          <table className="table w-full">
            {data && Object.entries(data).length > 0 ? (
              Object.entries(data).map(
                ([key, value]) =>
                  key !== "sensor_id" && (
                    <tbody className="grid grid-flow-col justify-between" key={key}>
                      <tr className="">
                        <td className="card__author dark:card__author">{key}</td>
                      </tr>
                      <tr className="">
                        <td className="_spatgd dark:text-black">{redondearNumero(value,2)}</td>
                      </tr>
                    </tbody>
                  )
              )
            ) : (
              <div>Nah</div>
            )}
          </table>
        </div>
      </article>
    </section>
  );
};
export default CardsSmall;

{
  /* <>
{data && Object.entries(data).length > 0 ? (
  Object.entries(data).map(([key, value]) => (
    key !== "sensor_id" && (
      <div key={key}>
        <span className="card__author">{key}</span> {value}
      </div>
    )
  ))
) : (
  <div>Nah</div>
)}
</> */
}

{
  /* <div className="table w-full ...">
  <div className="table-header-group ...">
    {data && Object.entries(data).length > 0 ? (
      Object.entries(data).map(
        ([key, value]) =>
          key !== "sensor_id" && (
            <div className="table-row-group" key={key}>
              <div className="table-row">
                <div className="table-cell ...">
                  <h1 className="card__author">{key}</h1>
                </div>s
                <div className="table-cell ...">
                  <span className="_spatgd">{value}</span>
                </div>
              </div>
            </div>
          )
      )
    ) : (
      <div>Nah</div>
    )}
  </div>
</div>; */
}
