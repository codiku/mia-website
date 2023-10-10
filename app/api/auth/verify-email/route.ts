import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { getParam, invalidInputResponse } from "@/lib/request";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const RESET_PASSWORD_SCHEMA = z.object({
  token: z.string().min(1),
});

export async function GET(req: NextRequest) {
  try {
    const { token } = RESET_PASSWORD_SCHEMA.parse(getParam("token", req));

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
  } catch (error) {
    return invalidInputResponse();
  }
}
