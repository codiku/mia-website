"use server";
import { db } from "@/libs/db";
import { safeAction } from "@/libs/request";
import { Human } from "@prisma/client";
import {
  CreateHumanModelArgs,
  DeleteHumanModelArgs,
  ReadHumanModelArgs,
  UpdateHumanModelArgs,
} from "./models";

export const createHuman = safeAction(async (data): Promise<Human> => {
  return db.human.create({
    data,
  });
}, CreateHumanModelArgs);

export const readHuman = safeAction(async (id): Promise<Human | null> => {
  return db.human.findUnique({
    where: { id },
  });
}, ReadHumanModelArgs);

export const readAllHuman = safeAction(async (): Promise<Human[]> => {
  return db.human.findMany();
});

export const updateHuman = safeAction(async ({ id, ...data }): Promise<Human> => {
  return db.human.update({
    where: { id },
    data,
  });
}, UpdateHumanModelArgs);

export const deleteHuman = safeAction(async (id): Promise<Human> => {
  return db.human.delete({
    where: { id },
  });
}, DeleteHumanModelArgs);