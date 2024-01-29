import * as z from "zod"

export const ProductModel = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date().nullish(),
})
