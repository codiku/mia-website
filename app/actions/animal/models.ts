import { IdArgModels } from "@/libs/schema";
import { AnimalModel } from "@/prisma/zod";
import { z } from "zod";

export const CreateAnimalModelArgs = AnimalModel.omit({ id: true });
export const ReadAnimalModelArgs = z.number();
export const UpdateAnimalModelArgs = AnimalModel.partial().merge(IdArgModels);
export const DeleteAnimalModelArgs = z.number();