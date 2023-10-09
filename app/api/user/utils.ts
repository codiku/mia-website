import { User } from "@prisma/client";

export type UnsensitiveUser = Omit<User, "password" | " id"> & {
  password?: string;
};
export function unsensitiveUser(user: User): UnsensitiveUser {
  delete (user as UnsensitiveUser).password;
  return user;
}
