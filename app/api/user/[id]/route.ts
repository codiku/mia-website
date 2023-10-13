import { errorResponse, getBodyAsync, getParams } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { requireAuth } from "@/utils/request";
import { z } from "zod";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    // if (await getToken({ req })) {
    let user;
    let id = Number(route.params.id);
    if (id) {
      user = await db.user.findUnique({
        where: { id: id },
      });
    }
    return NextResponse.json(user || { error: true, message: "Not found" }, {
      status: StatusCodes.BAD_REQUEST,
    });
    // } else {
    //   return requireAuth(req);
    // }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function PATCH(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    // if (await getToken({ req })) {
    const id: number = Number(route.params.id);
    const body = await getBodyAsync(req);

    return NextResponse.json({});
    //}else {
    //   return requireAuth(req);
    // }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const id: number = Number(route.params.id);
      const body = await getBodyAsync(req);

      return NextResponse.json({}, { status: StatusCodes.CREATED });
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
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const id: number = Number(route.params.id);
      const body = await getBodyAsync(req);

      return NextResponse.json(
        {
          error: false,
          message: "",
        },
        { status: StatusCodes.NO_CONTENT }
      );
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}
