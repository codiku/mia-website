import { IdParamsModel } from "@/libs/models";
import { ProductModel } from "@/prisma/zod";

export const PostProductModelBody = ProductModel.omit({ id: true });
export const PatchProductModelBody = ProductModel.partial().omit({ id: true });
export const PatchProductModelUriParams = IdParamsModel;
export const GetProductModelUriParams = IdParamsModel;
export const DeleteProductModelUriParams = IdParamsModel;
