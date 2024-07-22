import { JWT_TOKEN_SCHEMA, PASSWORD_SCHEMA } from "@/libs/schema";
import { z } from "zod";

export const RESET_PASSWORD_SCHEMA = z.object({
  password: PASSWORD_SCHEMA,
  token: JWT_TOKEN_SCHEMA,
});
