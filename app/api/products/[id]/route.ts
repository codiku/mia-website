import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { ProductsModel } from "@/prisma/zod";
import { Products } from "@prisma/client";
import { auth } from "@/utils/jwt";

export const GET = auth(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
      let products: Products | null = null;
      let id = Number(route.params.id);
      if (id) {
        products = await db.products.findUnique({
          where: { id: id },
        });
      }
      return NextResponse.json(
        products || { error: true, message: "Not found" },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  false
);

export const PATCH = auth(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
      let products: Products | null = null;
      let id = Number(route.params.id);
      if (id) {
        const body = ProductsModel.partial().parse(await getBodyAsync(req));
        products = await db.products.update({ where: { id: id }, data: body });
        return NextResponse.json(
          products || { error: true, message: "Not found" },
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
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  false
);
