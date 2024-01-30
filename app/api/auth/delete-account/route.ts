import { NextRequest, NextResponse } from "next/server";
import { db } from "@/libs/db";
import { StatusCodes } from "http-status-codes";
import { safeEndPoint } from "@/libs/jwt";

export const DELETE = safeEndPoint(
  async (req: NextRequest, _uriParams, _body, _queryParams, token) => {
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
  true
);
