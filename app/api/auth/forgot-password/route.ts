import { sendEmail } from "@/lib/email";
import { generateJwtToken } from "@/lib/jwt";
import { FORGOT_PASSWORD_SCHEMA } from "@/lib/validators";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = FORGOT_PASSWORD_SCHEMA.parse(await req.json());
  const { email } = body;

  if (email) {
    const token = generateJwtToken({ email });
    const emailResponse = await sendEmail(
      email,
      "Reset password", // Email subject
      `Click the following link to reset your password: http://${headers().get(
        "host"
      )}/auth/reset-password?token=${token}`
    );
    if (emailResponse.rejected.length > 0) {
      return NextResponse.json(
        { message: "Email has been rejected", error: true },
        { status: 500 }
      );
    } else {
      return NextResponse.json({
        message: "Email has been sent",
        error: false,
      });
    }
  } else {
    return NextResponse.json(
      { message: "Invalid email", error: true },
      { status: 500 }
    );
  }
}
