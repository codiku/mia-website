import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { requireAuth } from "@/utils/request";
import { UserModel } from "@/prisma/zod";
import { User } from "@prisma/client";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    if (await getToken({ req })) {
      let user: User | null = null;
      let id = Number(route.params.id);
      if (id) {
        user = await db.user.findUnique({
          where: { id: id },
        });
      }
      return NextResponse.json(user || { error: true, message: "Not found" }, {
        status: StatusCodes.BAD_REQUEST,
      });
    } else {
      return requireAuth(req);
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function PATCH(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    if (await getToken({ req })) {
      let user: User | null = null;
      let id = Number(route.params.id);
      if (id) {
        const body = UserModel.partial().parse(await getBodyAsync(req));
        user = await db.user.update({ where: { id: id }, data: body });
        return NextResponse.json(
          user || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
    } else {
      return requireAuth(req);
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function DELETE(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    if (await getToken({ req })) {
      let user: User | null = null;
      let id = Number(route.params.id);
      if (id) {
        user = await db.user.delete({ where: { id: id } });
        return NextResponse.json(
          user || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
    } else {
      return requireAuth(req);
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}
