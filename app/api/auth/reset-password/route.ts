import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const { password, token } = body;
  const data = decodeJwtToken<{ email: string }>(token);

  if (data?.email) {
    const user = await db.user.findUnique({ where: { email: data?.email } });

    if (user) {
      const hashedPassword = await hash(password, 12);

      const userUpdated = await db.user.update({
        where: { email: data?.email },
        data: { password: hashedPassword },
      });
      if (userUpdated) {
        return NextResponse.json({
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
