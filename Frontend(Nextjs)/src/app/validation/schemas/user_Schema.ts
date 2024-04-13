import { z } from "zod";

export const carreraStatus = [
  "Ingeniería Sistemas",
  "Ingeniería Ambiental",
  "Ingeniería Agroindustrial",
  "Contaduría Publica",
  "Administración de Empresa",
  "Tecnología Agroindustrial",
] as const;

export type CarreraStatus = typeof carreraStatus[number];

export const mappedCarreraStatus: { [key in CarreraStatus]: string } = {
  "Ingeniería Sistemas": "Ingeniería Sistemas",
  "Ingeniería Ambiental": "Ingeniería Ambiental",
  "Ingeniería Agroindustrial": "Ingeniería Agroindustrial",
  "Contaduría Publica": "Contaduría Publica",
  "Administración de Empresa": "Administración de Empresa",
  "Tecnología Agroindustrial": "Tecnología Agroindustrial",
};

export const userInfoSchema = z.object({
  correo: z.string().email({ message: "el correo electrónico es requerido" }),
  nombre: z.string().min(3, { message: "el nombre es requerido" }).max(25),
  carrera: z.enum(carreraStatus, {
    errorMap: () => ({ message: "La carrera es requerido" }),
  }),
 passw:z.string().min(4,{message:'la contraseña es requerida'}).max(20),
});
