import { Prisma } from "@prisma/client";
import { z } from "zod";

// Extend Prisma's UserCreateInput type
export type CreateUserInput = Prisma.UserCreateInput;

// Define Zod schema for validation
export const CreateUserSchema = z.object({
  firebaseUserId: z.string(),
  name: z.string(),
  gender: z.string(),
  district: z.string(),
  division: z.string(),
  email: z.string().email(),
  role: z.number().optional().default(0), // Default value for role
});

// Type for Update User Request
export type UpdateUserInput = Partial<CreateUserInput> & { id: string };

// Zod schema for Update User
export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.number().optional(),
});
