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
            },
            userId: {
                equals: userId,
            },
        },
    });
}
