import { ID_OBJECT_MODEL } from "@/libs/models";
import { ProductModel } from "@/prisma/zod";
import { z } from "zod";

export const CreateProductModelArgs = ProductModel.omit({ id: true });
export const ReadProductModelArgs = z.number();
export const UpdateProductModelArgs = ProductModel.partial().merge(ID_OBJECT_MODEL);
export const DeleteProductModelArgs = z.number();
