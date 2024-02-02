import { createProduct, readAllProduct } from "@/app/actions/product/actions";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PostProductModelBody } from "./models";

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
export const GET = safeEndPoint(async (_req: NextRequest) => {
  const product = await readAllProduct();
  return NextResponse.json(product);
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
export const POST = safeEndPoint(
  async (_req: NextRequest, _, body) => {
    const created = await createProduct(body);
    return NextResponse.json(created);
  },
  true,
  undefined,
  PostProductModelBody
);
