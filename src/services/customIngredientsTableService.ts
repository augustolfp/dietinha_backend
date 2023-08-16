import * as customIngTableRepo from "../repositories/customIngredientsTableRepository";
import { ICustomIngredientTableData } from "../types/customIngredientTableType";

export async function createCustomIng(
    customIngData: Omit<ICustomIngredientTableData, "userId">,
    userId: string
) {
    const truncNumber = (number: number) => {
        return Number(number.toFixed(2));
    };

    const truncIng = {
        userId,
        description: customIngData.description,
        baseQty: truncNumber(customIngData.baseQty),
        proteins: truncNumber(customIngData.proteins),
        carbs: truncNumber(customIngData.carbs),
        fats: truncNumber(customIngData.fats),
        kcals: truncNumber(customIngData.kcals),
    };

    return await customIngTableRepo.createCustomIng(truncIng);
}
