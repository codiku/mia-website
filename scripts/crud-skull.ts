module.exports = {
  apiModelSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { IdParamsModel } from "@/libs/models";
import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";

export const Post${pascalCaseEndpoint}ModelBody = ${pascalCaseEndpoint}Model.omit({ id: true });
export const Patch${pascalCaseEndpoint}ModelBody = ${pascalCaseEndpoint}Model.partial().omit({ id: true });
export const Patch${pascalCaseEndpoint}ModelUriParams = IdParamsModel;
export const Get${pascalCaseEndpoint}ModelUriParams = IdParamsModel;
export const Delete${pascalCaseEndpoint}ModelUriParams = IdParamsModel;`,
  modelActionSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { IdArgModels } from "@/libs/models";
import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";
import { z } from "zod";

export const Create${pascalCaseEndpoint}ModelArgs = ${pascalCaseEndpoint}Model.omit({ id: true });
export const Read${pascalCaseEndpoint}ModelArgs = z.number();
export const Update${pascalCaseEndpoint}ModelArgs = ${pascalCaseEndpoint}Model.partial().merge(IdArgModels);
export const Delete${pascalCaseEndpoint}ModelArgs = z.number();`,

  actionSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `"use server";
import { db } from "@/libs/db";
import { safeAction } from "@/libs/request";
import { ${pascalCaseEndpoint} } from "@prisma/client";
import {
  Create${pascalCaseEndpoint}ModelArgs,
  Delete${pascalCaseEndpoint}ModelArgs,
  Read${pascalCaseEndpoint}ModelArgs,
  Update${pascalCaseEndpoint}ModelArgs,
} from "./models";

export const create${pascalCaseEndpoint} = safeAction(async (data): Promise<${pascalCaseEndpoint}> => {
  return db.${camelCaseEndpoint}.create({
    data,
  });
}, Create${pascalCaseEndpoint}ModelArgs);

export const readAll${pascalCaseEndpoint} = safeAction(async (): Promise<${pascalCaseEndpoint}[]> => {
  return db.${camelCaseEndpoint}.findMany();
});

export const update${pascalCaseEndpoint} = safeAction(async ({ id, ...data }): Promise<${pascalCaseEndpoint}> => {
  return db.${camelCaseEndpoint}.update({
    where: { id },
    data,
  });
}, Update${pascalCaseEndpoint}ModelArgs);

export const read${pascalCaseEndpoint} = safeAction(async (id): Promise<${pascalCaseEndpoint} | null> => {
  return db.${camelCaseEndpoint}.findUnique({
    where: { id },
  });
}, Read${pascalCaseEndpoint}ModelArgs);

export const delete${pascalCaseEndpoint} = safeAction(async (id): Promise<${pascalCaseEndpoint}> => {
  return db.${camelCaseEndpoint}.delete({
    where: { id },
  });
}, Delete${pascalCaseEndpoint}ModelArgs);`,

  pageLevel1ImportsSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { create${pascalCaseEndpoint}, readAll${pascalCaseEndpoint} } from "@/app/actions/${camelCaseEndpoint}/actions";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Post${pascalCaseEndpoint}ModelBody } from "./models";`,

  pageLevel2ImportsSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { delete${pascalCaseEndpoint}, read${pascalCaseEndpoint}, update${pascalCaseEndpoint} } from "@/app/actions/${camelCaseEndpoint}/actions";
import {
  Delete${pascalCaseEndpoint}ModelUriParams,
  Get${pascalCaseEndpoint}ModelUriParams,
  Patch${pascalCaseEndpoint}ModelBody,
  Patch${pascalCaseEndpoint}ModelUriParams,
} from "@/app/api/${camelCaseEndpoint}/models";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";`,

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
export const POST = safeEndPoint(
  async (_req: NextRequest, _, body) => {
    const created = await create${pascalCaseEndpoint}(body);
    return NextResponse.json(created);
  },
  true,
  undefined,
  Post${pascalCaseEndpoint}ModelBody
);`,
  getAllSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `/**
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
  export const GET = safeEndPoint(async (_req: NextRequest) => {
    const ${camelCaseEndpoint} = await readAll${pascalCaseEndpoint}();
    return NextResponse.json(${camelCaseEndpoint});
  }, true);`,

  getSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
/**
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
export const GET = safeEndPoint(
  async (_req: NextRequest, route) => {
    const response = await read${pascalCaseEndpoint}(Number(route.params.id));
    return NextResponse.json(response);
  },
  true,
  Get${pascalCaseEndpoint}ModelUriParams
);`,

  patchSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
/**
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
export const PATCH = safeEndPoint(
  async (_req: NextRequest, route, body) => {
    const updated${pascalCaseEndpoint} = await update${pascalCaseEndpoint}({ id: Number(route.params.id), ...body });
    return NextResponse.json(updated${pascalCaseEndpoint});
  },
  true,
  Patch${pascalCaseEndpoint}ModelUriParams,
  Patch${pascalCaseEndpoint}ModelBody
);`,

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
export const DELETE = safeEndPoint(
  async (_req: NextRequest, route) => {
    const deleted${pascalCaseEndpoint} = delete${pascalCaseEndpoint}(Number(route.params.id));
    return NextResponse.json(deleted${pascalCaseEndpoint});
  },
  true,
  Delete${pascalCaseEndpoint}ModelUriParams
);`,
};
