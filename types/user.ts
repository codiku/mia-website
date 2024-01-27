import { User } from "@prisma/client";
export type UnsensitiveUser = Omit<User, "password" | " id">;
