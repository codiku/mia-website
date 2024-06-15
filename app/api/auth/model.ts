import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from "@/libs/schema";
import { z } from "zod";

export const PostRegisterBody = z.object({
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
  resendEmail: z.boolean().optional(),
});
