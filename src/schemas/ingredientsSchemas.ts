import Joi from "joi";
import { IIngredientData } from "../types/ingredientType";

export const ingredientSchema = Joi.object<IIngredientData>({
    name: Joi.string().required(),
    mealId: Joi.string().required(),
    weight: Joi.number().required(),
    carbs: Joi.number().required(),
    fats: Joi.number().required(),
    proteins: Joi.number().required(),
    kcals: Joi.number().required(),
});
