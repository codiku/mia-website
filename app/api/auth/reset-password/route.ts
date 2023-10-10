import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { invalidInputResponse } from "@/lib/request";
import { SPECIAL_CHARACTERS } from "@/lib/validators";
import { compare, hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const RESET_PASSWORD_SCHEMA = z.object({
  password: z
    .string()
    .min(8, "Must be at least 8 characters")
    .regex(/[A-Z]+/, "Must contain at least 1 uppercase letter")
    .regex(/[a-z]+/, "Must contain at least 1 lowercase letter")
    .regex(/[0-9]+/, "Must contain at least 1 number")
    .regex(SPECIAL_CHARACTERS, "Must contain at least 1 special character"),
  token: z.string().min(1),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { password, token } = RESET_PASSWORD_SCHEMA.parse(await req.json());
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
  } catch (err) {
    return invalidInputResponse();
  }
}
