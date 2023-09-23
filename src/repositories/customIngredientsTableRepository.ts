import { prisma } from "../config/database";
import { ICustomIngredientTableData } from "../types/customIngredientTableType";

export async function createCustomIng(customIng: ICustomIngredientTableData) {
    return await prisma.customIngredientsTable.create({
        data: customIng,
    });
}

export async function search(term: string, userId: string) {
    return await prisma.customIngredientsTable.findMany({
        where: {
            description: {
                contains: term,
                mode: "insensitive",
            },
            userId: {
                equals: userId,
            },
        },
        select: {
            id: true,
            description: true,
            baseQty: true,
            proteins: true,
            carbs: true,
            fats: true,
            kcals: true,
        },
    });
}
