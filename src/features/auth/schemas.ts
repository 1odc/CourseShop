import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Невірний email"),
  password: z.string().min(6, "Мінімум 6 символів"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Мінімум 2 символи"),
    email: z.string().email("Невірний email"),
    password: z.string().min(6, "Мінімум 6 символів"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;