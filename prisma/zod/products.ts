import * as z from "zod"
import * as imports from "../null"

export const ProductsModel = z.object({
  id: z.number().int(),
  createdAt: z.date().nullish(),
})
