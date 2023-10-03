import { db } from "@/lib/db";
import { zodEmailPassword } from "@/lib/validators";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
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
      const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      delete (newUser as Omit<User, "password"> & { password?: string })
        .password;

      return NextResponse.json(
        {
          user: newUser,
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
