import { db } from "@/libs/db";
import { decodeJwtToken, safeEndPoint } from "@/libs/jwt";
import { compare, hash } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { RESET_PASSWORD_SCHEMA } from "./schemas";

export const PATCH = safeEndPoint(
  async (req: NextRequest, { queryParams, body, uriParams }) => {
    const data = decodeJwtToken<{ email: string }>(body.token);
    if (data?.email) {
      const user = await db.user.findUnique({ where: { email: data?.email } });

      if (user && user.isVerified) {
        // compare body password and hashed user password
        const passwordMatch = await compare(body.password, user.password!);
        if (passwordMatch) {
          return NextResponse.json(
            {
              message: "New password is the same as the current password",
              error: true,
            },
            { status: StatusCodes.CONFLICT }
          );
        }
        const hashedPassword = await hash(body.password, Number(process.env.HASH_ROUND));
        const userUpdated = await db.user.update({
          where: { email: data?.email },
          data: { password: hashedPassword },
        });
        if (userUpdated) {
          return NextResponse.json({}, { status: StatusCodes.CREATED });
        }
      } else {
        return NextResponse.json(
          {
            message: "You can't change the password of an unverified account",
            error: true,
          },
          { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
      }
    }
    return NextResponse.json(
      { message: "Error during password reset", error: true },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  },
  { auth: false, body: RESET_PASSWORD_SCHEMA }
);
