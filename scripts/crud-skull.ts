module.exports = {
  pageLevel1ImportsSkull : (camelCaseEndpoint: string,
    pascalCaseEndpoint: string)=>`import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/libs/db";
import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";
import { ${pascalCaseEndpoint} } from "@prisma/client";
import { safeEndPoint } from "@/libs/jwt";
import { Post${pascalCaseEndpoint}ModelBody } from "@/libs/models";`,

  pageLevel2ImportsSkull: (camelCaseEndpoint: string,
    pascalCaseEndpoint: string)=>`import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/libs/db";
import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";
import { ${pascalCaseEndpoint} } from "@prisma/client";
import { safeEndPoint } from "@/libs/jwt";
import { Patch${pascalCaseEndpoint}ModelBody } from "@/libs/models";`,
  
  postSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) =>
    `/**
 * @swagger
 * /api/${camelCaseEndpoint}:
 *   post:
 *     description: Create a new ${camelCaseEndpoint}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post${pascalCaseEndpoint}Body'
 *     responses:
 *       200:
 *         description: Returns the created ${camelCaseEndpoint}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post${pascalCaseEndpoint}'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} data is invalid
 */
    export const POST = safeEndPoint(async (req: NextRequest, route, body, _, token) => {
  const created = await db.${camelCaseEndpoint}.create({
    data: body,
  });
  return NextResponse.json(created);
}, true, Post${pascalCaseEndpoint}ModelBody);`,

  getAllSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `/**
  * @swagger
  * /api/${camelCaseEndpoint}:
  *   get:
  *     description: Get all ${camelCaseEndpoint}s
  *     responses:
  *       200:
  *         description: Returns a list of ${camelCaseEndpoint}s
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/${pascalCaseEndpoint}ProductModel'
  *       400:
  *         description: Bad request if the ${camelCaseEndpoint} data is invalid
  */
  export const GET = safeEndPoint(async (req: NextRequest) => {
  const ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.findMany({});
  return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);`,

  getSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `/**
 * @swagger
 * /api/${camelCaseEndpoint}/{id}:
 *   get:
 *     description: Get a specific ${camelCaseEndpoint} by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the requested ${camelCaseEndpoint}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${pascalCaseEndpoint}Model'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} id is invalid or not found
 */
  export const GET = safeEndPoint(async (req: NextRequest, route) => {
  let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
  const id = Number(route.params.id);
  if (id) {
    ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.findUnique({
      where: { id },
    });
  }
  return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
    status: StatusCodes.BAD_REQUEST,
  });
}, true);`,

  patchSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `/**
 * @swagger
 * /api/${camelCaseEndpoint}/{id}:
 *   patch:
 *     description: Update a specific ${camelCaseEndpoint} by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patch${pascalCaseEndpoint}ModelBody'
 *     responses:
 *       200:
 *         description: Returns the updated ${camelCaseEndpoint}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${pascalCaseEndpoint}Model'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} id is invalid or not found
 */
export const PATCH = safeEndPoint(async (req: NextRequest, route, body) => {
  let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
  const id = Number(route.params.id);
  if (id) {
    ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.update({
      where: { id },
      data: body
    });
    return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
      status: StatusCodes.BAD_REQUEST,
    });
  }
}, true, Patch${pascalCaseEndpoint}ModelBody);`,

  deleteSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
  /**
 * @swagger
 * /api/${camelCaseEndpoint}/{id}:
 *   delete:
 *     description: Delete a specific ${camelCaseEndpoint} by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${pascalCaseEndpoint}Model'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} id is invalid or not found
 */
export const DELETE = safeEndPoint(async (req: NextRequest, route) => {
  let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
  const id = Number(route.params.id);
  if (id) {
    ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.delete({
      where: { id }
    });
    return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
      status: StatusCodes.BAD_REQUEST,
    });
  }
}, true);`,
};
