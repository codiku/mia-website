import { User } from "@prisma/client";
export type UnsensitiveUser = Omit<User, "password" | " id">;
export function unsensitiveUser(user: User): UnsensitiveUser {
  delete (user as UnsensitiveUser & { password?: string }).password;
  return user;
}
