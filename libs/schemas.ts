import { decodeJwtToken } from "@/libs/jwt";
import { z } from "zod";

export const JWT_TOKEN_SCHEMA = z
  .string()
  .min(1)
  .refine(
    (value) => {
      try {
        console.log("REFINE TEST");
        return decodeJwtToken<string>(value) !== null;
      } catch (e) {
        console.log("REFINE FAIL");
        return false;
      }
    },
    {
      message: "Invalid JWT token",
    }
  );

export const PASSWORD_SCHEMA = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]+/, "At least 1 uppercase letter")
  .regex(/[a-z]+/, "At least 1 lowercase letter")
  .regex(/[0-9]+/, "At least 1 number")
  .regex(/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/, "At least 1 special character");

export const EMAIL_SCHEMA = z.string().email("Invalid email").min(1, "Email is required");

export const STRING_REQUIRED_SCHEMA = z.string().min(1, "Required");

export const SIGNIN_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
});

export const VERIFY_EMAIL_SCHEMA = z.object({
  token: JWT_TOKEN_SCHEMA,
});

export const DELETE_ACCOUNT_SCHEMA = z.object({
  token: JWT_TOKEN_SCHEMA,
});

export const IdArgSchema = z.object({
  id: z.number(),
});

export const IdParamsSchema = z.object({
  id: z.coerce.number(),
});
