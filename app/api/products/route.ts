import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ProductsModel } from "@/prisma/zod";
import { getToken } from "next-auth/jwt";
import { auth } from "@/utils/jwt";

export const POST = auth(async (req: NextRequest) => {
  try {
    const body = ProductsModel.omit({ id: true }).parse(
      await getBodyAsync(req)
    );
    const created = await db.products.create({
      data: body,
    });
    return NextResponse.json(created);
  } catch (err) {
    return errorResponse(err as Error);
  }
}, false);
