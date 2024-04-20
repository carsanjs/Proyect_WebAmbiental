import { useState, useEffect } from "react";
import GetSensorsRegister from "../../../src/app/validation/Interface/Sensors";
import axiosInstance, {fetchSensors} from "@/services/axios";
import "./stylesAll.css";
import { formatDate } from "@/components/functions/Convert";

const ChatCardSensors = () => {
  const [sensors, setSensors] = useState<GetSensorsRegister[]>([]);
  const [deviceNameMap, setDeviceNameMap] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchSensorsData = async () => {
      let sensordata = await fetchSensors();
      if (sensordata){
        setSensors(sensordata);
      }
      
    };

    const fetchDeviceName = async () => {
      try {
        for (const sensor of sensors) {
          const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/device/detail/${sensor.device_id}`
          );
          const deviceName = response.data.name_device;
          console.log(deviceName);
          console.log(response.data);
          setDeviceNameMap((prevMap) => ({
            ...prevMap,
            [sensor.device_id]: deviceName,
          }));
        }
      } catch (error) {
        console.error("Error fetching room numbers:", error);
      }
    };
    if (sensors.length > 0) {
      fetchDeviceName();
    }
    fetchSensorsData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Sensores Registrados
      </h4>
      <div>
        {sensors.length === 0 ? (
          <span className="cero-device text-sm px-7.5 dark:text-gray-400">
            No hay sensores registrados
          </span>
        ) : (
          <>
            {sensors.map((sensor, index) => (
              <div
                key={index}
                className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
              >
                <div className="relative h-14 w-14 rounded-full flex items-center justify-center">
                  <span
                    className={`absolute h-3.5 w-3.5 rounded-full border-2 text-white ${
                      sensor.is_active ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="text-left font-medium text-black dark:text-white">
                      Dispositivo asignado. &#8594;{" "}
                      <span>{deviceNameMap[sensor.device_id]}</span>
                    </h5>
                    <p>
                      <span className="text-sm text-black dark:text-white">
                        {sensor.name_sensor}
                      </span>
                      <span className="text-xs text-black">
                        {" "}
                        .{formatDate(sensor.create_at)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatCardSensors;
