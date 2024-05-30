import { deleteAnimal, readAnimal, updateAnimal } from "@/app/actions/animal/actions";
import {
  DeleteAnimalModelUriParams,
  GetAnimalModelUriParams,
  PatchAnimalModelBody,
  PatchAnimalModelUriParams,
} from "@/app/api/animal/models";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const response = await readAnimal(Number(route.params.id));
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: GetAnimalModelUriParams}
);

export const PATCH = safeEndPoint(
  async (_req: NextRequest, route, body) => {
    try{
      const updatedAnimal = await updateAnimal({ id: Number(route.params.id), ...body });
      return NextResponse.json(updatedAnimal);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: PatchAnimalModelUriParams, body: PatchAnimalModelBody}
);

export const DELETE = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const deletedAnimal = deleteAnimal(Number(route.params.id));
      return NextResponse.json(deletedAnimal);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: DeleteAnimalModelUriParams}
);