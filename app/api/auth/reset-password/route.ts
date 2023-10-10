import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body", body);

  const { password, token } = body;
  const email = decodeJwtToken<string>(token);
  console.log("email", email);

  if (email) {
    const user = await db.user.findUnique({ where: { email: email } });

    if (user) {
      const hashedPassword = await hash(password, 12);

      const userUpdated = await db.user.update({
        where: { email: email },
        data: { password: hashedPassword },
      });
      if (userUpdated) {
        return NextResponse.json({
          message: "Password successfully updated",
          error: false,
        });
      }
    }
  }

  return NextResponse.json(
    { message: "Error during password reset", error: true },
    { status: 500 }
  );
}
