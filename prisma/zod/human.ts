import * as z from "zod"

export const HumanModel = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date().nullish(),
})
