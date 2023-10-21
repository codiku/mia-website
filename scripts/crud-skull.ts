module.exports = {
  postSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";
import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";
import { getToken } from "next-auth/jwt";
import { safeEndPoint } from "@/utils/jwt";

export const POST = safeEndPoint(async (req: NextRequest) => {
  try {
    if (await getToken({ req })) {
      const body = ${pascalCaseEndpoint}Model.omit({ id: true }).parse(await getBodyAsync(req));
      const created = await db.${camelCaseEndpoint}.create({
        data: body,
      });
      return NextResponse.json(created);
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}, true);`,

  getSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { errorResponse, getBodyAsync } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { db } from "@/utils/db";
import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";
import { ${pascalCaseEndpoint} } from "@prisma/client";
import { safeEndPoint } from "@/utils/jwt";

export const GET = safeEndPoint(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
      let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
      let id = Number(route.params.id);
      if (id) {
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.findUnique({
          where: { id: id },
        });
      }
      return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
        status: StatusCodes.BAD_REQUEST,
      });
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  true
);`,

  patchSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const PATCH = safeEndPoint(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
      let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
      let id = Number(route.params.id);
      if (id) {
        const body = ${pascalCaseEndpoint}Model.partial().parse(await getBodyAsync(req));
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.update({ where: { id: id }, data: body });
        return NextResponse.json(
          ${camelCaseEndpoint} || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  true
);`,

  deleteSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const DELETE = safeEndPoint(
  async (req: NextRequest, route: { params: { id: string } }) => {
    try {
      let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
      let id = Number(route.params.id);
      if (id) {
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.delete({ where: { id: id } });
        return NextResponse.json(
          ${camelCaseEndpoint} || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
    } catch (err) {
      return errorResponse(err as Error);
    }
  },
  true
);`,
};
