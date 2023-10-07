import { User } from "@prisma/client";

type SafeUser = Omit<User, "password" | " id"> & {
  password?: string;
};
export function unsensitiveUser(user: User): SafeUser {
  delete (user as SafeUser).password;
  return user;
}
