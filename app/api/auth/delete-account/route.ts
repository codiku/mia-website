import { errorResponse } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/utils/db";
import { StatusCodes } from "http-status-codes";

export async function DELETE(req: NextRequest) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken?.email) {
      const userDeleted = await db.user.delete({
        where: { email: jwtToken.email },
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
  } catch (err) {
    return errorResponse(err as Error);
  }
}
