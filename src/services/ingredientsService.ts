import * as ingredientsRepo from "../repositories/ingredientsRepository";
import { IIngredientData } from "../types/ingredientType";

export async function createIngredient(ingredient: IIngredientData) {
    const truncNumber = (number: number) => {
        return Number(number.toFixed(2));
    };

    const truncIng = {
        ...ingredient,
        weight: truncNumber(ingredient.weight),
        carbs: truncNumber(ingredient.carbs),
        fats: truncNumber(ingredient.fats),
        proteins: truncNumber(ingredient.proteins),
        kcals: truncNumber(ingredient.kcals),
    };

    return await ingredientsRepo.createIngredient(truncIng);
}
