import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30),
  email: z.string().email().min(1).max(255),
  password: z.string().min(8).max(16),
});
