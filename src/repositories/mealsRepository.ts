import { prisma } from "../config/database";
import { IMealData } from "../types/mealType";
import { ApiError } from "../helpers/api-errors";

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

export async function getMealBasicInfo(mealId: string) {
    try {
        const meal = await prisma.meals.findUniqueOrThrow({
            where: {
                id: mealId,
            },
            select: {
                dailyLog: {
                    select: {
                        userId: true,
                    },
                },
                name: true,
                description: true,
                createdAt: true
            },
        });
        return meal
    } catch (err) {
        throw new ApiError("User does not have a meal with provided id", 404);
    }
}

export async function deleteMeal(mealId: string) {
    return await prisma.meals.delete({
        where: {
            id: mealId,
        },
    });
}
