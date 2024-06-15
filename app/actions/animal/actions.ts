"use server";
import { db } from "@/libs/db";
import { safeAction } from "@/libs/request";
import { Animal } from "@prisma/client";
import {
  CreateAnimalModelArgs,
  DeleteAnimalModelArgs,
  ReadAnimalModelArgs,
  UpdateAnimalModelArgs,
} from "./models";

export const createAnimal = safeAction(async (data): Promise<Animal> => {
  return db.animal.create({
    data,
  });
}, CreateAnimalModelArgs);

export const readAnimal = safeAction(async (id): Promise<Animal | null> => {
  return db.animal.findUnique({
    where: { id },
  });
}, ReadAnimalModelArgs);

export const readAllAnimal = safeAction(async (): Promise<Animal[]> => {
  return db.animal.findMany();
});

export const updateAnimal = safeAction(async ({ id, ...data }): Promise<Animal> => {
  return db.animal.update({
    where: { id },
    data,
  });
}, UpdateAnimalModelArgs);

export const deleteAnimal = safeAction(async (id): Promise<Animal> => {
  return db.animal.delete({
    where: { id },
  });
}, DeleteAnimalModelArgs);