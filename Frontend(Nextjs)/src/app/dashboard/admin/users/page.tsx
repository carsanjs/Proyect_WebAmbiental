"use client";
import "../../../../../components/ui/Theme/style.css"
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import ChatCard from "../../../../../components/share/ChatCard/ChatCardStudent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/services/axios";
import axios from "axios";
import Button from "../../../../../components/ui/Button/ButtonXs/ButtonX";
import Header from "../../../../../components/share/Header/HeaderCabezera";
import Inputs from "@/app/validation/Interface/Studen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {userRegisterAdmin,mappedCarreraStatus } from "../../../validation/schemas/userRegisterAdmin_Schema";
import { useRouter } from "next/navigation";

export default function Users() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [user, setUser] = useState<Inputs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(userRegisterAdmin),
  });
 
  const carrerStatusOption = Object.entries(mappedCarreraStatus).map(
    ([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    )
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleRegister = async (formData: Inputs) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register/`,
        {
          user_name: formData.user_name,
          nombre: formData.nombre,
          correo: formData.correo,
          carrera: formData.carrera,
          passw: formData.passw,
        }
      );
      const newUser: Inputs = response.data;
      setUser(prevGetUser => [...prevGetUser, newUser]);
      toast.success("¡Registro exitoso!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          toast.error("Error: " + errorMessage);
          reset
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
      return "Error";
    }
  };
  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full mx-auto max-w-screen-2xl h-screen md:p-2 2xl:p-0">
        <Breadcrumb pageName="Estudiantes" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 h-full">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Registrar Estudiante
                </h3>
              </div>
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="p-6.5">
                  <div className="mb-5.5">
                    <label className="mb-2.5 block text-black dark:text-white text-left">
                      Nombre de usuario
                    </label>
                    <input
                      required
                      type="text"
                      {...register("user_name")}
                      autoComplete="off"
                      placeholder="type Username"
                      className={`${errors.user_name?.message ?"input-error w-full": ""} w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white text-left">
                      Nombre
                    </label>
                    <input
                      required
                      type="text"
                      autoComplete="off"
                      {...register("nombre")}
                      placeholder="Enter your full name"
                      className={`${errors.nombre?.message ?"input-error w-full": ""} w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white text-left">
                      Email
                    </label>
                    <input
                      {...register("correo")}
                      type="email"
                      autoComplete="off"
                      placeholder="Enter your email address"
                      className={`${errors.correo?.message ?"input-error w-full": ""} w-full text-left rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                  </div>
                  <div className="mb-4.5">
                    <select
                      id="carrera"
                      required
                      aria-label="carrera"
                      className={`${errors.carrera?.message ? "input-error w-full":""} w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                      {...register("carrera")}
                    >
                      <option value="null">Selecciona una carrera</option>
                      {carrerStatusOption}
                    </select>
                    <div>
                      {errors.carrera?.message && (
                        <span className="text-red-500 text-sm">
                          {errors.carrera?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white text-left">
                      Password
                    </label>
                    <input
                      required
                      {...register("passw")}
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter password"
                      className={`${errors.passw?.message ?"input-error w-full": ""} w-full text-left rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
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
