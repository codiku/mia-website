import { IdArgModels } from "@/libs/models";
import { HumanModel } from "@/prisma/zod";
import { z } from "zod";

export const CreateHumanModelArgs = HumanModel.omit({ id: true });
export const ReadHumanModelArgs = z.number();
export const UpdateHumanModelArgs = HumanModel.partial().merge(IdArgModels);
export const DeleteHumanModelArgs = z.number();