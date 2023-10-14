import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

import { NextResponse, NextRequest } from "next/server";
import { errorResponse } from "./request";
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
// Create a function that wraps your route handler with the authentication logic.
export function auth(routeHandler: Function, enabled = true) {
  return async (req: NextRequest, route: { params: { id: string } }) => {
    try {
      if (enabled) {
        if (await getToken({ req })) {
          return routeHandler(req, route);
        } else {
          return handleUnauthorized();
        }
      } else {
        return routeHandler(req, route);
      }
    } catch (err) {
      return errorResponse(err as Error);
    }
  };
}

function handleUnauthorized() {
  return NextResponse.json(
    {
      error: true,
      message: "You must be authenticated",
    },
    { status: StatusCodes.UNAUTHORIZED }
  );
}
