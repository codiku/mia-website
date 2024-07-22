import { IdArgSchema } from "@/libs/schema";
import { ProductSchema } from "@/prisma/zod";

export const CreateProductSchemaArgs = ProductSchema.omit({ id: true });
export const ReadProductSchemaArgs = IdArgSchema;
export const UpdateProductSchemaArgs = ProductSchema.partial().merge(IdArgSchema);
export const DeleteProductSchemaArgs = IdArgSchema;
