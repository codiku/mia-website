import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT, getToken } from "next-auth/jwt";

import { NextResponse, NextRequest } from "next/server";
import { errorResponse, getBodyAsync } from "./request";
import { ZodAny, ZodSchema } from "zod";
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
export function auth<T>(
  routeHandler: (
    req: NextRequest,
    route: { params: any },
    body: Awaited<T>,
    token?: JWT
  ) => void,
  enabled = true,
  model?: ZodSchema<T>
) {
  return async (req: NextRequest, route: { params: { id: string } }) => {
    if (enabled) {
      const token = await getToken({ req });
      if (token) {
        let body = model ? await parseBody(req, model) : undefined;
        return routeHandler(req, route, body as never, token);
      } else {
        return handleUnauthorized();
      }
    } else {
      try {
        let body = model ? await parseBody(req, model) : undefined;
        return routeHandler(req, route, body as never);
      } catch (error) {
        return errorResponse(error as Error);
      }
    }
  };
}

const parseBody = async <T>(req: NextRequest, model: ZodSchema<T>) => {
  return model.parse(await getBodyAsync(req));
};
function handleUnauthorized() {
  return NextResponse.json(
    {
      error: true,
      message: "You must be authenticated",
    },
    { status: StatusCodes.UNAUTHORIZED }
  );
}
