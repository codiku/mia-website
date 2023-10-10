import { NextRequest, NextResponse } from "next/server";

export const getParam = (key: string, req: NextRequest) => {
  return new URL(req.url).searchParams.get(key);
};

export const invalidInputResponse = () => {
  return NextResponse.json(
    { message: "Invalid parameters", error: true },
    { status: 500 }
  );
};
