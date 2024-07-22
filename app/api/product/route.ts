import { createProduct, readAllProduct } from "@/app/actions/product/actions";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PostProductSchemaBody } from "./schemas";
import "./doc";


  export const GET = safeEndPoint(async (_req: NextRequest) => {
    try{
      const product = await readAllProduct();
      return NextResponse.json(product);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }, {auth: true});

  export const POST = safeEndPoint(
  async (_req: NextRequest, _, body) => {
    try{
      const created = await createProduct(body);
      return NextResponse.json(created);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, body: PostProductSchemaBody }
);