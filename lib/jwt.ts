import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

// Generate a JWT token with user information
export function generateJwtToken(user: User) {
  // Create a token with user data and sign it with the secret key
  const token = jwt.sign(user, process.env.NEXTAUTH_SECRET as string);

  return token;
}

export function decodeJwtToken(token: string) {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    return decoded as User;
  } catch (error) {
    // Token verification failed
    return null;
  }
}
