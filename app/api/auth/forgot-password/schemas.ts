import { EMAIL_SCHEMA } from "@/libs/schemas";
import { z } from "zod";

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
});
