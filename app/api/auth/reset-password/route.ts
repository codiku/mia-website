import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { compare, hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const { password, token } = body;
  const data = decodeJwtToken<{ email: string }>(token);

  if (data?.email) {
    const user = await db.user.findUnique({ where: { email: data?.email } });

    if (user) {
      // compare body password and hashed user password
      const passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        return NextResponse.json(
          {
            message: "New password is the same as the current password",
            error: true,
          },
          { status: 401 }
        );
      }
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
