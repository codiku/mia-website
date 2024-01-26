import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { ProductModel } from "@/prisma/zod";
import { safeEndPoint } from "@/utils/jwt";

export const GET = safeEndPoint(async (req: NextRequest) => {
  const product = await db.product.findMany({});
  return NextResponse.json(product || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);

export const POST = safeEndPoint(
  async (req: NextRequest, route, body, _, token) => {
    const created = await db.product.create({
      data: body,
    });
    return NextResponse.json(created);
  },
  true,
  ProductModel.omit({ id: true })
);
