import { db } from "@/libs/db";
import { safeEndPoint } from "@/libs/jwt";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = safeEndPoint(
  async (req: NextRequest, { queryParams, body, uriParams, token }) => {
    if (token?.email) {
      const userDeleted = await db.user.delete({
        where: { email: token.email },
      });
      if (userDeleted) {
        return NextResponse.json({
          message: "Account deleted successfully",
        });
      }
    }
    return NextResponse.json(
      {
        error: true,
        message: "Couldn't delete the user",
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  },
  { auth: true }
);
