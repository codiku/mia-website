import { db } from "@/utils/db";
import { sendEmail } from "@/utils/email";
import { auth, generateJwtToken } from "@/utils/jwt";
import { FORGOT_PASSWORD_MODEL } from "@/utils/models";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const POST = auth(
  async (req: NextRequest, _, { email }) => {
    const token = generateJwtToken({ email });
    const existingUser = await db.user.findUnique({ where: { email: email } });

    if (existingUser) {
      const emailResponse = await sendEmail(
        email,
        "Reset password", // Email subject
        `<html>
      <body>
        <p>Click the following link to reset your password:</p>
        <a href="${process.env.FORGOT_PASSWORD_CALLBACK_URL}?token=${token}">
          Reset Password
        </a>
      </body>
    </html>`
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
    } else {
      return NextResponse.json(
        {
          message: "No such account with this email was found",
          error: true,
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

  }, false, FORGOT_PASSWORD_MODEL)
