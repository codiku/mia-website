import { IdParamsModel } from "@/libs/models";
import { AnimalModel } from "@/prisma/zod";

export const PostAnimalModelBody = AnimalModel.omit({ id: true });
export const PatchAnimalModelBody = AnimalModel.partial().omit({ id: true });
export const PatchAnimalModelUriParams = IdParamsModel;
export const GetAnimalModelUriParams = IdParamsModel;
export const DeleteAnimalModelUriParams = IdParamsModel;
