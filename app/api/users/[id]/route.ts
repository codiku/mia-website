import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { UserModel } from "@/prisma/zod";
import { User } from "@prisma/client";
import { auth } from "@/utils/jwt";

export const GET = auth(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
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
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  true
);

export const PATCH = auth(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
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
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  false
);

export const DELETE = auth(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
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
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  false
);
