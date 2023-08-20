import * as mealRepo from "../repositories/mealsRepository";
import * as ingredientRepo from "../repositories/ingredientsRepository";
import { IMealData } from "../types/mealType";

export async function createMeal(meal: IMealData) {
    return await mealRepo.createMeal(meal);
}

export async function getMealsDetailsByDay(dailyLogId: string) {
    const meals = await mealRepo.getMealsList(dailyLogId);

    const getWithPromiseAll = async () => {
        let data = await Promise.all(
            meals.map(async (meal) => {
                const ingredientsSummary =
                    await ingredientRepo.getIngredientsSummary(meal.id);
                return {
                    ...meal,
                    ...ingredientsSummary,
                };
            })
        );
        return data;
    };

    return getWithPromiseAll();
}
