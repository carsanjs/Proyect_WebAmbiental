import { z } from "zod";

const isOnlyLetters = (value: string) => /^[A-Za-z0-9_\s]+$/.test(value);
const isOnlyDescription = (value: string) => /^[A-Za-z0-9_,.\s]+$/.test(value);
export const Devices = z.object({
  id_lroom: z
    .string({ required_error: "Selection is required" })
    .min(36)
    .max(36),
  name_device: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must be less than 30 characters long" })
    .refine((value) => isOnlyLetters(value), {
      message: "Only letters are allowed",
    }),

  description: z
    .string()
    .min(5, { message: "Name must be at least 6 characters long" })
    .max(127, { message: "Name must be less than 60 characters long" })
    .refine((value) => isOnlyDescription(value), {
      message: "Only letters are allowed",
    }),

  size: z
    .string()
    .refine(
      (value) => {
        const parts = value.split("x");
        if (parts.length !== 2) return false;
        const [width, height] = parts;
        return !isNaN(parseInt(width)) && !isNaN(parseInt(height));
      },
      { message: "Size must be in the format 'widthxheight'" }
    )
});
