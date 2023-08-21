import Joi from "joi";
import { IIngredientData } from "../types/ingredientType";

export const ingredientSchema = Joi.object<IIngredientData>({
    name: Joi.string().required(),
    mealId: Joi.string().required(),
    weight: Joi.number().required().min(0),
    carbs: Joi.number().required().min(0),
    fats: Joi.number().required().min(0),
    proteins: Joi.number().required().min(0),
    kcals: Joi.number().required().min(0),
});
