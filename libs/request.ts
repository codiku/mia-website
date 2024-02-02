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

// Just made is async so it has the same signature as
export function getQueryParams(req: NextRequest) {
  const queryParams = new URL(req.url).searchParams;
  const queryParamsObject: QueryParams = {};
  queryParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

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
  return NextResponse.json(
    { message: errorMessage, error: true },
    { status: statusCode }
  );
};

export const errorResponseAction = (error: unknown): ApiResponse => {
  let errorMessage = "";
  if (error instanceof ZodError) {
    errorMessage = "";
    error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errorMessage += `${field} - ${issue.message}\n`;
    });
  } else {
    errorMessage = `Error occurred: ${(error as Error).message}`;
  }
  return { message: errorMessage, error: true };
};

export function safeAction<D, R>(
  serverAction: ((data: Awaited<D>) => Promise<R>) | (() => Promise<R>),
  modelData?: ZodSchema<D>
): ((data?: Awaited<D>) => Promise<R>) | (() => ApiResponse) {
  try {
    if (modelData !== undefined) {
      return async (d?: Awaited<D>) => {
        if (d) {
          await modelData.parse(d);
          return (serverAction as (data: Awaited<D>) => Promise<R>)(d);
        } else {
          return (serverAction as () => Promise<R>)();
        }
      };
    } else {
      return async () => {
        return (serverAction as () => Promise<R>)();
      };
    }
  } catch (error) {
    return () => errorResponseAction(error as Error);
  }
}
