import { NextRequest, NextResponse } from "next/server";

interface QueryParams {
  [key: string]: string;
}

export function getParams(req: NextRequest): QueryParams {
  const queryParams = new URL(req.url).searchParams;
  const queryParamsObject: QueryParams = {};
  queryParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });

  return queryParamsObject;
}
export const invalidInputResponse = () => {
  return NextResponse.json(
    { message: "Invalid parameters", error: true },
    { status: 500 }
  );
};
