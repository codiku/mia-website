import { EMAIL_MODEL, PASSWORD_MODEL } from "@/libs/models";
import { z } from "zod";

export const PostRegisterBody = z.object({
  email: EMAIL_MODEL,
  password: PASSWORD_MODEL,
  resendEmail: z.boolean().optional(),
});
