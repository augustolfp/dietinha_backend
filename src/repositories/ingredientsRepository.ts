import { prisma } from "../config/database";
import { IIngredientData } from "../types/ingredientType";

export async function createIngredient(ingredient: IIngredientData) {
    return await prisma.ingredients.create({
        data: ingredient,
    });
}

export async function getIngredientsList(mealId: string) {
    const ingredientsList = await prisma.ingredients.findMany({
        where: {
            mealId: mealId,
        },
    });

    return ingredientsList;
}
