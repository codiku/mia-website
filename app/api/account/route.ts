import { errorResponse, getBodyAsync, getParams } from "@/utils/request";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { StatusCodes } from "http-status-codes";

export async function POST(req: NextRequest) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const body = await getBodyAsync(req);

      return NextResponse.json({});
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const id: number = Number(route.params.id);
      const params = getParams(req);

      return NextResponse.json({});
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function PATCH(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const id: number = Number(route.params.id);
      const body = await getBodyAsync(req);

      return NextResponse.json({});
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const id: number = Number(route.params.id);
      const body = await getBodyAsync(req);

      return NextResponse.json({}, { status: StatusCodes.CREATED });
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}

export async function DELETE(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const jwtToken = await getToken({ req });
    if (jwtToken) {
      const id: number = Number(route.params.id);
      const body = await getBodyAsync(req);

      return NextResponse.json(
        {
          error: false,
          message: "",
        },
        { status: StatusCodes.NO_CONTENT }
      );
    }
  } catch (err) {
    return errorResponse(err as Error);
  }
}
