"use client";
import { useState } from "react";
import Breadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import ChatCard from "../../../../../components/share/ChatCard/ChatCardClasrroom";
import axios from "axios";
import axiosInstance from "../../../../services/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../../../components/ui/Button/ButtonXs/ButtonX";
import Header from "../../../../../components/share/Header/HeaderCabezera";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clasRroom } from "@/app/validation/schemas/clasrroom_Schema";
import "../../../../../components/ui/Theme/style.css";

type Inputs = {
  name_lroom: string;
  number_lroom: string;
};

export default function Classroom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(clasRroom),
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classroom, setClassrooms] = useState<Inputs[]>([]);
  const HandleClassroomRegister = async (formData: Inputs) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/livingroom/add`,
        {
          name_lroom: formData.name_lroom,
          number_lroom: formData.number_lroom,
        }
      );
      const newLroom: Inputs = response.data;
      setClassrooms(prevGetLroom => [...prevGetLroom, newLroom]);
      toast.success("¡Registro exitoso!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
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
        <Breadcrumb pageName="Salones" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 h-full">
          <div className="flex flex-col gap-9">
            {/* <!-- Clasrroom Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Registrar un salon
                </h3>
              </div>
             <div>
             <form onSubmit={handleSubmit(HandleClassroomRegister)}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="text-left mb-2.5 block text-black dark:text-white">
                        Nombre del salon
                      </label>
                      <input
                        type="text"
                        {...register("name_lroom")}
                        placeholder="Name classroom"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.name_lroom ? "input-error w-full py-3 px-5 outline-none transition" : ""
                        }`}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="text-left mb-2.5 block text-black dark:text-white">
                        Numero del salon
                      </label>
                      <input
                        {...register("number_lroom")}
                        type="text"
                        placeholder="Size device"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                          errors.number_lroom ? "input-error w-full py-3 px-5 outline-none transition" : ""
                        } `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {errors.name_lroom?.message && (
                      <span className="text-center text-red-400 text-[14px]">
                        {errors.name_lroom?.message}
                      </span>
                    )}
                    {errors.number_lroom?.message && (
                      <span className="text-red-400 text-[14px] text-center">
                        {errors.number_lroom?.message}
                      </span>
                    )}
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
          </div>

          <div className="flex flex-col gap-9">
            <ChatCard />
          </div>
        </div>
      </div>
    </>
  );
}
