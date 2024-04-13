'use client'
import "./Fregistro.css";
import { useState, useEffect } from "react";
import Button from "../ui/Button/ButtonXs/ButtonX";
import { useRouter } from "next/navigation";
import axios from "axios";
import { mappedCarreraStatus } from "@/app/validation/schemas/user_Schema";
import FormSingup from "../../components/sckeletos/FormSingup"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Singup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    carrera: '',
    passw:''
  });

  const carrerStatusOption = Object.entries(mappedCarreraStatus).map(
    ([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    )
  );
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateUsername = () => {
    const { nombre, correo, carrera } = formData;
    const day = new Date().getDate();
    const username = `${nombre.slice(0, 4)}${correo.split('@')[0].slice(0, 3)}${carrera.slice(0, 3)}${day}`;
    return username
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timeout);
  },[])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user_name = generateUsername();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register/`,
        {   
          user_name,
          nombre: formData.nombre,
          correo: formData.correo,
          carrera: formData.carrera,
          passw: formData.passw
        }
      );
      toast.success("¡Registro exitoso!" + response.data);
      event.target.removeEventListener;
      router.push("/auth/signin");
      return response.data;
    } catch (error) {
  if (axios.isAxiosError(error)) {
    const axiosError = error;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data.detail;
      // muestra los mensajes de error
      toast.error("Error: " + errorMessage);
      // console.log(axiosError.response.data);
    } else if (axiosError.request) {
      // Si no hay respuesta del servidor, muestra un mensaje genérico de error de conexión
      toast.error(
        "Error de conexión. Por favor, inténtelo de nuevo más tarde."
      );
    } else {
      // Si ocurre un error en la configuración de la solicitud o durante la transformación de la respuesta
      toast.error("Error interno en la solicitud.");
    }
  } else {
    // Si el error no es de tipo AxiosError
    toast.error("Error desconocido.");
  }
  return "Error";
}
  };
  return (
    <>
    
        <div className="flex min-h-screen flex-col p-3" id="content-register">
      <div className="mx-auto mt-10 grid h-fit w-[95%] max-w-[1450px] grid-cols-1 overflow-y-hidden lg:grid-cols-1 lg:gap-5">
        <section className="relative">
          <div className="z-1 mx-auto w-[95%] max-w-[1450px]">
            <div className="cont-line flex justify-center item-center">
            {isLoading? (<FormSingup/>) : 
            (                 <div className="content">
      <div className="login-wrappe flex justify-center items-center">
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            autoComplete="off"
            max={18}
            min={3}
            name="nombre"
            value={formData.nombre}
            id="name"
            className="input"
            placeholder="Nombre"
            required
            onChange={handleChange}
            // {...register("nombre")}
          />
          <div>
            {" "}
            {/* {errors.nombre?.message && (
      <span className="text-red-500">{errors.nombre?.message}</span>
    )} */}
          </div>
        </div>
        <div className="form-item">
          
          <input
            type="email"
            autoComplete="off"
            min={5}
            max={40}
            name="correo"
            id="correo"
            value={formData.correo}
            onChange={handleChange}
            className="input"
            placeholder="Correo Electronico"
            required
            // {...register("correo")}
          />
          <div>
            {" "}
            {/* {errors.correo?.message && (
      <span className="text-red-500">{errors.correo?.message}</span>
    )} */}
          </div>
        </div>

        <div className="form-item">
          <div className="tn ul">
            <select
              id="carrera"
              required
              value={formData.carrera}
              name="carrera"
              aria-label="carrera"
              className="input"
              onChange={handleChange}
              // {...register("carrera")}
            >
              <option value="0" >Selecciona una carrera</option>
              {carrerStatusOption}
            </select>
            <div>
              {" "}
              {/* {errors.carrera?.message && (
        <span className="text-red-500">
          {errors.carrera?.message}
        </span>
      )} */}
            </div>
          </div>
        </div>
        <div className="form-item ">
          <input
            type="password"
            autoComplete="off"
            min={4}
            max={20}
            id="passw"
            required
            onChange={handleChange}
            value={formData.passw}
            name="passw"
            className="input"
            placeholder="Constraseña"
            // {...register("passw")}
          />
          <div>
            {" "}
            {/* {errors.passw?.message && (
      <span className="text-red-500">{errors.passw?.message}</span>
    )} */}
          </div>
        </div>

        <div className="form-item flex justify-center items-center">
          {/* <ButtonAuth></ButtonAuth> */}
          <Button
            className="btnA"
            type="submit"
            title="Registrarse"
          />
        </div>
      </form>

      <div className="form-item _dcp relative">
        <p className="_letrasp">
          Al registrarte, aceptas los{" "}
          <a href="" className="_Reftc">
            Términos de servicio
          </a>{" "}
          y la{" "}
          <a href="" className="_Reftc">
            Política de privacidad
          </a>
          , incluida la política de{" "}
          <a href="" className="_Reftc">
            Uso de Cookies
          </a>
          .
        </p>
      </div>
    </div>   )
    }
            </div>
          </div>
        </section>
      </div>
    </div>

    </>
  );
}
