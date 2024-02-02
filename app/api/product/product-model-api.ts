import { ID_OBJECT_MODEL } from "@/libs/models";
import { ProductModel } from "@/prisma/zod";

export const PostProductModelBody = ProductModel.omit({ id: true });
export const PatchProductModelBody =
  ProductModel.partial().merge(ID_OBJECT_MODEL);
