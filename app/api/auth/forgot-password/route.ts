import { sendEmail } from "@/lib/email";
import { generateJwtToken } from "@/lib/jwt";
import { getBodyAsync, errorResponse } from "@/lib/request";
import { FORGOT_PASSWORD_SCHEMA } from "@/lib/validators";
import { StatusCodes } from "http-status-codes";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = FORGOT_PASSWORD_SCHEMA.parse(await getBodyAsync(req));
    console.log("*** RUN", email);
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
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    } else {
      return NextResponse.json({
        message: "Email has been sent",
        error: false,
      });
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}
