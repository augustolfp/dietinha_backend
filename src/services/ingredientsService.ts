import * as ingredientsRepo from "../repositories/ingredientsRepository";
import * as mealsRepo from "../repositories/mealsRepository";
import { IIngredientData } from "../types/ingredientType";
import { ApiError } from "../helpers/api-errors";

export async function createIngredient(
    ingredient: IIngredientData,
    userId: string
) {
    const mealOwnerId = await mealsRepo.getMealOwner(ingredient.mealId);

    if (mealOwnerId !== userId) {
        throw new ApiError("User does not have a meal with provided id", 404);
    }

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

export async function deleteIngredient(ingredientId: string, userId: string) {
    const { mealId } = await ingredientsRepo.findIngredient(ingredientId);
    const ingredientOwner = await mealsRepo.getMealOwner(mealId);

    if (ingredientOwner !== userId) {
        throw new ApiError(
            "User does not have a ingredient with provided id",
            404
        );
    }

    return await ingredientsRepo.deleteIngredient(ingredientId);
}
