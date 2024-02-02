import { ProductModel } from "@/prisma/zod";

export const PostProductModelBody = ProductModel.omit({ id: true });
export const PatchProductModelBody = ProductModel.partial().omit({ id: true });
