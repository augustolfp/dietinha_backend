import Joi from "joi";
import { IMealData } from "../types/mealType";

export const mealSchema = Joi.object<IMealData>({
    name: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    dailyLogId: Joi.string().required(),
});
