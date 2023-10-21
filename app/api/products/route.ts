import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ProductsModel } from "@/prisma/zod";
import { getToken } from "next-auth/jwt";
import { safeEndPoint } from "@/utils/jwt";

export const POST = safeEndPoint(async (req: NextRequest, body, _, token) => {
  const created = await db.products.create({
    data: body,
  });
  return NextResponse.json(created);
}
  , true, ProductsModel.omit({ id: true }));