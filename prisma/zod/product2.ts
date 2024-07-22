import * as z from "zod"

export const Product2Schema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date().nullish(),
})
