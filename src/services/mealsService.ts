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

export async function getMealSummary(mealId: string, userId: string) {
    const meal = await mealRepo.getMealBasicInfo(mealId);

    if (meal.dailyLog.userId !== userId) {
        throw new ApiError("User does not have a meal with provided id", 404);
    }

    const mealSummary = await ingredientRepo.getIngredientsSummary(mealId);
    return { id: mealId, name: meal.name, description: meal.description, createdAt: meal.createdAt, ...mealSummary };
}

export async function getMealsByDay(dailyLogId: string, userId: string) {
    const dailyLog = await dailyLogRepo.getDayBasicInfo(dailyLogId);

    if (dailyLog.userId !== userId) {
        throw new ApiError(
            "User does not have a daily-log with provided id",
            404
        );
    }

    const meals = await mealRepo.getMealsList(dailyLogId);

    return meals;
}

export async function deleteMeal(mealId: string, userId: string) {
    const meal = await mealRepo.getMealBasicInfo(mealId);

    if (meal.dailyLog.userId !== userId) {
        throw new ApiError("User does not have a meal with provided id", 404);
    }

    return await mealRepo.deleteMeal(mealId);
}
