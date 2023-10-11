import { db } from "@/lib/db";
import { hash } from "bcrypt";

import { sendEmail } from "@/lib/email";
import { generateJwtToken } from "@/lib/jwt";
import { SIGNIN_SCHEMA } from "@/lib/validators";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { unsensitiveUser } from "../utils";
import { getBodyAsync, errorResponse } from "@/lib/request";
export async function POST(req: NextRequest) {
  try {
    const { email, password } = SIGNIN_SCHEMA.parse(await getBodyAsync(req));

    const existingUser = await db.user.findUnique({ where: { email: email } });
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { user: null, message: "User already exist" },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { user: null, message: "Please verify your account", error: true },
          { status: 409 }
        );
      }
    } else {
      const hashedPassword = await hash(password, 12);
      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const token = generateJwtToken(newUser);

      const emailResponse = await sendEmail(
        email,
        "Verify your email", // Email subject
        `Click the following link to verify your email: http://${headers().get(
          "host"
        )}/api/auth/verify-email?token=${token}`
      );

      if (emailResponse.rejected.length > 0) {
        return NextResponse.json(
          { message: "Email has been rejected", error: true },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          user: unsensitiveUser(newUser),
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}
