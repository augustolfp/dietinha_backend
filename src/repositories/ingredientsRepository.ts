import { prisma } from "../config/database";
import { IIngredientData } from "../types/ingredientType";

export async function createIngredient(ingredient: IIngredientData) {
    return await prisma.ingredients.create({
        data: ingredient,
    });
}

export async function getIngredientsSummary(mealId: string) {
    const ingredientsList = await prisma.ingredients.findMany({
        where: {
            mealId: mealId,
        },
    });

    const nutrientsSubTotal = await prisma.ingredients.aggregate({
        _sum: {
            carbs: true,
            fats: true,
            proteins: true,
            kcals: true,
        },
        where: {
            mealId: mealId,
        },
    });

    const ingredientsSummary = {
        carbs: nutrientsSubTotal._sum.carbs ?? 0,
        fats: nutrientsSubTotal._sum.fats ?? 0,
        proteins: nutrientsSubTotal._sum.proteins ?? 0,
        kcals: nutrientsSubTotal._sum.kcals ?? 0,
        ingredientsList: ingredientsList,
    };

    return ingredientsSummary;
}

export async function getNutrientTotalByDay(dailyLogId: string) {
    return await prisma.ingredients.aggregate({
        _sum: {
            carbs: true,
            fats: true,
            proteins: true,
            kcals: true,
        },
        where: {
            meal: {
                dailyLogId: dailyLogId,
            },
        },
    });
}

export async function findIngredient(ingredientId: string) {
    return await prisma.ingredients.findUnique({
        where: {
            id: ingredientId,
        },
    });
}

export async function deleteIngredient(ingredientId: string) {
    return await prisma.ingredients.delete({
        where: {
            id: ingredientId,
        },
    });
}
