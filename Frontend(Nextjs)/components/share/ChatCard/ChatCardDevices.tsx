import { useState, useEffect, useMemo, useCallback } from "react";
import axiosInstance, { fetchDevices } from "@/services/axios";
import "./stylesAll.css";
import GetDevicesRegister from "../../../src/app/validation/Interface/Device";
import { formatDate } from "@/components/functions/Convert";
import Ellipsis from "../../ui/Button/ButtonEllipsis/ButtonEllipsis";

const ChatCardDevices = () => {
  const [devices, setDevices] = useState<GetDevicesRegister[]>([]);
  console.log(devices);
  const [roomNumberMap, setRoomNumberMap] = useState<{ [key: string]: number }>(
    {}
  );
  console.log(roomNumberMap);

  const fetchDevicesData = async () =>{
      try {
        const devicedata = await fetchDevices();
        if (devicedata) {
          setDevices(devicedata);
          console.log(devicedata);
        }
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/device/get`
        );
        const devicesData = response.data;
        setDevices(devicesData);
        console.log(devicesData);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
  }

  const fetchRoomNumbers = async()=>{
      try {
        for (const device of devices) {
          const response = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/detail/${device.room_Assignment}`
          );
          const roomNumber = response.data?.number_lroom;
          console.log(roomNumber);
          return setRoomNumberMap((prevMap) => ({
            ...prevMap,
            [device.room_Assignment]: roomNumber,
          }));
        }
      } catch (error) {
        console.error("Error fetching room numbers:", error);
      }
  }

    useEffect(() => {
      fetchDevicesData();
    }, []);
    
    useEffect(() => {
      if (devices.length > 0) {
        fetchRoomNumbers();
      }
    }, [devices]);

  // useEffect(() => {
  
  //   fetchDevicesData();
  //   if (devices.length > 0) {
  //     fetchRoomNumbers();
  //   }
  // }, []);

  return (
    <div className="col-span-12 overflow-x-auto rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex justify-around">
        <h4 className="px-7.5 text-xl font-semibold text-black dark:text-white">
          Dispositivos Registrados
        </h4>
        <Ellipsis to="/dashboard/admin/device/detail" />
      </div>
      <div>
        {devices.length === 0 ? (
          <span className="cero-device text-sm px-7.5 dark:text-gray-400">
            No hay dispositivos registrados
          </span>
        ) : (
          <>
            {devices.map((device, index) => (
              <div
                key={index}
                className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
              >
                <div className="relative h-14 w-14 rounded-full flex items-center justify-center">
                  <span
                    className={`absolute h-3.5 w-3.5 rounded-full border-2 text-white ${
                      device.is_active ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="text-left font-medium text-black dark:text-white">
                      {roomNumberMap[device.room_Assignment] < 99
                        ? "Area asignada. "
                        : "Salon asignado. "}
                      &#8594;
                      <span className="text-sm text-black dark:text-white">
                        {roomNumberMap[device.room_Assignment]}
                      </span>
                    </h5>
                    <p>
                      <span className="text-sm text-black dark:text-white">
                        {device.name_device}
                      </span>
                      <span className="text-xs text-black">
                        . {formatDate(device.created_at)}
                      </span>
                    </p>
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-medium text-white">
                      {device.amount_sensors}
                    </span>
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

export default ChatCardDevices;
