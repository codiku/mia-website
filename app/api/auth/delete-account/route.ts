import { getParams, errorResponse } from "@/lib/request";
import { DELETE_ACCOUNT_SCHEMA } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { token } = DELETE_ACCOUNT_SCHEMA.parse(getParams(req));

    return NextResponse.json({
      error: false,
      message: "Account deleted successfully",
    });
  } catch (err) {
    return errorResponse(err as Error);
  }
}
