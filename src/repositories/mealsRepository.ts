import { prisma } from "../config/database";
import { IMealData } from "../types/mealType";

export async function createMeal(meal: IMealData) {
    return await prisma.meals.create({
        data: meal,
    });
}

export async function getMealsList(dailyLogId: string) {
    const mealsList = await prisma.meals.findMany({
        where: {
            dailyLogId: dailyLogId,
        },
    });

    return mealsList;
}
