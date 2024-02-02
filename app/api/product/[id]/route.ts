import { readProduct } from "@/app/actions/products/product";
import { PatchProductModelBody } from "@/app/api/product/product-model-api";
import { db } from "@/libs/db";
import { safeEndPoint } from "@/libs/jwt";
import { ID_URI_PARAMS_MODEL } from "@/libs/models";
import { Product } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     description: Get a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModel'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */
export const GET = safeEndPoint(
  async (_req: NextRequest, route) => {
    const response = await readProduct(Number(route.params.id));
    return NextResponse.json(response);
  },
  true,
  ID_URI_PARAMS_MODEL
);
/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     description: Update a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchProductModelBody'
 *     responses:
 *       200:
 *         description: Returns the updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModel'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */
export const PATCH = safeEndPoint(
  async (req: NextRequest, route, body) => {
    let product: Product | null = null;
    const id = Number(route.params.id);
    if (id) {
      product = await db.product.update({
        where: { id },
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
  ID_URI_PARAMS_MODEL,
  PatchProductModelBody
);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     description: Delete a specific product by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModel'
 *       400:
 *         description: Bad request if the product id is invalid or not found
 */
export const DELETE = safeEndPoint(
  async (req: NextRequest, route) => {
    let product: Product | null = null;
    const id = Number(route.params.id);
    if (id) {
      product = await db.product.delete({
        where: { id },
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
  ID_URI_PARAMS_MODEL
);
