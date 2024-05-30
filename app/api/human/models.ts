import { IdParamsModel } from "@/libs/models";
import { HumanModel } from "@/prisma/zod";

export const PostHumanModelBody = HumanModel.omit({ id: true });
export const PatchHumanModelBody = HumanModel.partial().omit({ id: true });
export const PatchHumanModelUriParams = IdParamsModel;
export const GetHumanModelUriParams = IdParamsModel;
export const DeleteHumanModelUriParams = IdParamsModel;
