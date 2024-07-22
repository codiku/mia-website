import * as z from "zod"
import { CompleteAccount, RelatedAccountSchema, CompleteSession, RelatedSessionSchema } from "./index"

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  password: z.string().nullish(),
  username: z.string().nullish(),
  isVerified: z.boolean().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserSchema.extend({
  accounts: RelatedAccountSchema.array(),
  sessions: RelatedSessionSchema.array(),
}))
