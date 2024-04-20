"use client";
import "./style.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../ui/Button/ButtonXs/ButtonX";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSingup from "../../components/sckeletos/FormSingup";
import {FormValues} from "../../src/app/validation/Interface/Form/Form"

export default function Signin() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    const { username, password } = values;
    try {
      await login({ username, password });
      if (user) {
        // Redirige al usuario después de iniciar sesión según su rol
        if (user.rol === "admin") {
          router.push("/dashboard/admin");
        } else if (user.rol === "user") {
          router.push("/dashboard/user");
        }else{
          console.log("error")
        }
      }
    } catch (error) {
      toast.error("Login failed" + errors);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (isAuthenticated && user) {
      if (user.rol === "admin") {
        router.push("/dashboard/admin");
      } else if (user.rol === "user") {
        router.push("/dashboard/user");
      }
    }
    return () => clearTimeout(timeout);
  }, [isAuthenticated, user]);

  return (
    <div className="div-centr-skelet">
      {isLoading ? (
        <FormSingup />
      ) : (
        <div className="login-box _lbPg">
          <div className="login-wrappe flex justify-center items-center"></div>
          <form className="email-login" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="u-form-group">
                <input
                  id="email"
                  autoComplete="username"
                  title="Campo Obligatorio"
                  max={40}
                  min={4}
                  {...register("username", {
                    required: "este campo es obligatorio",
                  })}
                  className="ipt"
                  type="email"
                  placeholder="Correo Electronico"
                />
              </div>
              <div className="u-form-group">
                <input
                  id="password"
                  title="Campo Obligatorio"
                  max={30}
                  min={4}
                  {...register("password", {
                    required: "este campo es obligatorio",
                  })}
                  className="ipt"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <div className="u-form-group">
              <Button
                size="large"
                className="btnA"
                title="Iniciar Sesión"
                type="submit"
              ></Button>
            </div>
            <div className="u-form-group">
              <a href="#" className="forgot-password">
                ¿Olvidaste tu Contraseña?
              </a>
            </div>
            <div className="u-form-group-lb">
              <div className="lb-header" />
            </div>
          </form>
          <div className="u-form-group">
            <div className="flex justify-center items-center">
              <Button
                type="button"
                className="btnv"
                title="Registrarse"
                onClick={() => router.push("/auth/signup")}
              ></Button>
            </div>
          </div>
          {/* {errors.password && errors.password.message}
      {errors.username && errors.username.message} */}
        </div>
      )}
    </div>
  );
}
