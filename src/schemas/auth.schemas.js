import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required", //Valida que Username sea un String
    })
    .min(4, {
      message: "Username must be at least 4 characters long", //Valida que Username tenga al menos 4 caracteres
    }),
  email: z
    .string({
      required_error: "Email is required", //Valida que Email sea un String
    })
    .email({
      messsage: "Email invalido", //Valida que Email sea un Email
    }),
  password: z
    .string({
      required_error: "Password is required", //Valida que Password sea un String
    })
    .min(4, {
      message: "Password must be at least 4 characters long", //Valida que Password tenga al menos 4 caracteres
    }),
});

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required", //Valida que Username sea un String
    }),
  password: z
    .string({
      required_error: "Password is required", //Valida que Password sea un String
    }),
});
