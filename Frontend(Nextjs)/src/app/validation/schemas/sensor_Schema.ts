import { z } from "zod";

  const isOnlyLetters = (value: string) => /^[A-Za-z0-9-]+$/.test(value);
export const SensorsSchema = z.object({
    device_id: z
      .string({ required_error: "Selection is required" })
      .min(36) // minimo 36 carracteres
      .max(36), // maximo 36 carracteres

  name_sensor: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" })
    .max(30, { message: "Name must be less than 30 characters long" })
    .refine((value) => isOnlyLetters(value), {
      message: "Only letters are allowed",
    }),
  description: z
    .string()
    .min(5, { message: "Name must be at least 6 characters long" })
    .max(290, { message: "Name must be less than 60 characters long" })
    .refine((value) => isOnlyLetters(value), {
      message: "Only letters are allowed",
    }),
  number_lroom: z
    .string()
    .refine((number_lroom) => !isNaN(parseFloat(number_lroom)), {
      message: "Age must be a number",
    }),

  size: z.string().refine(
    (value) => {
      const parts = value.split("x");
      if (parts.length !== 2) return false;
      const [width, height] = parts;
      return !isNaN(parseInt(width)) && !isNaN(parseInt(height));
    },
    { message: "Size must be in the format 'widthxheight'" }
  ),
});
