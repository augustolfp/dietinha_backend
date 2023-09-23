import * as customIngTableRepo from "../repositories/customIngredientsTableRepository";
import { ICustomIngredientTableData } from "../types/customIngredientTableType";
import { ApiError } from "../helpers/api-errors";

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

    try {
        const newCustomLog = await customIngTableRepo.createCustomIng(truncIng);
        return newCustomLog;
    } catch (e) {
        if (e.code === "P2002") {
            throw new ApiError(
                "User already have a Nutrition Log with provided description",
                403
            );
        }
        throw e;
    }
}
