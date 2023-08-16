import { prisma } from "../config/database";
import { ICustomIngredientTableData } from "../types/customIngredientTableType";

export async function createCustomIng(customIng: ICustomIngredientTableData) {
    return await prisma.customIngredientsTable.create({
        data: customIng,
    });
}
