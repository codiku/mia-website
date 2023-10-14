import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserModel } from "@/prisma/zod";
import { getToken } from "next-auth/jwt";
import { auth } from "@/utils/jwt";

export const POST = auth(async (req: NextRequest) => {
  try {
    if (await getToken({ req })) {
      const body = UserModel.omit({ id: true }).parse(await getBodyAsync(req));
      const created = await db.user.create({
        data: body,
      });
      return NextResponse.json(created);
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}, false);
