import { ApiResponse } from "@/types/api-type";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";

interface QueryParams {
  [key: string]: string;
}
interface BodyParams {
  [key: string]: string;
}

export function getQueryParams(request: NextRequest) {
  const queryParamsObject: QueryParams = {};
  if (request?.nextUrl) {
    // Force to parse and stringify, if you remove it... error at build time...
    const url = new URL(JSON.parse(JSON.stringify(request.nextUrl)));
    if (url && typeof url !== "string" && url.searchParams) {
      url.searchParams.forEach((value: string, key: string) => {
        queryParamsObject[key] = value;
      });
    }
  }

  return queryParamsObject;
}

export async function getBodyAsync(req: NextRequest): Promise<BodyParams> {
  return await req.json();
}

export const errorResponse = (error: unknown) => {
  let errorMessage = "";
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  if (error instanceof ZodError) {
    errorMessage = "";
    error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errorMessage += `${field} - ${issue.message}\n`;
    });
    statusCode = StatusCodes.BAD_REQUEST; // You may want to use a different status code for client errors
  } else {
    errorMessage = `Error occurred: ${(error as Error).message}`;
  }
};

export const errorResponseAction = (error: unknown): ApiResponse => {
  let errorMessage = "";
  if (error instanceof ZodError) {
    errorMessage = "";
    error.issues.forEach((issue) => {
      let field = issue.path.join(".");
      if (issue.path.length === 0) {
        field = (issue as any).expected;
      }
      errorMessage += `${field} - ${issue.message}\n`;
    });
  } else {
    errorMessage = `Error occurred: ${(error as Error).message}`;
  }
  return { message: errorMessage, error: true };
};

// Define a generic error response action type
export type ErrorResponseAction = (error: Error) => Promise<unknown>;

// Overload definitions
export function safeAction<R>(
  serverAction: () => Promise<R>
): () => Promise<R | ErrorResponseAction>;

export function safeAction<D, R>(
  serverAction: (data: D) => Promise<R>,
  modelData: ZodSchema<D>
): (data: D) => Promise<R | ErrorResponseAction>;

export function safeAction<D, R>(
  serverAction: (data: D) => Promise<R>,
  modelData?: ZodSchema<D>
) {
  if (modelData !== undefined) {
    return async (d: D) => {
      try {
        await modelData.parse(d);
        return await (serverAction as (data: D) => Promise<R>)(d);
      } catch (error) {
        throw new Error(errorResponseAction(error as Error).message);
      }
    };
  } else {
    return async () => {
      return await (serverAction as () => Promise<R>)();
    };
  }
}
