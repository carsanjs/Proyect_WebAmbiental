import { z } from "zod";

const isOnlyLetters = (value: string) => /^[A-Za-z\s_]+$/.test(value);
export const clasRroom = z.object({
    name_lroom: z
      .string()
      .min(5, { message: "Name must be at least 6 characters long" })
      .max(50, {message: "Name must be less than 60 characters long"})
      .refine(value => isOnlyLetters(value), { message: "Only letters are allowed" }),

    number_lroom: 
    z.string().refine((number_lroom) => !isNaN(parseFloat(number_lroom)),{message: "Age must be a number"})

  })

