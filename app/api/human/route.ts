import { createHuman, readAllHuman } from "@/app/actions/human/actions";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PostHumanModelBody } from "./models";
import "./doc";


  export const GET = safeEndPoint(async (_req: NextRequest) => {
    try{
      const human = await readAllHuman();
      return NextResponse.json(human);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }, {auth: true});

  export const POST = safeEndPoint(
  async (_req: NextRequest, _, body) => {
    try{
      const created = await createHuman(body);
      return NextResponse.json(created);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, body: PostHumanModelBody }
);