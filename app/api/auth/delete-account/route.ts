import { errorResponse } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/utils/jwt";

export const DELETE = auth(
  async (req: NextRequest, _, __, token) => {
    if (token?.email) {
      const userDeleted = await db.user.delete({
        where: { email: token.email },
      });
      if (userDeleted) {
        return NextResponse.json({
          error: false,
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
  }, true)
