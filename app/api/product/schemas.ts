import { IdParamsSchema } from "@/libs/schemas";
import { ProductSchema } from "@/prisma/zod";

export const PostProductSchemaBody = ProductSchema.omit({ id: true });
export const PatchProductSchemaBody = ProductSchema.partial().omit({ id: true });
export const PatchProductSchemaUriParams = IdParamsSchema;
export const GetProductSchemaUriParams = IdParamsSchema;
export const DeleteProductSchemaUriParams = IdParamsSchema;
