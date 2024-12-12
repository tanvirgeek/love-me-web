import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name must be at least 1 character",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
    gender: z.string().min(1, {
      message: "You must select a gender",
    }),
    division: z.string().min(1, {
      message: "You must select a division",
    }),
    district: z.string().min(1, {
      message: "You must select a district",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This specifies where the error should be displayed
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
