module.exports = {
  apiSchemaSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { IdParamsSchema } from "@/libs/schema";
import { ${pascalCaseEndpoint}Schema } from "@/prisma/zod";

export const Post${pascalCaseEndpoint}SchemaBody = ${pascalCaseEndpoint}Schema.omit({ id: true });
export const Patch${pascalCaseEndpoint}SchemaBody = ${pascalCaseEndpoint}Schema.partial().omit({ id: true });
export const Patch${pascalCaseEndpoint}SchemaUriParams = IdParamsSchema;
export const Get${pascalCaseEndpoint}SchemaUriParams = IdParamsSchema;
export const Delete${pascalCaseEndpoint}SchemaUriParams = IdParamsSchema;
`,
  schemaActionSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { IdArgSchema } from "@/libs/schemas";
import { ${pascalCaseEndpoint}Schema } from "@/prisma/zod";
import { z } from "zod";

export const Create${pascalCaseEndpoint}SchemaArgs = ${pascalCaseEndpoint}Schema.omit({ id: true });
export const Read${pascalCaseEndpoint}SchemaArgs = z.number();
export const Update${pascalCaseEndpoint}SchemaArgs = ${pascalCaseEndpoint}Schema.partial().merge(IdArgSchema);
export const Delete${pascalCaseEndpoint}SchemaArgs = z.number();`,

  actionSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `"use server";
import { db } from "@/libs/db";
import { safeAction } from "@/libs/request";
import { ${pascalCaseEndpoint} } from "@prisma/client";
import {
  Create${pascalCaseEndpoint}SchemaArgs,
  Delete${pascalCaseEndpoint}SchemaArgs,
  Read${pascalCaseEndpoint}SchemaArgs,
  Update${pascalCaseEndpoint}SchemaArgs,
} from "./schemas";

export const create${pascalCaseEndpoint} = safeAction(async (data): Promise<${pascalCaseEndpoint}> => {
  return db.${camelCaseEndpoint}.create({
    data,
  });
}, Create${pascalCaseEndpoint}SchemaArgs);

export const read${pascalCaseEndpoint} = safeAction(async (id): Promise<${pascalCaseEndpoint} | null> => {
  return db.${camelCaseEndpoint}.findUnique({
    where: { id },
  });
}, Read${pascalCaseEndpoint}SchemaArgs);

export const readAll${pascalCaseEndpoint} = safeAction(async (): Promise<${pascalCaseEndpoint}[]> => {
  return db.${camelCaseEndpoint}.findMany();
});

export const update${pascalCaseEndpoint} = safeAction(async ({ id, ...data }): Promise<${pascalCaseEndpoint}> => {
  return db.${camelCaseEndpoint}.update({
    where: { id },
    data,
  });
}, Update${pascalCaseEndpoint}SchemaArgs);

export const delete${pascalCaseEndpoint} = safeAction(async (id): Promise<${pascalCaseEndpoint}> => {
  return db.${camelCaseEndpoint}.delete({
    where: { id },
  });
}, Delete${pascalCaseEndpoint}SchemaArgs);`,

  pageLevel1ImportsSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { create${pascalCaseEndpoint}, readAll${pascalCaseEndpoint} } from "@/app/actions/${camelCaseEndpoint}/actions";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Post${pascalCaseEndpoint}SchemaBody } from "./schemas";
import "./doc";`,

  pageLevel2ImportsSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { delete${pascalCaseEndpoint}, read${pascalCaseEndpoint}, update${pascalCaseEndpoint} } from "@/app/actions/${camelCaseEndpoint}/actions";
import {
  Delete${pascalCaseEndpoint}SchemaUriParams,
  Get${pascalCaseEndpoint}SchemaUriParams,
  Patch${pascalCaseEndpoint}SchemaBody,
  Patch${pascalCaseEndpoint}SchemaUriParams,
} from "@/app/api/${camelCaseEndpoint}/schemas";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";`,
  docSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `/**
  * @swagger
  * /api/${camelCaseEndpoint}:
  *   post:
  *     tags:
  *       - ${pascalCaseEndpoint}
  *     description: Create a new ${camelCaseEndpoint}
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Post${pascalCaseEndpoint}SchemaBody'
  *     responses:
  *       200:
  *         description: Returns the created ${camelCaseEndpoint}
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/${pascalCaseEndpoint}Schema'
  *       400:
  *         description: Bad request if the ${camelCaseEndpoint} data is invalid
  */
  
  /**
  * @swagger
  * /api/${camelCaseEndpoint}:
  *   get:
  *     tags:
  *       - ${pascalCaseEndpoint}
  *     description: Get all ${camelCaseEndpoint}s
  *     responses:
  *       200:
  *         description: Returns a list of ${camelCaseEndpoint}s
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/${pascalCaseEndpoint}Schema'
  *       400:
  *         description: Bad request if the ${camelCaseEndpoint} data is invalid
  */

  /**
 * @swagger
 * /api/${camelCaseEndpoint}/{id}:
 *   get:
 *     tags:
 *       - ${pascalCaseEndpoint}
 *     description: Get a specific ${camelCaseEndpoint} by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns the requested ${camelCaseEndpoint}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${pascalCaseEndpoint}Schema'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} id is invalid or not found
 */

  /**
 * @swagger
 * /api/${camelCaseEndpoint}/{id}:
 *   patch:
 *     tags:
 *       - ${pascalCaseEndpoint}
 *     description: Update a specific ${camelCaseEndpoint} by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patch${pascalCaseEndpoint}SchemaBody'
 *     responses:
 *       200:
 *         description: Returns the updated ${camelCaseEndpoint}
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${pascalCaseEndpoint}Schema'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} id is invalid or not found
 */

  /**
 * @swagger
 * /api/${camelCaseEndpoint}/{id}:
 *   delete:
 *     tags:
 *       - ${pascalCaseEndpoint}
 *     description: Delete a specific ${camelCaseEndpoint} by id
 *     parameters:
 *       - $ref: '#/components/parameters/id'
 *     responses:
 *       200:
 *         description: Returns a success message upon deletion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/${pascalCaseEndpoint}Schema'
 *       400:
 *         description: Bad request if the ${camelCaseEndpoint} id is invalid or not found
 */
  `,
  postSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
  export const POST = safeEndPoint(
  async (_req: NextRequest, _, body) => {
    try{
      const created = await create${pascalCaseEndpoint}(body);
      return NextResponse.json(created);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, body: Post${pascalCaseEndpoint}SchemaBody }
);`,
  getAllSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
  export const GET = safeEndPoint(async (_req: NextRequest) => {
    try{
      const ${camelCaseEndpoint} = await readAll${pascalCaseEndpoint}();
      return NextResponse.json(${camelCaseEndpoint});
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }, {auth: true});`,

  getSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const GET = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const response = await read${pascalCaseEndpoint}(Number(route.params.id));
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: Get${pascalCaseEndpoint}SchemaUriParams}
);`,

  patchSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const PATCH = safeEndPoint(
  async (_req: NextRequest, route, body) => {
    try{
      const updated${pascalCaseEndpoint} = await update${pascalCaseEndpoint}({ id: Number(route.params.id), ...body });
      return NextResponse.json(updated${pascalCaseEndpoint});
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: Patch${pascalCaseEndpoint}SchemaUriParams, body: Patch${pascalCaseEndpoint}SchemaBody}
);`,

  deleteSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const DELETE = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const deleted${pascalCaseEndpoint} = delete${pascalCaseEndpoint}(Number(route.params.id));
      return NextResponse.json(deleted${pascalCaseEndpoint});
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: Delete${pascalCaseEndpoint}SchemaUriParams}
);`,
};
