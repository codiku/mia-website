"use server";
import { db } from "@/libs/db";
import { safeAction } from "@/libs/request";
import {
  CreateProductModelArgs,
  DeleteProductModelArgs,
  ReadProductModelArgs,
  UpdateProductModelArgs,
} from "./product-model-action";

export const createProduct = safeAction(async (data) => {
  return db.product.create({
    data,
  });
}, CreateProductModelArgs);

export const readAllProducts = safeAction(async () => {
  return db.product.findMany({});
});

export const updateProduct = safeAction(async ({ id, ...data }) => {
  return db.product.update({
    where: { id },
    data,
  });
}, UpdateProductModelArgs);

export const readProduct = safeAction(async (id) => {
  return db.product.findUnique({
    where: { id },
  });
}, ReadProductModelArgs);

export const deleteProduct = safeAction(async (id) => {
  return db.product.delete({
    where: { id },
  });
}, DeleteProductModelArgs);
