import { db } from "@/libs/db";
import { decodeJwtToken, safeEndPoint } from "@/libs/jwt";
import { VERIFY_EMAIL_SCHEMA } from "@/libs/schema";
import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const GET = safeEndPoint(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const user = decodeJwtToken<User>(params.token);
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
      return NextResponse.redirect((process.env.SIGNUP_CALLBACK_URL as string) + "?token=" + params.token);
    } else {
      return NextResponse.json(
        { message: "User not found from token", error: true },
        { status: StatusCodes.FORBIDDEN }
      );
    }
  },
  { auth: false, body: VERIFY_EMAIL_SCHEMA }
);
