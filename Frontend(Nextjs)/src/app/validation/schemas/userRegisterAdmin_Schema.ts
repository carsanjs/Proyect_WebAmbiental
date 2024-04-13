import { z } from "zod";
import { isOnlyLetters } from "@/components/functions/AloneName";

//un arreglo de datos de carreras de la upc
export const carreraStatus = [
  "Ingeniería Sistemas",
  "Ingeniería Ambiental",
  "Ingeniería Agroindustrial",
  "Contaduría Publica",
  "Administración de Empresa",
  "Tecnología Agroindustrial",
] as const;

export type CarreraStatus = (typeof carreraStatus)[number]; 

export const mappedCarreraStatus: { [key in CarreraStatus]: string } = {
  "Ingeniería Sistemas": "Ingeniería Sistemas",
  "Ingeniería Ambiental": "Ingeniería Ambiental",
  "Ingeniería Agroindustrial": "Ingeniería Agroindustrial",
  "Contaduría Publica": "Contaduría Publica",
  "Administración de Empresa": "Administración de Empresa",
  "Tecnología Agroindustrial": "Tecnología Agroindustrial",
};

export const userRegisterAdmin = z.object({
  user_name:z.string().min(5,{message:"el user name es requerido"}).max(25),
  correo: z.string().email({ message: "el correo electrónico es requerido" }),
  nombre: z.string().min(3, { message: "el nombre es requerido" }).max(25)
  .refine(value => isOnlyLetters(value), { message: "Only letters are allowed" }),
  carrera:z.enum(carreraStatus,{
    errorMap:()=>({message: "Please select an race"})
  }),
 passw:z.string().min(4,{message:'la contraseña es requerida'}).max(20),
});
