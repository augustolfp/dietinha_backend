import Joi from "joi";
import { ICustomIngredientTableData } from "../types/customIngredientTableType";

export const customIngSchema = Joi.object<
    Omit<ICustomIngredientTableData, "userID">
>({
    description: Joi.string().required(),
    baseQty: Joi.number().required(),
    proteins: Joi.number().required(),
    carbs: Joi.number().required(),
    fats: Joi.number().required(),
    kcals: Joi.number().required(),
});
