import { db } from "@/lib/db";
import { decodeJwtToken } from "@/lib/jwt";
import { getBodyAsync, errorResponse } from "@/lib/request";
import { RESET_PASSWORD_SCHEMA } from "@/lib/validators";
import { compare, hash } from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { password, token } = RESET_PASSWORD_SCHEMA.parse(
      await getBodyAsync(req)
    );
    console.log(
      "🚀 ~ file: route.ts:14 ~ POST ~ password, token:",
      password,
      token
    );

    const data = decodeJwtToken<{ email: string }>(token);
    console.log("🚀 ~ file: route.ts:17 ~ POST ~ data:", data);
    if (data?.email) {
      const user = await db.user.findUnique({ where: { email: data?.email } });

      if (user && user.isVerified) {
        console.log("🚀 ~ file: route.ts:22 ~ POST ~ user:", user);
        // compare body password and hashed user password
        const passwordMatch = await compare(password, user.password);
        console.log(
          "🚀 ~ file: route.ts:25 ~ POST ~ passwordMatch:",
          passwordMatch
        );
        if (passwordMatch) {
          return NextResponse.json(
            {
              message: "New password is the same as the current password",
              error: true,
            },
            { status: StatusCodes.CONFLICT }
          );
        }
        const hashedPassword = await hash(password, 12);
        console.log(
          "🚀 ~ file: route.ts:36 ~ POST ~ hashedPassword:",
          hashedPassword
        );
        const userUpdated = await db.user.update({
          where: { email: data?.email },
          data: { password: hashedPassword },
        });
        console.log(
          "🚀 ~ file: route.ts:41 ~ POST ~ userUpdated:",
          userUpdated
        );
        if (userUpdated) {
          console.log(
            "🚀 ~ file: route.ts:43 ~ POST ~ userUpdated:",
            userUpdated
          );
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
    console.log("🚀 ~ file: route.ts:73 ~ POST ~ ");

    return NextResponse.json(
      { message: "Error during password reset", error: true },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  } catch (err) {
    return errorResponse(err as Error);
  }
}
