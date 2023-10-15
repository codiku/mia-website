import { auth } from "@/utils/jwt";
import { PASSWORD_MODEL, STRING_REQUIRED_MODEL, UPDATE_PASSWORD_MODEL } from "@/utils/models";
import { getBodyAsync, getParams, errorResponse } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export const PATCH = auth(async (req: NextRequest, route: { params: { id: string } }) => {
  try {
    const body = UPDATE_PASSWORD_MODEL.parse(await getBodyAsync(req));
    const params = .parse(getParams(req));
    const uriParams = route.params;

    return NextResponse.json({});
  } catch (err) {
    return errorResponse(err as Error);
  }
}, false);