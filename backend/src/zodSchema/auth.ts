import { z } from "zod";

export const registerProp = z.object({
  username: z
    .string()
    .max(50)
    .min(3)
    .transform((val) => val.trim().toLowerCase()),
  displayname: z.string().max(50).min(3).optional(),
  email: z
    .string()
    .email("Must be valid email")
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(8).max(40),
  passwordVerify: z.string().min(8).max(40),
});

export const loginProp = z.object({
  username: z.string().transform((val) => val.toLowerCase().trim()),
  password: z.string(),
  remember: z.boolean().optional(),
});
