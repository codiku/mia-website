import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { ProductsModel } from "@/prisma/zod";
import { Products } from "@prisma/client";
import { safeEndPoint } from "@/utils/jwt";

export const GET = safeEndPoint(
  async (req: NextRequest, route) => {
    try {
      let products: Products | null = null;
      let id = Number(route.params.id);
      if (id) {
        products = await db.products.findUnique({
          where: { id: id },
        });
      }
      return NextResponse.json(products || { error: true, message: "Not found" }, {
        status: StatusCodes.BAD_REQUEST,
      });
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  true
);

export const PATCH = safeEndPoint(
  async (req: NextRequest, route, body) => {
      let products: Products | null = null;
      let id = Number(route.params.id);
      if (id) {
        products = await db.products.update({ where: { id: id }, data: body });
        return NextResponse.json(
          products || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
   
  },
  true,
  ProductsModel.partial()
);

export const DELETE = safeEndPoint(
  async (req: NextRequest, route) => {
      let products: Products | null = null;
      let id = Number(route.params.id);
      if (id) {
        products = await db.products.delete({ where: { id: id } });
        return NextResponse.json(
          products || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
  },
  true
);