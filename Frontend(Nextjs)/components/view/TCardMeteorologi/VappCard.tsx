import "./Style.css";
import getRandomLightColor from "../../../hooks/RandomColor";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardsSmall from "./cards_small/Cards_Small";
import ButtonRR from "../../ui/Button/ButtonesCard/ButtonReload&Right";
import {
  obtenerDiaSemana,
  obtenerDiaMesYMes,
  obtenerHora,
} from "@/components/functions/getFecha";
import axiosInstance from "@/services/axios";
import GetDevicesRegister from "../../../src/app/validation/Interface/Device";
import Sensor from "../../../src/app/validation/Interface/Sensors";
import Classroom from "../../../src/app/validation/Interface/Clasrroom";

function VappCard() {
  interface CustomArrowProps {
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }

  const dia: string = obtenerDiaSemana();
  const semana: string = obtenerDiaMesYMes();
  const [hora, setHora] = useState(obtenerHora());
  const [roomColors, setRoomColors] = useState<string[]>([]);

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [roomNumberMap, setRoomNumberMap] = useState<Classroom[]>([]);
  const [devices, setDevices] = useState<GetDevicesRegister[]>([]);

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [swipeEnabled, setSwipeEnabled] = useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHora(obtenerHora());
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axiosInstance.get<Sensor[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/getitems/`
        );
        const devicemap = req.data;
        setSensors(devicemap);
        // Obtener los dispositivos asociados a los sensores
        const deviceIds = devicemap.map((sensor) => sensor.device_id);
        const deviceResponses = await Promise.all(
          deviceIds.map((deviceId) =>
            axiosInstance.get<GetDevicesRegister>(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/device/detail/${deviceId}`
            )
          )
        );
        const devicesData = deviceResponses.map((response) => response.data);
        setDevices(devicesData);
        console.log(devicesData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos del sensor:", error);
        setLoading(true);
      }
    };

    const fetchRoomNumbers = async () => {
      try {
        const response = await axiosInstance.get<Classroom[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/get/`
        );
        setRoomNumberMap(response.data);
        const colors = response.data.map(() => getRandomLightColor());
        setRoomColors(colors);
      } catch (error) {
        console.error("Error fetching room numbers:", error);
        setLoading(true);
      }
    };

    fetchRoomNumbers();
    const intervalId = setInterval(fetchData, 1000); // Actualiza cada 5 segundos
    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  const onSwipe = (direction: string) => {
    console.log(`You swiped: ${direction}`);
    // Implementa la lógica adicional según sea necesario
  };

  const onCardLeftScreen = (name: string, direction: string) => {
    console.log(`${name} left the screen in ${direction} direction`);

    // Volvemos a agregar la tarjeta al final de la cola
    setSensors((prevCards) => [...prevCards, prevCards.shift()]);

    // Incrementamos el índice de la tarjeta actual
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
    // Habilitamos el deslizamiento en la nueva tarjeta
    setSwipeEnabled(true);
  };
  const handlePassButtonClick = () => {
    try {
      const sensor = sensors[currentCardIndex];
      if (sensor) {
        // Simular un deslizamiento a la derecha
        onSwipe("right");
        onCardLeftScreen(sensors[currentCardIndex].name, "right");
        setSensors((prevSensors) => prevSensors.slice(1));
        setCurrentCardIndex((prevCard) => (prevCard + 1) % sensors.length);
        console.log("deslizando hacia la derecha");
      }
    } catch (error) {
      console.error("Error al manejar la tarjeta:", error);
    }
  };
  const handleReloadButtonClick = () => {
    try {
      // Clonamos la matriz de sensores
      const updatedSensors = [...sensors];
      // Actualizamos los datos del sensor actual
      updatedSensors[currentCardIndex] = {
        ...updatedSensors[currentCardIndex] /* Nuevos datos */,
      };
      // Actualizamos el estado con la nueva matriz de sensores
      setSensors(updatedSensors);
      console.log(updatedSensors);
      console.log("Recargando");
    } catch (error) {
      console.error("Error al manejar la recarga:", error);
    }
  };

  const swipeHandlers = swipeEnabled
    ? {
        onSwipe: (dir: string) => onSwipe(dir),
        onCardLeftScreen: (dir: string) =>
          onCardLeftScreen(sensors[currentCardIndex].name, dir),
        preventSwipe: ["up", "down"],
      }
    : {
        preventSwipe: [],
      };
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        <>
          {roomNumberMap.map((roomNumber, index) => {
            const roomSensors = sensors.filter((sensor) =>
              devices.some((device) => {
                const deviceMatch = sensor &&
                  device.id_device === sensor.device_id &&
                  device.room_Assignment === roomNumber.id_lroom;
                return deviceMatch;
              })
            );

            const mainSensor = roomSensors.length > 0 ? roomSensors[0] : null;
            console.log(mainSensor);
            console.log("Room sensors for room", roomNumber.number_lroom);
            // Obtener el sensor principal

            return (
              <TinderCard
                className="swipe"
                key={roomNumber.id_lroom}
                {...swipeHandlers}
                style={{
                  display: index === currentCardIndex ? "block" : "none",
                }}
              >
                <div
                  className={`card room-${roomNumber.number_lroom} space-fbox`}
                  style={{ backgroundColor: roomColors[index] }}
                >
                  <div className="flex _infgps">
                    <div className="flex-1 div_lroom">
                      <div className="_dh3" key={index}>
                        <div className="grid grid-flow-col justify-between pl-1 _ts">
                          <p className="textroom">Salon: </p><p className="textroom">{roomNumber.number_lroom}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex-1 div_date">
                        <h1 className="font-bold dark:text-white">{dia}</h1>
                      </div>
                      <div className="_dblok">
                        <span className="font-bold dark:text-white">{semana}</span>
                        <span className="font-bold text- text-left dark:text-white">{hora}</span>
                      </div>
                    </div>
                  </div>

                  <>
                    {roomSensors.length > 0 ? (
                      roomSensors.map((sensor, index) => (
                        // onClick={() => handleCardSmallClick(sensor)}
                        <div className="box" key={index}>
                          <CardsSmall
                            is_active={sensor.is_active}
                            name_sensor={sensor.name_sensor}
                            data={sensor.data}
                          />
                          <CardsSmall
                            is_active={sensor.is_active}
                            name_sensor={sensor.name_sensor}
                            data={sensor.data}
                          />
                          <CardsSmall
                            is_active={sensor.is_active}
                            name_sensor={sensor.name_sensor}
                            data={sensor.data}
                          />
                          <CardsSmall
                            is_active={sensor.is_active}
                            name_sensor={sensor.name_sensor}
                            data={sensor.data}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="box">Nah</div>
                    )}
                  </>

                  {mainSensor ? (
                    <div className="_inf-d-s">
                      {devices.map((Device, index) =>(
                        <div className="_dinf-t">
                        <div className="flex _dc-t">
                          <div className="flex-1">
                            <p className="textdevice">{Device.name_device}</p>
                          </div>
                          <div className="flex-1">
                            <span className={`status ${Device.is_active? "status-on": "status-off"}`}>
                              {Device.is_active ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                        </div>
                        <div className="text-left ">
                          {Device.description}
                        </div>
                      </div>
                      ))}
                      <div className="table w-full ...">
                        {/* <div className="table-header-group ...">
                          {mainSensor.data &&
                          Object.entries(mainSensor.data).length > 0 ? (
                            Object.entries(devices).map(
                              ([key, value]) =>
                                key !== "sensor_id" && (
                                  <div className="table-row-group">
                                    <div className="table-row" key={key}>
                                      <div className="table-cell ...">
                                        <h1 className="_tg">{key}</h1>
                                      </div>
                                      <div className="table-cell ...">
                                        <span className="_spatg">{value}</span>
                                      </div>
                                    </div>
                                  </div>
                                )
                            )
                          ) : (
                            <div className="table-row">
                              <div className="table-cell ...">Nah</div>
                            </div>
                          )}
                        </div> */}
                      </div>
                    </div>
                  ) : (
                    <div className="_inf-d-s">Nah</div>
                  )}

                  <div className="_cbtns">
                    <div className="_dcdow">
                      <ButtonRR
                        onClick={handleReloadButtonClick}
                        svg={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            className="reload-icon"
                          >
                            <path d="M2.5 2v6h6"></path>
                            <path d="M21.5 22v-6h-6"></path>
                            <path d="M22 11.5A10 10 0 0 0 3.2 7.2"></path>
                            <path d="M2 12.5a10 10 0 0 0 18.8 4.2"></path>
                          </svg>
                        }
                      />
                    </div>
                    <div className="_dcplay">
                      <ButtonRR
                        onClick={handlePassButtonClick}
                        svg={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                          >
                            <path d="M5 12h13M12 5l7 7-7 7" />
                          </svg>
                        }
                      />
                    </div>
                  </div>
                </div>
              </TinderCard>
            );
          })}
        </>
      </div>
    </div>
  );
}

export default VappCard;