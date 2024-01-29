import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/libs/db";
import { safeEndPoint } from "@/libs/jwt";
import { PostProductModelBody } from "@/libs/models";

/**
  * @swagger
  * /api/product:
  *   get:
  *     description: Get all products
  *     responses:
  *       200:
  *         description: Returns a list of products
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/ProductModel'
  *       400:
  *         description: Bad request if the product data is invalid
  */
  export const GET = safeEndPoint(async (req: NextRequest) => {
  const product = await db.product.findMany({});
  return NextResponse.json(product || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);
/**
 * @swagger
 * /api/product:
 *   post:
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostProductBody'
 *     responses:
 *       200:
 *         description: Returns the created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostProduct'
 *       400:
 *         description: Bad request if the product data is invalid
 */
    export const POST = safeEndPoint(async (req: NextRequest, route, body, _, token) => {
  const created = await db.product.create({
    data: body,
  });
  return NextResponse.json(created);
}, true, PostProductModelBody);