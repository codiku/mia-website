import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { getParam } from "@/lib/request";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = getParam("token", req);

  const user = decodeJwtToken(token as string) as User;
  if (user.id) {
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
}
