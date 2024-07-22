import { PASSWORD_SCHEMA, STRING_REQUIRED_SCHEMA } from "@/libs/schemas";
import { z } from "zod";

export const UPDATE_PASSWORD_SCHEMA = z.object({
  oldPassword: STRING_REQUIRED_SCHEMA,
  newPassword: PASSWORD_SCHEMA,
});
