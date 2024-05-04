import "./Style.css";
import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { CircularQueue } from "@/components/functions/ColaCircular";
import CardsSmall from "./cards_small/Cards_Small";
import ButtonRR from "../../ui/Button/ButtonesCard/ButtonReload&Right";
import Form_FilterLroom from "../../view/PanelWeather/Form/FormFIlterLroom/Form_FilterLroom";
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
  const [queue, setRoomQueue] = useState<CircularQueue<string>>(
    new CircularQueue<string>(100)
  );
  const dia: string = obtenerDiaSemana();
  const semana: string = obtenerDiaMesYMes();
  const [hora, setHora] = useState(obtenerHora());
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [roomNumberMap, setRoomNumberMap] = useState<Classroom[]>([]);
  console.log(roomNumberMap);
  const [devices, setDevices] = useState<GetDevicesRegister[]>([]);

  const [filterlroom, setFilterlroom] = useState<Classroom[]>([]);
  console.log(filterlroom);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHora(obtenerHora());
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchRoomNumbers = async () => {
    try {
      const response = await axiosInstance.get<Classroom[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/get/`
      );
      setRoomNumberMap(response.data);
      response.data.forEach((room) => {
        queue.enqueue(room.id_lroom);
      });
    } catch (error) {
      console.error("Error fetching room numbers:", error);
      setLoading(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchDataFromAPI = async () => {
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
            const devicesData = deviceResponses.map(
              (response) => response.data
            );
            setDevices(devicesData);
            console.log(devicesData);
            setLoading(false);
          } catch (error) {
            console.error("Error al obtener datos del sensor:", error);
            setLoading(true);
          }
        };

        await fetchDataFromAPI();
        // Realiza la petición cada 2 segundos
        const intervalId = setInterval(fetchDataFromAPI, 2000);
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
    fetchRoomNumbers();
  }, []);

  const onSwipe = (direction: string, IdToDelete: string) => {
    if (IdToDelete) {
      queue.enqueue(IdToDelete);
    }
  };

  const onCardLeftScreen = async (id_lroom_: string, index: number) => {
    setRoomNumberMap((prevCards) =>
      prevCards.filter((room) => room.id_lroom !== id_lroom_)
    );
    setRoomNumberMap((prevCards) => {
      queue.enqueue(id_lroom_);
      if (prevCards.length === 0) {
        fetchRoomNumbers();
      }
      return prevCards;
    });
  };
  const reloadCards = () => {
    fetchRoomNumbers();
  };
  return (
    <div className="tinderCards h-screen">
      <div className="tinderCards__cardContainer h-screen">
        {roomNumberMap.map((roomNumber, index) => {
          const roomSensors = sensors.filter((sensor) =>
            devices.some((device) => {
              const deviceMatch =
                sensor &&
                device.id_device === sensor.device_id &&
                device.room_Assignment === roomNumber.id_lroom;
              return deviceMatch;
            })
          );
          return (
            <TinderCard
              flickOnSwipe={true}
              className="swipe pressable no-select"
              key={roomNumber.id_lroom}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => onSwipe(dir, roomNumber.id_lroom)}
              onCardLeftScreen={() =>
                onCardLeftScreen(roomNumber.id_lroom, index)
              }
            >
              <div
                className={`card-vapp room-${roomNumber.number_lroom} space-fbox`}
              >
                <div className="flex _infgps sm:flex justify-between">
                  <div
                    key={index}
                    className="_ts justify-between pl-1 md:block"
                  >
                    <div className="flex">
                      <p className="textroom">
                        {roomNumber.number_lroom < 99 ? "Area: " : "Salon: "}
                      </p>
                      <p className="textroom-write">
                        {roomNumber.number_lroom}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold dark:text-white">
                        {roomNumber.name_lroom}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 divconten-filter">
                    <Form_FilterLroom onFilterSubmit={setFilterlroom} />
                  </div>
                  <div className="">
                    <div className="flex-1 div_date">
                      <h1 className="font-bold dark:text-white">{dia}</h1>
                    </div>
                    <div className="_dblok">
                      <span className="font-bold dark:text-white">
                        {semana}
                      </span>
                      <span className="font-bold text-left dark:text-white">
                        {hora}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="box">
                  {roomSensors.length > 0 ? (
                    roomSensors.map((sensor, index) => (
                      <CardsSmall
                        key={sensor.id_sensor}
                        id_sensor={sensor.id_sensor}
                        data={sensor.data}
                      />
                    ))
                  ) : (
                    <div className="box">Nah</div>
                  )}
                </div>
                <div className="_inf-d-s"></div>
                <div className="_cbtns">
                  <div className="_dcdow">
                    <ButtonRR
                      onClick={reloadCards}
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
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
                      onClick={() =>
                        onCardLeftScreen(roomNumber.id_lroom, index)
                      }
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
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

        {filterlroom.map((roomNumber, index) => {
           if (!roomNumber) return null;
          const roomSensors = sensors.filter((sensor) =>
            devices.some((device) => {
              const deviceMatch =
                sensor &&
                device.id_device === sensor.device_id &&
                device.room_Assignment === roomNumber.id_lroom;
              return deviceMatch;
            })
          );
          return (
            <TinderCard
              flickOnSwipe={true}
              className="swipe pressable no-select"
              key={roomNumber.id_lroom}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => onSwipe(dir, roomNumber.id_lroom)}
              onCardLeftScreen={() =>
                onCardLeftScreen(roomNumber.id_lroom, index)
              }
            >
              <div
                className={`card-vapp room-${roomNumber.number_lroom} space-fbox`}
              >
                <div className="flex _infgps sm:flex justify-between">
                  <div
                    key={index}
                    className="_ts flex-1 justify-between pl-1 md:block"
                  >
                     <div className="flex">
                      <p className="textroom">
                        {roomNumber.number_lroom < 99 ? "Area: " : "Salon: "}
                      </p>
                      <p className="textroom-write">
                        {roomNumber.number_lroom}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold dark:text-white">
                        {roomNumber.name_lroom}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 divconten-filter">
                    <Form_FilterLroom onFilterSubmit={setFilterlroom} />
                  </div>
                  <div className="">
                    <div className="flex-1 div_date">
                      <h1 className="font-bold dark:text-white">{dia}</h1>
                    </div>
                    <div className="_dblok">
                      <span className="font-bold dark:text-white">
                        {semana}
                      </span>
                      <span className="font-bold text- text-left dark:text-white">
                        {hora}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="box">
                  {roomSensors.length > 0 ? (
                    roomSensors.map((sensor, index) => (
                      <CardsSmall
                        key={sensor.id_sensor}
                        id_sensor={sensor.id_sensor}
                        data={sensor.data}
                      />
                    ))
                  ) : (
                    <div className="box">Nah</div>
                  )}
                </div>
                <div className="_inf-d-s"></div>
                <div className="_cbtns">
                  <div className="_dcdow">
                    <ButtonRR
                      onClick={reloadCards}
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
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
                      onClick={() =>
                        onCardLeftScreen(roomNumber.id_lroom, index)
                      }
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
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
      </div>
    </div>
  );
}
export default VappCard;
