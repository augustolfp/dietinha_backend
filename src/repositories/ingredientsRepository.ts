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
        carbs: nutrientsSubTotal._sum.carbs,
        fats: nutrientsSubTotal._sum.fats,
        proteins: nutrientsSubTotal._sum.proteins,
        kcals: nutrientsSubTotal._sum.kcals,
        ingredientsList: ingredientsList,
    };

    return ingredientsSummary;
}

export async function getNutrientTotalByDay(countedDayId: string) {
    return await prisma.ingredients.aggregate({
        _sum: {
            carbs: true,
            fats: true,
            proteins: true,
            kcals: true,
        },
        where: {
            meal: {
                countedDayId: countedDayId,
            },
        },
    });
}
