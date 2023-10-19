import * as z from "zod"
import * as imports from "../null"

export const VerificationRequestModel = z.object({
  id: z.string(),
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
