import { db } from "@/lib/db";
import { zodEmailPassword } from "@/lib/validators";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { unsensitiveUser } from "./utils";

export async function POST(req: Request) {
  try {
    const body = zodEmailPassword.parse(await req.json());
    const { email, password } = body;
    const existingUser = await db.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return NextResponse.json(
        { user: null, message: "User already exist" },
        { status: 409 }
      );
    } else {
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
          message: "User created successfully",
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
