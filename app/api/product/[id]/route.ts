import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { ProductModel } from "@/prisma/zod";
import { Product } from "@prisma/client";
import { safeEndPoint } from "@/utils/jwt";

export const GET = safeEndPoint(async (req: NextRequest, route) => {
  let product: Product | null = null;
  const id = Number(route.params.id);
  if (id) {
    product = await db.product.findUnique({
      where: { id: id },
    });
  }
  return NextResponse.json(product || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);

export const PATCH = safeEndPoint(
  async (req: NextRequest, route, body) => {
    let product: Product | null = null;
    const id = Number(route.params.id);
    if (id) {
      product = await db.product.update({
        where: { id: id },
        data: body,
      });
      return NextResponse.json(
        product || { error: true, message: "Not found" },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }
  },
  true,
  ProductModel.partial()
);

export const DELETE = safeEndPoint(async (req: NextRequest, route) => {
  let product: Product | null = null;
  const id = Number(route.params.id);
  if (id) {
    product = await db.product.delete({
      where: { id: id },
    });
    return NextResponse.json(product || { error: true, message: "Not found" }, {
      status: StatusCodes.BAD_REQUEST,
    });
  }
}, true);
