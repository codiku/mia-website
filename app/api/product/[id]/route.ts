import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/libs/db";
import { Product } from "@prisma/client";
import { safeEndPoint } from "@/libs/jwt";
import { PatchProductModelBody } from "@/libs/models";
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
  export const GET = safeEndPoint(async (req: NextRequest, route) => {
  let product: Product | null = null;
  const id = Number(route.params.id);
  if (id) {
    product = await db.product.findUnique({
      where: { id },
    });
  }
  return NextResponse.json(product || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);
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
export const PATCH = safeEndPoint(async (req: NextRequest, route, body) => {
  
  let product: Product | null = null;
  const id = Number(route.params.id);
  if (id) {
    product = await db.product.update({
      where: { id },
      data: body
    });
    return NextResponse.json(product || { error: true, message: "Not found" }, {
      status: StatusCodes.BAD_REQUEST,
    });
  }
}, true, PatchProductModelBody);

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
export const DELETE = safeEndPoint(async (req: NextRequest, route) => {
  let product: Product | null = null;
  const id = Number(route.params.id);
  if (id) {
    product = await db.product.delete({
      where: { id }
    });
    return NextResponse.json(product || { error: true, message: "Not found" }, {
      status: StatusCodes.BAD_REQUEST,
    });
  }
}, true);