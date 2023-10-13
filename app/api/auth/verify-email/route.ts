import { db } from "@/utils/db";
import { decodeJwtToken } from "@/utils/jwt";
import { getParams, errorResponse } from "@/utils/request";
import { VERIFY_EMAIL_SCHEMA } from "../../../../utils/validators";
import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { token } = VERIFY_EMAIL_SCHEMA.parse(getParams(req));
    const user = decodeJwtToken<User>(token as string);

    if (user?.id) {
      const existingUser = await db.user.findUnique({
        where: { email: user.email },
      });
      if (existingUser) {
        if (!existingUser.isVerified) {
          await db.user.update({
            where: { email: existingUser.email },
            data: { isVerified: true },
          });
        }
      }
      return NextResponse.redirect(
        (process.env.SIGNUP_CALLBACK_URL as string) + "?token=" + token
      );
    } else {
      return NextResponse.json(
        { message: "User not found from token", error: true },
        { status: StatusCodes.FORBIDDEN }
      );
    }
  } catch (err) {
    return errorResponse(err);
  }
}
