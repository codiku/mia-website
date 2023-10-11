import { errorResponse } from "@/lib/request";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";
import { StatusCodes } from "http-status-codes";

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (token?.email) {
      db.user.delete({ where: { email: token.email } });
      return NextResponse.json({
        error: false,
        message: "Account deleted successfully",
      });
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "Invalid token",
        },
        { errorResponse StatusCodes.BAD_REQUEST }
      );
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}
