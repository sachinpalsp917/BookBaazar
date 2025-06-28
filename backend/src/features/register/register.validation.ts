import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(8).max(16),
});
