import { createAnimal, readAllAnimal } from "@/app/actions/animal/actions";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PostAnimalModelBody } from "./models";
import "./doc";


  export const GET = safeEndPoint(async (_req: NextRequest) => {
    try{
      const animal = await readAllAnimal();
      return NextResponse.json(animal);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }, {auth: true});

  export const POST = safeEndPoint(
  async (_req: NextRequest, _, body) => {
    try{
      const created = await createAnimal(body);
      return NextResponse.json(created);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, body: PostAnimalModelBody }
);