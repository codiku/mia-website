import * as z from "zod"
import * as imports from "../null"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  username: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  isVerified: z.boolean().nullish(),
})
