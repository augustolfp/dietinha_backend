import * as mealRepo from "../repositories/mealsRepository";
import * as ingredientRepo from "../repositories/ingredientsRepository";
import * as dailyLogRepo from "../repositories/dailyLogsRepository";
import { IMealData } from "../types/mealType";
import { ApiError } from "../helpers/api-errors";

export async function createMeal(meal: IMealData, userId: string) {
    const dailyLog = await dailyLogRepo.getDayBasicInfo(meal.dailyLogId);

    if (dailyLog.userId !== userId) {
        throw new ApiError(
            "User does not have a daily-log with provided id",
            404
        );
    }
    return await mealRepo.createMeal({
        ...meal,
        description: meal.description ?? "",
    });
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

export async function deleteMeal(mealId: string, userId: string) {
    const mealOwnerId = await mealRepo.getMealOwner(mealId);

    if (mealOwnerId !== userId) {
        throw new ApiError("User does not have a meal with provided id", 404);
    }

    return await mealRepo.deleteMeal(mealId);
}
