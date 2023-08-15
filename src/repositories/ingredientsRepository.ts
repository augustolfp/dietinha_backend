import { prisma } from "../config/database";
import { IIngredientData } from "../types/ingredientType";

export async function createIngredient(ingredient: IIngredientData) {
    return await prisma.ingredients.create({
        data: ingredient,
    });
}
