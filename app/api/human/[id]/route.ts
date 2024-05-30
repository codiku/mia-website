import { deleteHuman, readHuman, updateHuman } from "@/app/actions/human/actions";
import {
  DeleteHumanModelUriParams,
  GetHumanModelUriParams,
  PatchHumanModelBody,
  PatchHumanModelUriParams,
} from "@/app/api/human/models";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const response = await readHuman(Number(route.params.id));
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: GetHumanModelUriParams}
);

export const PATCH = safeEndPoint(
  async (_req: NextRequest, route, body) => {
    try{
      const updatedHuman = await updateHuman({ id: Number(route.params.id), ...body });
      return NextResponse.json(updatedHuman);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: PatchHumanModelUriParams, body: PatchHumanModelBody}
);

export const DELETE = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const deletedHuman = deleteHuman(Number(route.params.id));
      return NextResponse.json(deletedHuman);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: DeleteHumanModelUriParams}
);