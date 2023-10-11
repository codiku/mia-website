import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface QueryParams {
  [key: string]: string;
}
interface BodyParams {
  [key: string]: string;
}

// Just made is async so it has the same signature as
export function getParams(req: NextRequest) {
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
  let statusCode = 500;

  if (error instanceof ZodError) {
    errorMessage = "";
    error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errorMessage += `Validation error ${field ? "on field" : ""} - ${
        issue.message
      }`;
    });
    statusCode = 400; // You may want to use a different status code for client errors
  } else {
    errorMessage = `Error occurred: ${(error as Error).message}`;
  }
  return NextResponse.json(
    { message: errorMessage, error: true },
    { status: statusCode }
  );
};
