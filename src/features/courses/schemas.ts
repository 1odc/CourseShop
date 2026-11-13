import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Мінімум 3 символи"),
  description: z.string().min(10, "Мінімум 10 символів"),
  author: z.string().min(2, "Вкажіть автора"),
  price: z
    .number({ message: "Вкажіть ціну" })
    .positive("Ціна має бути більше 0"),
});

export type CourseForm = z.infer<typeof courseSchema>;