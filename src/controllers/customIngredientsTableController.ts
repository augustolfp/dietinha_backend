import { Request, Response } from "express";
import * as customIngTableService from "../services/customIngredientsTableService";
import { ICustomIngredientTableData } from "../types/customIngredientTableType";

export async function insertCustomIng(req: Request, res: Response) {
    const customIng: Omit<ICustomIngredientTableData, "userId"> = req.body;
    const userId = res.locals.userId;

    const result = await customIngTableService.createCustomIng(
        customIng,
        userId
    );

    return res.status(201).send(result);
}
