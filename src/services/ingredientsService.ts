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

export async function getNutrientTotalByDay(countedDayId: string) {
    const query = await ingredientsRepo.getNutrientTotalByDay(countedDayId);
    const sum = {
        carbs: query._sum.carbs ?? 0,
        fats: query._sum.fats ?? 0,
        proteins: query._sum.proteins ?? 0,
        kcals: query._sum.kcals ?? 0,
    };
    return sum;
}
