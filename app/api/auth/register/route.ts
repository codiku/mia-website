import { db } from "@/lib/db";
import { zodEmailPassword } from "@/lib/validators";
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import { unsensitiveUser } from "../utils";
import { sendVerificationEmail } from "@/lib/email";
import { generateJwtToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = zodEmailPassword.parse(await req.json());
    const { email, password } = body;
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
      const token = generateJwtToken(email);

      const emailResponse = await sendVerificationEmail(email, token);
      if (emailResponse.rejected.length > 0) {
        return NextResponse.json(
          { user: null, message: "Email has been rejected", error: true },
          { status: 500 }
        );
      }
      const hashedPassword = await hash(password, 12);
      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        {
          user: unsensitiveUser(newUser),
          message: "User created, verify email to activate account",
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message, error: true },
      { status: 500 }
    );
  }
}
