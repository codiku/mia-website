"use server";
import { db } from "@/libs/db";
import { safeAction } from "@/libs/request";
import { Product } from "@prisma/client";
import { CreateProductModelArgs, DeleteProductModelArgs, ReadProductModelArgs, UpdateProductModelArgs } from "./models";

export const createProduct = safeAction(async (data): Promise<Product> => {
  return db.product.create({
    data,
  });
}, CreateProductModelArgs);

export const readAllProduct = safeAction(async (): Promise<Product[]> => {
  return db.product.findMany();
});

export const updateProduct = safeAction(async ({ id, ...data }): Promise<Product> => {
  return db.product.update({
    where: { id },
    data,
  });
}, UpdateProductModelArgs);

export const readProduct = safeAction(async (id): Promise<Product | null> => {
  return db.product.findUnique({
    where: { id },
  });
}, ReadProductModelArgs);

export const deleteProduct = safeAction(async (id): Promise<Product> => {
  return db.product.delete({
    where: { id },
  });
}, DeleteProductModelArgs);
