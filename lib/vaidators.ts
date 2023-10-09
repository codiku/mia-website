import { z } from "zod";

export const SIGNIN_SCHEMA = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "The password must be at least 8 characters"),
});
