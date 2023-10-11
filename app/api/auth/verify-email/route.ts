import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { getParams, errorResponse } from "@/lib/request";
import { RESET_PASSWORD_SCHEMA, VERIFY_EMAIL_SCHEMA } from "@/lib/validators";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { token } = VERIFY_EMAIL_SCHEMA.parse(getParams(req).token + "a");

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
        (process.env.NEXTAUTH_URL as string) + "?token=" + token
      );
    } else {
      return NextResponse.json(
        { message: "Could not verify the user", error: true },
        { status: 401 }
      );
    }
  } catch (err) {
    return errorResponse(err);
  }
}
