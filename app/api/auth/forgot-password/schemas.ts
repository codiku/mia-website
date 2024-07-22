import { EMAIL_SCHEMA } from "@/libs/schema";
import { z } from "zod";

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
});
