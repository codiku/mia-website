import { deleteProduct, readProduct, updateProduct } from "@/app/actions/product/actions";
import {
  DeleteProductSchemaUriParams,
  GetProductSchemaUriParams,
  PatchProductSchemaBody,
  PatchProductSchemaUriParams,
} from "@/app/api/product/schemas";
import { safeEndPoint } from "@/libs/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const response = await readProduct(Number(route.params.id));
      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: GetProductSchemaUriParams}
);

export const PATCH = safeEndPoint(
  async (_req: NextRequest, route, body) => {
    try{
      const updatedProduct = await updateProduct({ id: Number(route.params.id), ...body });
      return NextResponse.json(updatedProduct);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: PatchProductSchemaUriParams, body: PatchProductSchemaBody}
);

export const DELETE = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const deletedProduct = deleteProduct(Number(route.params.id));
      return NextResponse.json(deletedProduct);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: DeleteProductSchemaUriParams}
);