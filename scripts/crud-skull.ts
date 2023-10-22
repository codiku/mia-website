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

export const POST = safeEndPoint(async (req: NextRequest,route,body,_,token) => {
      const created = await db.${camelCaseEndpoint}.create({
        data: body,
      });
      return NextResponse.json(created);
      
    }, true, ${pascalCaseEndpoint}Model.omit({ id: true }));`,

  getAllSkull: (
    camelCaseEndpoint: string,
    pascalCaseEndpoint: string
  ) => `import { NextRequest, NextResponse } from "next/server";
  import { StatusCodes } from "http-status-codes";
  import { db } from "@/utils/db";
  import { ${pascalCaseEndpoint}Model } from "@/prisma/zod";
  import { ${pascalCaseEndpoint} } from "@prisma/client";
  import { safeEndPoint } from "@/utils/jwt";
  
  export const GET = safeEndPoint(
    async (req: NextRequest) => {
   
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.findMany({});
        return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
          status: StatusCodes.BAD_REQUEST,
        });
     
    true
  );`,

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
  async (req: NextRequest, route) => {
 
      let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
      let id = route.params.id
      if (id) {
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.findUnique({
          where: { id: id },
        });
      }
      return NextResponse.json(${camelCaseEndpoint} || { error: true, message: "Not found" }, {
        status: StatusCodes.BAD_REQUEST,
      });
  
  },
  true
);`,


  patchSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const PATCH = safeEndPoint(
  async (req: NextRequest, route, body) => {
      let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
      let id = route.params.id
      if (id) {
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.update({ where: { id: id }, data: body });
        return NextResponse.json(
          ${camelCaseEndpoint} || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
   
  },
  true,
  ${pascalCaseEndpoint}Model.partial()
);`,

  deleteSkull: (camelCaseEndpoint: string, pascalCaseEndpoint: string) => `
export const DELETE = safeEndPoint(
  async (req: NextRequest, route) => {
      let ${camelCaseEndpoint}: ${pascalCaseEndpoint} | null = null;
      let id = route.params.id
      if (id) {
        ${camelCaseEndpoint} = await db.${camelCaseEndpoint}.delete({ where: { id: id } });
        return NextResponse.json(
          ${camelCaseEndpoint} || { error: true, message: "Not found" },
          {
            status: StatusCodes.BAD_REQUEST,
          }
        );
      }
  },
  true
);`,
};
