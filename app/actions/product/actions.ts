"use server";
import { db } from "@/libs/db";
import { createServerAction } from "zsa";
import { authProcedure } from "../auth/actions";
import {
  CreateProductSchemaArgs,
  DeleteProductSchemaArgs,
  ReadProductSchemaArgs,
  UpdateProductSchemaArgs,
} from "./schemas";

export const createProduct = authProcedure
  .createServerAction()
  .input(CreateProductSchemaArgs)
  .handler(async ({ input }) => {
    return db.product.create({
      data: input,
    });
  });

export const readProduct = createServerAction()
  .input(ReadProductSchemaArgs)
  .handler(async ({ input }) => {
    return db.product.findUnique({
      where: { id: input.id },
    });
  });

export const readAllProduct = createServerAction().handler(async () => {
  return db.product.findMany();
});

export const updateProduct = authProcedure
  .createServerAction()
  .input(UpdateProductSchemaArgs)
  .handler(async ({ input }) => {
    const { id, ...data } = input;
    return db.product.update({
      where: { id },
      data,
    });
  });

export const deleteProduct = authProcedure
  .createServerAction()
  .input(DeleteProductSchemaArgs)
  .handler(async ({ input }) => {
    return db.product.delete({
      where: { id: input.id },
    });
  });
