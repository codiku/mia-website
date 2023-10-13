import { z } from "zod";
import { decodeJwtToken } from "@/api/utils/jwt";

export const JWT_TOKEN_SCHEMA = z
  .string()
  .min(1)
  .refine((value) => decodeJwtToken(value) !== null, {
    message: "Invalid JWT token",
  });

export const PASSWORD_SCHEMA = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]+/, "Must contain at least 1 uppercase letter")
  .regex(/[a-z]+/, "Must contain at least 1 lowercase letter")
  .regex(/[0-9]+/, "Must contain at least 1 number")
  .regex(
    /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/,
    "Must contain at least 1 special character"
  );

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export const SIGNIN_SCHEMA = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: PASSWORD_SCHEMA,
});

export const REGISTER_SCHEMA = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: PASSWORD_SCHEMA,
  resendEmail: z.boolean().optional(),
});

export const RESET_PASSWORD_SCHEMA = z.object({
  password: PASSWORD_SCHEMA,
  token: JWT_TOKEN_SCHEMA,
});

export const VERIFY_EMAIL_SCHEMA = z.object({
  token: JWT_TOKEN_SCHEMA,
});

export const DELETE_ACCOUNT_SCHEMA = z.object({
  token: JWT_TOKEN_SCHEMA,
});
