import * as z from "zod"

export const GoModel = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date().nullish(),
})
