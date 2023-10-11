import jwt from "jsonwebtoken";

// Generate a JWT token with user information
export function generateJwtToken(data: string | object | Buffer) {
  return jwt.sign(data, process.env.NEXTAUTH_SECRET as string, {
    expiresIn: "2 days",
  });
}

export function decodeJwtToken<T>(token: string) {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    return decoded as T;
  } catch (error) {
    // Token verification failed
    return null;
  }
}
