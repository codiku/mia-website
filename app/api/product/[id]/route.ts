import { deleteProduct, readProduct, updateProduct } from "@/app/actions/product/actions";
import {
  DeleteProductModelUriParams,
  GetProductModelUriParams,
  PatchProductModelBody,
  PatchProductModelUriParams,
} from "@/app/api/product/models";
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
  {auth: true, uriParams: GetProductModelUriParams}
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
  {auth: true, uriParams: PatchProductModelUriParams, body: PatchProductModelBody}
);


export const DELETE = safeEndPoint(
  async (_req: NextRequest, route) => {
    try{
      const deletedProduct = deleteProduct(route.params.id);
      return NextResponse.json(deletedProduct);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  },
  {auth: true, uriParams: DeleteProductModelUriParams}
);