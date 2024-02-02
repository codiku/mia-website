import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT, getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { errorResponse, getBodyAsync, getQueryParams } from "./request";
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
export function safeEndPoint<B, P, UriP>(
  routeHandler: (
    req: NextRequest,
    route: {
      params: UriP;
    },
    body: Awaited<B>,
    queryParams: P,
    token?: JWT
  ) => void,
  enabled = true,
  modelUriParams?: ZodSchema<UriP>,
  modelBody?: ZodSchema<B>,
  modelQueryParams?: ZodSchema<P>
) {
  return async (req: NextRequest, route: { params: UriP }) => {
    if (enabled) {
      const token = await getToken({ req });
      if (token) {
        let body = modelBody ? await parseBody(req, modelBody) : undefined;
        const qParams = getQueryParams(req);

        if (modelUriParams) {
          modelUriParams.parse(route.params);
        }
        if (modelQueryParams) {
          modelQueryParams.parse(qParams);
        }

        return routeHandler(req, route, body as never, qParams as P, token);
      } else {
        return handleUnauthorized();
      }
    } else {
      try {
        let body = modelBody ? await parseBody(req, modelBody) : undefined;
        const params = getQueryParams(req);

        if (modelUriParams) {
          modelUriParams.parse(route.params);
        }
        if (modelQueryParams) {
          modelQueryParams.parse(params);
        }
        return routeHandler(req, route, body as never, params as P, undefined);
      } catch (error) {
        return errorResponse(error as Error);
      }
    }
  };
}

const parseBody = async <T>(req: NextRequest, modelBody: ZodSchema<T>) => {
  return modelBody.parse(await getBodyAsync(req));
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
