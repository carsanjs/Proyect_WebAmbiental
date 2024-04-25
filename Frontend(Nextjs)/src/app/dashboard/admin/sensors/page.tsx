"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import ChatCard from "../../../../../components/share/ChatCard/ChatCardSensors";
import Button from "../../../../../components/ui/Button/ButtonXs/ButtonX";
import axios from "axios";
import axiosInstance from "@/services/axios";
import { toast } from "react-toastify";
import Header from "../../../../../components/share/Header/HeaderCabezera";
import { SensorsSchema } from "../../../validation/schemas/sensor_Schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputs from "../../../validation/Interface/Sensors";
import GetDevicesSensor from "../../../validation/Interface/Device";
import GetSensorsRegister from "../../../validation/Interface/Device";

export default function Sensors() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [devices, setDevices] = useState<GetDevicesSensor[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(SensorsSchema),
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/device/get`
        );
        setDevices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };
    fetchDevices();
  }, []);

  const HandleSensors = async (formData: Inputs) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sensors/preadd/${formData.device_id}`,
        {
          name_sensor: formData.name_sensor,
          description: formData.description,
          size: formData.size,
        }
      );
      const newSensor: GetSensorsRegister = response.data;
      setDevices((prevGetSensorsRegisters) => [...prevGetSensorsRegisters,newSensor,]);
      toast.success("¡Registro exitoso!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        console.log(axiosError);
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          console.log(errorMessage);
          toast.error("Error: " + errorMessage);
          reset();
        } else if (axiosError.request) {
          toast.error(
            "Error de conexión. Por favor, inténtelo de nuevo más tarde."
          );
        } else {
          toast.error("Error interno en la solicitud.");
        }
      } else {
        toast.error("Error desconocido.");
      }
      return error;
    }
  };

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="mx-auto max-w-screen-2xl h-screen md:p-2 2xl:p-0">
        <Breadcrumb pageName="Sensores" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 h-full">
          <div className="flex flex-col gap-9">
            {/* <!-- Sensors Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Registrar un Sensor
                </h3>
              </div>
              <form  onSubmit={handleSubmit(HandleSensors)}>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="text-left mb-2.5 block text-black dark:text-white">
                      Dispositivos Disponibles
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select 
                        {...register("device_id")}
                      className={`${errors.device_id} ? "relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"`}>
                        <option selected value="select">
                          Selecciona un dispositivo
                        </option>
                        { devices.map((device) => (
                            <option 
                            key={device.id_device} 
                            value={device.id_device}>
                              {device.name_device}
                            </option>
                          ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col">
                    {errors.device_id?.message && (
                      <span className="text-center text-red-400 text-[14px]">
                        {errors.device_id?.message}
                      </span>
                    )}
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Nombre del sensor
                      </label>
                      <input
                       {...register("name_sensor")}
                        type="text"
                        placeholder="Name device"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.name_sensor ? "input-error w-full py-3 px-5 outline-none transition" : ""
                        }`}
                      />
                      
<div className="flex flex-col">
                    {errors.name_sensor?.message && (
                      <span className="text-center text-red-400 text-[14px]">
                        {errors.name_sensor?.message}
                      </span>
                    )}
                    </div>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Tamaño
                      </label>
                      <input
                        {...register("size")}
                        type="text"
                        placeholder="Size device"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.size ? "input-error w-full py-3 px-5 outline-none transition" : ""
                        }`}
                      />

<div className="flex flex-col">
                    {errors.size?.message && (
                      <span className="text-center text-red-400 text-[14px]">
                        {errors.size?.message}
                      </span>
                    )}
                    </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="text-left mb-2.5 block text-black dark:text-white">
                      Descripción
                    </label>
                    <textarea
                      rows={4}
                      {...register("description")}
                      placeholder="Type your description sensor here..."
                      className={`text-left w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        errors.description ? "input-error w-full py-3 px-5 outline-none transition" : ""
                      }`}
                    />
                    <div className="flex flex-col">
                    {errors.description?.message && (
                      <span className="text-center text-red-400 text-[14px]">
                        {errors.description?.message}
                      </span>
                    )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btnA"
                    title="Registrar"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            <ChatCard />
          </div>
        </div>
      </div>
    </>
  );
}
