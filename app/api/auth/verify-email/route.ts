import { db } from "@/libs/db";
import { decodeJwtToken, safeEndPoint } from "@/libs/jwt";
import { VERIFY_EMAIL_SCHEMA } from "@/libs/schemas";
import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const GET = safeEndPoint(
  async (req: NextRequest, { queryParams, body, uriParams, token }) => {
    console.log("***", queryParams);
    const user = decodeJwtToken<User>(queryParams.token);
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
      return NextResponse.redirect((process.env.SIGNUP_CALLBACK_URL as string) + "?token=" + queryParams.token);
    } else {
      return NextResponse.json(
        { message: "User not found from token", error: true },
        { status: StatusCodes.FORBIDDEN }
      );
    }
  },
  { auth: false, queryParams: VERIFY_EMAIL_SCHEMA }
);
