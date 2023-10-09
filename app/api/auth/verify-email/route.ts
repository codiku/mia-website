import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { getParam } from "@/lib/request";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = getParam("token", req);
  const email = decodeJwtToken(token as string);
  if (email) {
    const existingUser = await db.user.findUnique({ where: { email: email } });
    if (existingUser) {
      if (!existingUser.isVerified) {
        await db.user.update({
          where: { email: existingUser.email },
          data: { isVerified: true },
        });
      }
    }
    return NextResponse.redirect(
      process.env.SMTP_VERIFY_EMAIL_REDIRECT_URL as string
    );
  } else {
    return NextResponse.json(
      { message: "Could not verify the user", error: true },
      { status: 401 }
    );
  }
}
