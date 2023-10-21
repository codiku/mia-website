import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";
import { StatusCodes } from "http-status-codes";
import { safeEndPoint } from "@/utils/jwt";
import { User } from "@prisma/client";

export const DELETE = safeEndPoint(
  async (req: NextRequest, _, __, token: User) => {
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
